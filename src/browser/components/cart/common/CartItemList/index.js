import React from 'react';
import PropTypes from 'prop-types';
import CartConstants from 'commonBrowserUtils/CartConstants';
import { getArticleGenderData } from 'commonBrowserUtils/CartHelper';
import { isApp } from 'commonBrowserUtils/Helper';
import { getAbtest } from 'commonUtils/abtestManager';
import get from 'lodash/get';

const groupItems = (items, groupBy, groupData) => {
  const groupedItems = [];
  const processedGroupIds = [];
  let noGroupCount = 0;

  items.forEach((eachItem, _, list) => {
    const itemGroupId = eachItem[groupBy];

    if (
      itemGroupId &&
      itemGroupId !== '0' &&
      processedGroupIds.indexOf(itemGroupId) === -1
    ) {
      processedGroupIds.push(itemGroupId);
      groupedItems.push({
        key: `${itemGroupId}`,
        groupedBy: groupBy,
        itemsList: list.filter(item => item[groupBy] === itemGroupId),
        groupData: groupData.find(({ id }) => id === itemGroupId)
      });
    } else if (!itemGroupId || itemGroupId === '0') {
      /*
        simple products without any grouping
      */
      groupedItems.push({
        key: `${CartConstants.NO_GROUP_ITEMS}${noGroupCount++}`,
        groupedBy: CartConstants.NO_GROUP_ITEMS,
        itemsList: [eachItem]
      });
    }
  });
  return groupedItems;
};

const isCouponApplied = ({ discounts = {} }) => {
  const { value } =
    (discounts.data || []).find(data => data.name === 'coupon') || {};
  return value && value > 0;
};

const sortItemsByPrice = items =>
  [...items].sort(
    (a, b) => get(b, 'price.subTotal', 0) - get(a, 'price.subTotal', 0)
  );

const groupItemsByArticleGender = items => {
  /*
    NOTE: Why are we modifying items?
    We need to group items by Article Type AND Gender
    To make it easier for the `groupItems` function, we create a composite ID which contains both the `articleTypeId` and the `gender`.
  */

  const modifiedItems = [];
  const articleGenderData = [];
  const articleGenderIds = [];

  items.forEach(item => {
    const { id, name } = getArticleGenderData(item);

    modifiedItems.push({
      ...item,
      [CartConstants.GROUP_BY_ART_GENDER]: id
    });

    if (articleGenderIds.indexOf(id) === -1) {
      articleGenderIds.push(id);
      articleGenderData.push({ id, name });
    }
  });

  return groupItems(
    modifiedItems,
    CartConstants.GROUP_BY_ART_GENDER,
    articleGenderData
  );
};

const groupItemsByOffer = (items, offers) =>
  groupItems(items, CartConstants.GROUP_BY_OFFER, offers);

const handleFreeItemOrder = groupedItems => {
  groupedItems.forEach(groupedItem => {
    const products = groupedItem.itemsList;
    const isFreeItemFirstProduct = get(products[0], 'flags.freeItem');
    if (!isFreeItemFirstProduct) {
      const mainProduct = products[0];
      const freeGiftProduct = products.find(product =>
        get(product, 'flags.freeItem')
      );
      if (freeGiftProduct) {
        const freeGiftProductIndex = products.indexOf(freeGiftProduct);
        products[0] = freeGiftProduct;
        products[freeGiftProductIndex] = mainProduct;
      }
    }
  });
};

const CartItemList = ({ data, handleCartAction, render }) => {
  const { offers, price } = data;
  const couponApplied = isCouponApplied(price || {});
  let items = get(data, 'products', []);
  let groupedItems;

  /*
   * Run the ArticleGender AB if:
   * 1. Is in App mode
   * 2. There is no combo offer in any product
   */
  const canDoGroupingAB =
    isApp() && !items.some(item => item.offerId && item.offerId !== '0');

  if (canDoGroupingAB) {
    const groupedSortedBucket = getAbtest('CART_GROUPED_SORTED');
    const groupByArticleGender =
      ['groupandsort', 'onlygroup'].indexOf(groupedSortedBucket) !== -1;
    const sortByPrice =
      ['groupandsort', 'onlysort'].indexOf(groupedSortedBucket) !== -1;

    if (sortByPrice) {
      items = sortItemsByPrice(items);
    }

    groupedItems = groupByArticleGender
      ? groupItemsByArticleGender(items)
      : groupItemsByOffer(items, offers);
  } else {
    groupedItems = groupItemsByOffer(items, offers);
  }

  handleFreeItemOrder(groupedItems);
  let cartItemCounter = 0;
  return (
    <div id="cartItemsList">
      {groupedItems.map((eachGroup, groupIndex) => {
        cartItemCounter++;
        return render(
          eachGroup,
          { key: `itemByGroup-${eachGroup.key}`, groupIndex, couponApplied },
          handleCartAction,
          cartItemCounter > 3 ? true : false
        );
      })}
    </div>
  );
};

CartItemList.propTypes = {
  data: PropTypes.object,
  handleCartAction: PropTypes.func,
  render: PropTypes.func
};

export default CartItemList;
