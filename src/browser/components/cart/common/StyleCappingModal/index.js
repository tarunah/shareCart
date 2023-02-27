import React, { useEffect } from 'react';
import get from 'lodash/get';

import Styles from './styleCappingModal.base.css';

import Modal from 'commonComp/Modal';
import Image from 'commonComp/Image';
import Button from 'vision/components/Button';

import Strings from 'commonBrowserUtils/Strings';
import { getDeviceId, getUidx } from 'commonBrowserUtils/Helper';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import md5 from 'crypto-js/md5';

const getUserSelectedSize = (sizeData, sku) => {
  if (sizeData) {
    return sizeData.find(e => e.skuId === sku) || {};
  }
};

const getStyleCappingEventData = products => {
  return (products || []).reduce((acc, product) => {
    let productData = {
      styleId: get(product, 'id', ''),
      skuId: get(product, 'skuId', ''),
      mrp: get(product, 'price.mrp', 0),
      effectivePrice: get(product, 'price.subTotal', 0)
    };
    return [...acc, productData];
  }, []);
};

const StyleCappingModal = props => {
  useEffect(() => {
    triggerEvent('STYLE_CAPPING_LOAD', {
      custom: {
        custom: {
          v1: getUidx(),
          v2: getDeviceId(),
          v3: props.hashedMobile
            ? props.hashedMobile
            : props.shippingMobileNumber
            ? md5(props.shippingMobileNumber.toString()).toString()
            : null
        },
        widget: {
          data_set: {
            data: {
              entity_optional_attributes: {
                styleData: getStyleCappingEventData(props.data)
              }
            }
          }
        }
      }
    });
  }, []);

  const { mode, toggle, data } = props;
  const isMobile = mode === 'mobile';

  const cancelIconConfig = { show: true, className: Styles.cancelIcon };
  const { header } = getKVPairValue('STYLE_CAPPING');
  return (
    <Modal
      className={`${
        isMobile ? Styles.mobileContainer : Styles.desktopContainer
      }`}
      halfCard={isMobile}
      cancelCallback={toggle}
      cancelIconConfig={cancelIconConfig}
    >
      <div className={Styles.modalHeading}>{Strings.MAX_LIMIT_REACHED}</div>
      <div className={Styles.contentContainer}>
        <div className={Styles.contentHeader}>{header}</div>
        {data.map(item => {
          const { brand, name, sizes, images, skuId } = item;
          const selectedSize = get(
            getUserSelectedSize(sizes, skuId),
            'label',
            ''
          );
          const itemImage = images ? images[0].secureSrc : null;
          return (
            <div className={Styles.cardContainer}>
              <div className={Styles.itemLeft}>
                <Image src={itemImage} width={53} height={70} visible="true" />
              </div>
              <div className={Styles.itemRight}>
                <div className={Styles.bold}>{brand}</div>
                <div>{name}</div>
                <div> Size : {selectedSize}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={Styles.footer}>
        <Button
          variant="contained"
          width="100%"
          letterSpacing="1px"
          onClick={toggle}
        >
          {Strings.MODIFY_CART}
        </Button>
      </div>
    </Modal>
  );
};

export default StyleCappingModal;
