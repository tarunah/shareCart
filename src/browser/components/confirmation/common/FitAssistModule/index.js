import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getQueryParam } from 'commonUtils/helper';

import {
  blank,
  genderMap,
  myself,
  others
} from 'commonBrowserUtils/ConfirmationConstants';
import {
  getUidx,
  getUserFirstName,
  formatDate,
  getDateObject,
  getDateDiff,
  getTimeFromEpoch,
  pluralizeText,
  successNotification
} from 'commonBrowserUtils/Helper';

import Image from 'commonComp/Image';

import AddSizePreferences from '../AddSizePreferences';
import ProfileModal from '../ProfileModal';

import Carousel from './Carousel';
import ProfileSelector from './ProfileSelector';
import Styles from './fitAssistModule.base.css';
import RoundTape from 'iconComp/RoundTape.jsx';

export const sortProfiles = (product, profiles) => {
  const sortedProfiles = [];

  profiles.forEach(profile => {
    if (profile.gender === genderMap[product.gender]) {
      sortedProfiles.unshift({ ...profile });
    } else {
      sortedProfiles.push({
        ...profile,
        disabled: product.gender !== genderMap.Unisex
      });
    }
  });

  return sortedProfiles;
};

const addBlankProduct = data => {
  if (
    get(data, 'productData.taggableProductsCount') ===
    get(data, 'productData.styles.length')
  ) {
    return {
      ...data,
      productData: {
        ...data.productData,
        skus: [...data.productData.skus, 'blank'],
        styles: [...data.productData.styles, { id: 'blank' }]
      }
    };
  }
  return data;
};

const boundFuncs = [
  'selectProduct',
  'selectProfile',
  'closeProfileModal',
  'onProfileNameChange',
  'onGenderClick',
  'saveProfile',
  'isTagged',
  'isPS0Enabled',
  'getCurrentProductIndex',
  'openSizeInfo',
  'afterCarouselSlide',
  'getCarouselBody'
];

class FitAssistModule extends React.Component {
  constructor(props) {
    super(props);

    this.data = addBlankProduct(props.dataState.data);

    const {
      productData: { styles = [], skus = [], styleOptions },
      profiles
    } = this.data;

    // Setting start index for carousel
    let startIndex = getQueryParam({ name: 'cstart' }) || 0;
    startIndex > styles.length && (startIndex = 0);

    const initialStyle = styles[startIndex];

    const gender = initialStyle.gender;
    const currentProduct = {
      id: `${initialStyle.id}-${skus[startIndex]}`,
      gender,
      articleType: get(initialStyle, `articleType.typeName`, ''),
      subCategory: `${get(initialStyle, 'subCategory.typeName') || ''}`,
      name: initialStyle.name,
      styleId: initialStyle.id
    };

    const profileToTag = sortProfiles(currentProduct, profiles).find(
      p =>
        p.gender ===
        (genderMap[gender] === 'Unisex' ? genderMap.Men : genderMap[gender])
    );

    this.state = {
      currentProduct,
      profiles,
      lastTagged: {
        // this is done to show size n fit upfront even if product is not yet tagged
        product: {
          subCategory: currentProduct.subCategory,
          articleType: currentProduct.articleType,
          gender: currentProduct.gender,
          productName: currentProduct.name,
          styleId: currentProduct.styleId
        },
        profile: profileToTag
          ? {
              profileId: profileToTag.pidx,
              profileName: profileToTag.name
            }
          : null
      },
      selectedProfile: null,
      taggedItemsMap: {},
      profileModal: false,
      profileModalDetails: {
        name: '',
        gender: gender === genderMap.Unisex ? genderMap.Men : genderMap[gender]
      },
      profileModalError: '',
      saveInProgress: false,
      resetSelectorBlock: false
    };

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    this.sizePreferencesEnabled = isFeatureEnabled('SIZE_PREFERENCES');
    this.ps0List = getKVPairValue('PS0_LIST');
    this.itemSizeMap = {};

    get(props, 'dataState.data.bountyOrder.items', []).forEach((item, i) => {
      const { value: size } =
        (
          (styleOptions.find(option => option.styleId === item.styleId) || {})
            .styleOptions || []
        ).find(skuOptions => skuOptions.skuId === item.skuId) || {};

      const expectedCustomerPromiseTime = get(
        item,
        'expectedCustomerPromiseTime'
      );
      const diffInDays = getDateDiff(new Date(), expectedCustomerPromiseTime);
      let deliverydate = null;
      //NDD scenario
      if (diffInDays < 2 && expectedCustomerPromiseTime) {
        const time = getTimeFromEpoch(
          new Date(Number(expectedCustomerPromiseTime))
        );
        if (time) {
          if (diffInDays === 0) {
            deliverydate = `today ${
              isFeatureEnabled('SPEED_11_SHOW_TIME')
                ? `by ` + time.hours + ' ' + time.suffix
                : ''
            }`;
          } else {
            deliverydate = `tomorrow ${
              isFeatureEnabled('SPEED_11_SHOW_TIME')
                ? `by ` + time.hours + ' ' + time.suffix
                : ''
            }`;
          }
        }
      } else {
        const { dayInWords, monthInWords, date } =
          getDateObject(new Date(expectedCustomerPromiseTime)) || {};
        deliverydate = expectedCustomerPromiseTime
          ? `by ${dayInWords}, ${monthInWords} ${date}`
          : null;
      }

      this.itemSizeMap[item.styleId] = {
        size,
        deliveryPromise: deliverydate
      };
    });
  }

  afterCarouselSlide(index) {
    this.selectProduct(index);
  }

  selectProduct(e) {
    const {
      state: { taggedItemsMap, profileModalDetails, currentProduct },
      data: {
        productData: { styles = [] }
      }
    } = this;
    const targetId = get(e, 'currentTarget.id') || this.getIdFromIndex(e);
    const product = styles.find(
      style => `${style.id}` === targetId.split('-')[0]
    );

    let stateToUpdate;

    if (targetId === blank) {
      stateToUpdate = {
        currentProduct: {
          ...currentProduct,
          id: targetId
        },
        selectedProfile: null
      };
    } else if (targetId !== currentProduct.id) {
      stateToUpdate = {
        currentProduct: {
          id: targetId,
          gender: product.gender,
          articleType: get(product, 'articleType.typeName'),
          subCategory: `${get(product, 'subCategory.typeName') || ''}`,
          name: product.name,
          styleId: product.id
        },
        selectedProfile: taggedItemsMap[targetId],
        profileModalDetails: {
          ...profileModalDetails,
          gender:
            product.gender === genderMap.Unisex
              ? genderMap.Men
              : genderMap[product.gender]
        }
      };
    }

    this.setState(stateToUpdate);
  }

  selectNextProductAfterTag() {
    const {
      props: {
        dataState: {
          data: {
            productData: { styles, taggableProductsCount }
          }
        }
      }
    } = this;
    this.setState({
      resetSelectorBlock: true
    });

    setTimeout(() => {
      const newIndex = this.getCurrentProductIndex() + 1;
      newIndex < styles.length && this.selectProduct(newIndex);
      this.setState({
        resetSelectorBlock: false
      });
    }, 400);
  }

  selectProfile(e) {
    const {
      state: { profileModalDetails }
    } = this;
    const profileId = e.currentTarget.id;

    this.setState({
      selectedProfile: profileId
    });

    if (profileId === myself.id || profileId === others.id) {
      const userFirstName = getUserFirstName().trim();
      this.setState({
        selectedProfile: profileId,
        profileModal: true,
        profileModalDetails: {
          ...profileModalDetails,
          name: profileId === myself.id ? userFirstName || myself.display : ''
        }
      });
    } else {
      this.tagProfile(profileId);
      this.selectNextProductAfterTag();
    }
  }

  isTagged(id) {
    return Object.keys(this.state.taggedItemsMap).find(key => key === id);
  }

  getCurrentProductIndex() {
    const {
      data: {
        productData: { styles, skus }
      },
      state: { currentProduct }
    } = this;

    return styles.findIndex(
      (style, index) => `${style.id}-${skus[index]}` === currentProduct.id
    );
  }

  getIdFromIndex(index) {
    const {
      dataState: {
        data: {
          productData: { styles, skus }
        }
      }
    } = this.props;

    return `${styles[index].id}-${skus[index]}`;
  }

  tagProfile(profileId) {
    const {
      props: {
        actionHandlers: { handleConfirmationAction },
        dataState: {
          data: {
            bountyOrder: { storeOrderId },
            productData: { taggableProductsCount }
          }
        }
      },
      state: { currentProduct, taggedItemsMap, profiles }
    } = this;
    const productIds = currentProduct.id.split('-');
    handleConfirmationAction(
      'tagProfile',
      {
        uidx: getUidx(),
        pidx: profileId,
        styleId: Number(productIds[0]),
        skuId: Number(productIds[1]),
        orderId: storeOrderId,
        articleType: currentProduct.articleType,
        gender: currentProduct.gender
      },
      () => {
        const updatedTaggedItemsMap = {
          ...taggedItemsMap,
          [currentProduct.id]: profileId
        };

        const sortedProfiles = sortProfiles(currentProduct, profiles);
        const selectedProfileIndex = sortedProfiles.findIndex(
          profile => profile.pidx === profileId
        );

        this.setState({
          lastTagged: {
            product: {
              subCategory: currentProduct.subCategory,
              articleType: currentProduct.articleType,
              gender: currentProduct.gender,
              productName: currentProduct.name,
              styleId: currentProduct.styleId
            },
            profile: {
              profileId,
              profileName: get(
                sortedProfiles,
                `${selectedProfileIndex}.name`,
                ''
              )
            }
          },
          taggedItemsMap: updatedTaggedItemsMap
        });
        if (
          !this.successToastShown &&
          Object.keys(updatedTaggedItemsMap).length === taggableProductsCount
        ) {
          SHELL.alert('info', {
            message: 'Yay! Thanks for tagging your purchase.',
            styleOverrides: {
              notifyMainDiv: `bottom: 82px;`
            }
          });
          this.successToastShown = true;
        }
        const deliveryPromise =
          get(this, `itemSizeMap.${productIds[0]}.deliveryPromise`) || '';

        triggerEvent('PRODUCT_TO_PROFILE_TAG_CLICK', {
          custom: {
            custom: {
              v1:
                selectedProfileIndex > -1 &&
                sortedProfiles[selectedProfileIndex].name,
              v2: profileId,
              v3: storeOrderId,
              v4: `${productIds[0]}|${productIds[1]}|${deliveryPromise.replace(
                /\s/g,
                ''
              )}`
            }
          }
        });
      },
      null,
      { message: 'Unable to tag profile' }
    );
  }

  closeProfileModal() {
    this.setState({
      profileModal: false,
      profileModalError: ''
    });
  }

  onProfileNameChange(e) {
    this.setState({
      profileModalDetails: {
        ...this.state.profileModalDetails,
        name: e.currentTarget.value
      }
    });
  }

  onGenderClick(e) {
    this.setState({
      profileModalDetails: {
        ...this.state.profileModalDetails,
        gender: e.currentTarget.id
      }
    });
  }

  openSizeInfo() {
    const {
      props: {
        dataState: {
          data: {
            bountyOrder: { storeOrderId }
          }
        }
      },
      state: { selectedProfile }
    } = this;

    triggerEvent('UPDATE_SIZE_PROFILE_INITIATE');
    window.location = `/my/sizingInfo?orderId=${storeOrderId}&pidx=${selectedProfile}&mode=create&referrer=checkout&cstart=${this.getCurrentProductIndex()}`;
  }

  saveProfile() {
    const {
      state: { profileModalDetails, profiles },
      props: {
        actionHandlers: { handleConfirmationAction }
      }
    } = this;

    profileModalDetails.name = profileModalDetails.name.trim();
    if (profileModalDetails.name) {
      this.setState({
        saveInProgress: true
      });

      handleConfirmationAction(
        'saveProfile',
        profileModalDetails,
        res => {
          const profile = get(res, 'userProfiles.0.profileList.0', {});
          const existingProfile = profiles.find(
            prof => prof.pidx === profile.pidx
          );

          this.setState(
            {
              profiles: existingProfile
                ? [...profiles]
                : [...profiles, profile],
              selectedProfile: profile.pidx,
              profileModal: false,
              profileModalError: '',
              saveInProgress: false
            },
            () => {
              triggerEvent('CREATE_SIZE_PROFILE');
              this.tagProfile(profile.pidx);
              this.selectNextProductAfterTag();
            }
          );
        },
        () => {
          this.setState({
            profileModal: false,
            profileModalError: '',
            saveInProgress: false
          });
        },
        { message: 'Unable to save profile' }
      );
    } else {
      this.setState({
        profileModalError: 'Profile name cannot be empty'
      });
    }
  }

  isPS0Enabled() {
    const {
      sizePreferencesEnabled,
      ps0List,
      state: { lastTagged }
    } = this;

    if (lastTagged && sizePreferencesEnabled) {
      const taggedProductKey = `${
        genderMap[get(lastTagged, 'product.gender')]
      }${get(lastTagged, 'product.articleType')}`.toLowerCase();
      return ps0List.indexOf(taggedProductKey) !== -1;
    }

    return false;
  }

  getCarouselBody(item, index) {
    const {
      selectProduct,
      isTagged,
      props: {
        dataState: {
          data: {
            productData: { skus = [], styleOptions = [] }
          }
        }
      },
      state: {
        currentProduct: { id: currentProductId }
      }
    } = this;
    const skuId = skus[index];
    const id = `${item.id}-${skuId}`;
    const { size, deliveryPromise } = this.itemSizeMap[item.id] || {};

    const imageSrc = `${get(item, 'styleImages.default.securedDomain')}${get(
      item,
      'styleImages.default.resolutionFormula'
    )}`;

    return (
      <div
        key={id}
        id={id}
        onClick={selectProduct}
        className={`${Styles.itemContainer} ${
          this.getIdFromIndex(index) === currentProductId
            ? Styles.selectedProduct
            : ''
        } ${isTagged(id) ? Styles.itemTagged : ''}`}
      >
        <Image
          src={imageSrc}
          width={60}
          height={80}
          visible="true"
          lazyLoad={false}
        />
        <div className={Styles.itemDetails}>
          <div className={Styles.itemBrand}>{get(item, 'brandName')}</div>
          {size ? <div>Size: {size}</div> : null}
          {deliveryPromise ? (
            <div className={Styles.deliveryTAT}>
              {`Arriving ${deliveryPromise}`}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const {
      state: {
        resetSelectorBlock,
        profiles,
        selectedProfile,
        currentProduct,
        lastTagged
      },
      props: {
        dataState: {
          data: {
            bountyOrder,
            productData: { styles: items, skus },
            productData
          }
        },
        fitAssistClass
      },
      isPS0Enabled,
      getCurrentProductIndex,
      afterCarouselSlide,
      getCarouselBody
    } = this;

    return (
      <div className={fitAssistClass}>
        <div
          className={`${
            Styles.fitAssistContainer
          } ${productData.taggableProductsCount === 0 && Styles.adjustPadding}`}
        >
          <div>
            <div className={Styles.nudge}>
              {productData.taggableProductsCount > 0 ? (
                <RoundTape className={Styles.headerIcon} />
              ) : (
                ''
              )}
              {productData.taggableProductsCount === 0
                ? `Your Purchased ${pluralizeText(items.length, 'Item')}`
                : 'Tag your Purchase'}
            </div>

            <Carousel
              currentSlide={getCurrentProductIndex()}
              afterSlide={afterCarouselSlide}
              config={{ perPage: 1 }}
              keepSame={true}
            >
              {items.map(getCarouselBody)}
            </Carousel>

            {profiles && productData.taggableProductsCount ? (
              <ProfileSelector
                profiles={profiles}
                selectedProfile={selectedProfile}
                selectProfile={this.selectProfile}
                currentProduct={currentProduct}
                resetSelectorBlock={resetSelectorBlock}
                blankSlide={currentProduct.id === blank}
                openSizeInfo={this.openSizeInfo}
                getCurrentProductIndex={this.getCurrentProductIndex}
                taggableProductsCount={productData.taggableProductsCount}
                storeOrderId={bountyOrder.storeOrderId}
              />
            ) : (
              ''
            )}
          </div>

          {isPS0Enabled() && (
            <AddSizePreferences
              product={lastTagged.product}
              profile={lastTagged.profile}
            />
          )}
        </div>
        {this.state.profileModal && (
          <ProfileModal
            currentProduct={this.state.currentProduct}
            closeProfileModal={this.closeProfileModal}
            saveProfile={this.saveProfile}
            onProfileNameChange={this.onProfileNameChange}
            onGenderClick={this.onGenderClick}
            saveInProgress={this.state.saveInProgress}
            profileModalDetails={this.state.profileModalDetails}
            profileModalError={this.state.profileModalError}
          />
        )}
      </div>
    );
  }
}

export default FitAssistModule;

FitAssistModule.PropTypes = {
  dataState: PropTypes.object,
  fitAssistClass: PropTypes.string
};
