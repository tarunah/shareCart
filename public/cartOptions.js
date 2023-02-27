(self["webpackChunk"] = self["webpackChunk"] || []).push([["cartOptions"],{

/***/ "../node_modules/lodash/_arrayIncludes.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_arrayIncludes.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ "../node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "../node_modules/lodash/_arrayIncludesWith.js":
/*!****************************************************!*\
  !*** ../node_modules/lodash/_arrayIncludesWith.js ***!
  \****************************************************/
/***/ ((module) => {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "../node_modules/lodash/_arrayMap.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_arrayMap.js ***!
  \*******************************************/
/***/ ((module) => {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "../node_modules/lodash/_baseDifference.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_baseDifference.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "../node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "../node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "../node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "../node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "../node_modules/lodash/_cacheHas.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),

/***/ "../node_modules/lodash/_baseRest.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_baseRest.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var identity = __webpack_require__(/*! ./identity */ "../node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "../node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "../node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "../node_modules/lodash/_baseUnary.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseUnary.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../node_modules/lodash/_baseUniq.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_baseUniq.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SetCache = __webpack_require__(/*! ./_SetCache */ "../node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ "../node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ "../node_modules/lodash/_arrayIncludesWith.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "../node_modules/lodash/_cacheHas.js"),
    createSet = __webpack_require__(/*! ./_createSet */ "../node_modules/lodash/_createSet.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "../node_modules/lodash/_setToArray.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;


/***/ }),

/***/ "../node_modules/lodash/_createSet.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_createSet.js ***!
  \********************************************/
/***/ ((module) => {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),

/***/ "../node_modules/lodash/_setToArray.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_setToArray.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "../node_modules/lodash/identity.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/identity.js ***!
  \******************************************/
/***/ ((module) => {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "../node_modules/lodash/isArrayLikeObject.js":
/*!***************************************************!*\
  !*** ../node_modules/lodash/isArrayLikeObject.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "../node_modules/lodash/union.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/union.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ "../node_modules/lodash/_baseFlatten.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "../node_modules/lodash/_baseRest.js"),
    baseUniq = __webpack_require__(/*! ./_baseUniq */ "../node_modules/lodash/_baseUniq.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "../node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;


/***/ }),

/***/ "../node_modules/lodash/without.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/without.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseDifference = __webpack_require__(/*! ./_baseDifference */ "../node_modules/lodash/_baseDifference.js"),
    baseRest = __webpack_require__(/*! ./_baseRest */ "../node_modules/lodash/_baseRest.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "../node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;


/***/ }),

/***/ "./browser/components/cart/common/Coupons/CouponsHandler/CouponsResponseHandler/index.js":
/*!***********************************************************************************************!*\
  !*** ./browser/components/cart/common/Coupons/CouponsHandler/CouponsResponseHandler/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


var CouponsResponseHandler = /** @class */ (function () {
    function CouponsResponseHandler(res, type, couponInput) {
        this.discounts = (res.price || {}).discounts;
        this.type = type;
        this.appliedCoupons = res.coupons || [];
        this.applicableCoupons = res.applicableCoupons || [];
        this.couponInput = couponInput;
        this.potentialCoupons = res.potentialCoupons || [];
        this.attachedProductOfferAmount = (res.attachedProductOffers || {}).totalOfferAmount;
    }
    CouponsResponseHandler.prototype.getType = function () {
        return this.type;
    };
    CouponsResponseHandler.prototype.getInvalidOrExpiredInputCoupon = function () {
        var _a = this, appliedCoupons = _a.appliedCoupons, couponInput = _a.couponInput;
        //Checks for the error in the coupon code entered by the user and returns the coupon if it is invalid or expired or
        //the respones has oops something went wrong for the userEntered Coupon.
        //Invalid and expired coupons have statusCode as 0
        //StatusCode is undefined for older cart response.
        this.invalidCoupon = appliedCoupons.find(function (coupon) {
            return coupon.code.toLowerCase() === couponInput.toLowerCase() &&
                coupon.status === 'ERROR' &&
                (coupon.statusCode === 0 || coupon.statusCode === undefined);
        });
        return this.invalidCoupon;
    };
    CouponsResponseHandler.prototype.getAllCoupons = function () {
        var _a = this, applicableCoupons = _a.applicableCoupons, appliedCoupons = _a.appliedCoupons;
        return __spreadArray(__spreadArray([], appliedCoupons, true), applicableCoupons, true);
    };
    CouponsResponseHandler.prototype.getPotentialCoupons = function () {
        var potentialCoupons = this.potentialCoupons;
        return potentialCoupons;
    };
    CouponsResponseHandler.prototype.getDiscountValue = function () {
        var discounts = this.discounts;
        var couponDiscount = discounts.data.find(function (field) { return field.name === 'coupon'; }) || {};
        return couponDiscount.value;
    };
    CouponsResponseHandler.prototype.getApplyAllNotificationData = function () {
        var coupons = this.getAllCoupons();
        var couponDiscountValue = this.getDiscountValue();
        //deducting attached product offer from total coupon discount to show toast message
        if (this.attachedProductOfferAmount) {
            couponDiscountValue -= this.attachedProductOfferAmount;
        }
        var successCouponsCount = coupons.filter(function (_a) {
            var status = _a.status;
            return status === 'SUCCESS';
        }).length;
        var expiredCouponsCount = coupons.filter(
        // expired and invalid coupons has statusCode 0, since this is the final applyCall, we send only valid coupons
        // so only the expired coupons has statusCode 0 in this scenario.
        function (_a) {
            var status = _a.status, statusCode = _a.statusCode;
            return status === 'ERROR' && statusCode === 0;
        }).length;
        return {
            successCouponsCount: successCouponsCount,
            expiredCouponsCount: expiredCouponsCount,
            couponDiscountValue: couponDiscountValue
        };
    };
    CouponsResponseHandler.prototype.removeCoupon = function (coupon) {
        var appliedCoupons = this.appliedCoupons;
        //Filters out the user entered coupon
        this.appliedCoupons = appliedCoupons.filter(function (appliedCoupon) {
            return appliedCoupon.code.toLowerCase() !== coupon.code.toLowerCase();
        });
    };
    CouponsResponseHandler.prototype.isPreSelected = function (status) {
        //Applied coupons don't have status and successfully applied coupons have status as SUCCESS
        //All the coupon which don't have error can be preselected
        return !status || status === 'SUCCESS';
    };
    CouponsResponseHandler.prototype.checkForTimeOut = function (statusCode) {
        // 999999 is for timedout coupons and 888888 is returned when coupons response status is error
        return statusCode === 999999 || statusCode === 888888;
    };
    CouponsResponseHandler.prototype.getCouponSelectionStatus = function () {
        var isPreSelected = this.isPreSelected;
        var coupons = this.getAllCoupons();
        var couponSelectionStatus = {};
        coupons.forEach(function (_a) {
            var status = _a.status, code = _a.code;
            couponSelectionStatus[code] = isPreSelected(status);
        });
        return couponSelectionStatus;
    };
    CouponsResponseHandler.prototype.getApplicableCoupons = function () {
        return this.applicableCoupons;
    };
    CouponsResponseHandler.prototype.getCouponDataWithFlag = function (couponType) {
        var _this = this;
        if (couponType === void 0) { couponType = 'applicable'; }
        var couponArray;
        switch (couponType) {
            case 'potential':
                couponArray = this.potentialCoupons;
                break;
            case 'applied':
                couponArray = this.appliedCoupons;
                break;
            default:
                couponArray = this.applicableCoupons;
                break;
        }
        var maxTime = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_0__.getGrowthHackConfigValue)('COUPON_EXPIRY').maximumTime;
        var coupons = couponArray.reduce(function (res, coupon) {
            var expiryData = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.getFullDateDiff)(coupon.expiry);
            var flag = !!(expiryData.days === 0 && expiryData.hours < maxTime);
            flag =
                couponType === 'potential'
                    ? flag && _this.applicableCoupons.length === 0
                    : flag;
            var couponData = __assign(__assign({}, coupon), { flag: flag, expiry_days: expiryData.days, expiry_hours: expiryData.hours, expiry_mins: expiryData.minutes, expiry_secs: expiryData.seconds, coupon_applicability: couponType });
            return __spreadArray(__spreadArray([], res, true), [couponData], false);
        }, []);
        return coupons;
    };
    CouponsResponseHandler.prototype.getMaximumSavings = function () {
        var isPreSelected = this.isPreSelected;
        var coupons = this.getAllCoupons();
        var maximumSavings = 0;
        coupons.forEach(function (_a) {
            var _b;
            var status = _a.status, _c = _a.discountUnits, discountUnits = _c === void 0 ? [] : _c;
            if (isPreSelected(status)) {
                maximumSavings += (_b = discountUnits[0]) === null || _b === void 0 ? void 0 : _b.value;
            }
        });
        return maximumSavings;
    };
    CouponsResponseHandler.prototype.isCouponsError = function () {
        var checkForTimeOut = this.checkForTimeOut;
        var coupons = this.getAllCoupons();
        return coupons.find(function (_a) {
            var statusCode = _a.statusCode;
            return checkForTimeOut(statusCode);
        })
            ? true
            : false;
    };
    CouponsResponseHandler.prototype.getRetryCouponsPayload = function () {
        return this.appliedCoupons.reduce(function (payloadArray, _a) {
            var code = _a.code;
            return __spreadArray(__spreadArray([], payloadArray, true), [{ code: code, type: 'coupon' }], false);
        }, []);
    };
    CouponsResponseHandler.prototype.isInputCouponSuccessful = function () {
        var _a = this, couponInput = _a.couponInput, appliedCoupons = _a.appliedCoupons;
        var inputCoupon = appliedCoupons.find(function (coupon) { return coupon.code.toLowerCase() === couponInput.toLowerCase(); }) || {};
        return inputCoupon.status === 'SUCCESS';
    };
    return CouponsResponseHandler;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CouponsResponseHandler);


/***/ }),

/***/ "./browser/components/cart/common/Coupons/CouponsHandler/CouponsShellNotification/index.js":
/*!*************************************************************************************************!*\
  !*** ./browser/components/cart/common/Coupons/CouponsHandler/CouponsShellNotification/index.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");


var getStyleOverrides = function (type) {
    return (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_1__.isMobile)()
        ? type.indexOf('APPLY_ALL') === 0
            ? {
                notifyMainDiv: 'bottom: 105px;',
                notifyTextDiv: 'width: auto;min-height:40px;font-size:14px;text-align:left;'
            }
            : {
                notifyMainDiv: 'bottom: 105px;',
                notifyTextDiv: 'width: auto;min-height:40px;font-size:14px;text-align:justify;'
            }
        : type.indexOf('APPLY_ALL') === 0
            ? {
                notifyMainDiv: 'top: 78px;max-width:328px',
                notifyTextDiv: 'width: auto;font-size:14px;text-align:justify;'
            }
            : {
                notifyMainDiv: 'bottom: 26%;height:40px;max-width:320px;',
                notifyTextDiv: 'width: auto;height:40px;font-size:14px;text-align:justify;'
            };
};
var CouponsShellNotification = function (type, couponsDetails) {
    var name = couponsDetails.name, successCouponsCount = couponsDetails.successCouponsCount, expiredCouponsCount = couponsDetails.expiredCouponsCount, couponDiscountValue = couponsDetails.couponDiscountValue;
    var styleOverrides = getStyleOverrides(type);
    var coupon = "".concat(successCouponsCount > 1 ? 'coupons' : 'coupon');
    var message = '';
    successCouponsCount =
        (commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.numToWords[successCouponsCount] &&
            commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.numToWords[successCouponsCount].toLowerCase()) ||
            successCouponsCount;
    expiredCouponsCount = commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.numToWords[expiredCouponsCount] || expiredCouponsCount;
    var successCountMessage = "".concat(successCouponsCount, " ").concat(coupon);
    switch (type) {
        case commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.couponsNotificationTypes.TYPED_IN_COUPON:
            message = "<b> ".concat(name.toUpperCase(), " successfully applied </b>");
            break;
        case commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.couponsNotificationTypes.NEGATIVE_CART_VALUE:
            message =
                'Please unselect some coupons as the discount value is greater that cart value';
            break;
        case commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.couponsNotificationTypes.APPLY_ALL_SUCCESS:
            message = "<b> Yay! You saved </b><span \"style=\"font-size: 14px; font-weight: 400;\">&#8377</span> ".concat(couponDiscountValue, " <b> with ").concat(successCountMessage, ". </b>");
            break;
        case commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.couponsNotificationTypes.APPLY_ALL_SUCCESS_EXPIRED:
            message = "<b>".concat(expiredCouponsCount, " of the coupons just got expired but you saved </b><span style=\"font-size: 14px; font-weight: 400;\">&#8377</span> ").concat(couponDiscountValue, " <b> with ").concat(successCountMessage, ". </b>");
            break;
        case commonUtils_constants__WEBPACK_IMPORTED_MODULE_0__.couponsNotificationTypes.APPLY_ALL_EXPIRED:
            message = "<b>".concat(expiredCouponsCount, " of the coupons just got expired.</b>");
            break;
        default:
            break;
    }
    var alertConfig = {
        message: message,
        styleOverrides: styleOverrides
    };
    SHELL.alert('info', alertConfig);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CouponsShellNotification);


/***/ }),

/***/ "./browser/components/cart/common/Coupons/CouponsHandler/index.js":
/*!************************************************************************!*\
  !*** ./browser/components/cart/common/Coupons/CouponsHandler/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isEqual */ "../node_modules/lodash/isEqual.js");
/* harmony import */ var lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isEqual__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/without */ "../node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/union */ "../node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/flatten */ "../node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! commonUtils/GrowthHackConfigManager */ "./utils/GrowthHackConfigManager/index.js");
/* harmony import */ var commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _CouponsResponseHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./CouponsResponseHandler */ "./browser/components/cart/common/Coupons/CouponsHandler/CouponsResponseHandler/index.js");
/* harmony import */ var _CouponsShellNotification__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./CouponsShellNotification */ "./browser/components/cart/common/Coupons/CouponsHandler/CouponsShellNotification/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};






// Utils






var ERROR_MESSAGE = 'Something went wrong.';
var AGGREGATION_BANNER_COOKIE_EXPIRY = 3600 * 24 * 365 * 1000;
var DUPLICATE_COUPON_ERROR_MESSAGE = 'This coupon is already applied.';
var CouponsContainer = /** @class */ (function (_super) {
    __extends(CouponsContainer, _super);
    function CouponsContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAutoAppliedCoupons = function () {
            var _a, _b, _c, _d;
            var type = 'APPLY_ALL_SUCCESS';
            var successCouponsCount = (_a = _this.props.coupons) === null || _a === void 0 ? void 0 : _a.filter(function (_a) {
                var _b = _a === void 0 ? {} : _a, status = _b.status;
                return status === 'SUCCESS';
            }).length;
            var expiredCouponsCount = (_b = _this.props.coupons) === null || _b === void 0 ? void 0 : _b.filter(function (_a) {
                var _b = _a === void 0 ? {} : _a, status = _b.status;
                return status === 'ERROR';
            }).length;
            var couponDiscountValue = (_d = lodash_flatten__WEBPACK_IMPORTED_MODULE_5___default()((_c = _this.props) === null || _c === void 0 ? void 0 : _c.coupons.map(function (coupon) { return coupon.discountUnits; }))) === null || _d === void 0 ? void 0 : _d.reduce(function (totalDiscount, discount) { return discount.value + totalDiscount; }, 0);
            (0,_CouponsShellNotification__WEBPACK_IMPORTED_MODULE_11__.default)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.couponsNotificationTypes[type], {
                successCouponsCount: successCouponsCount,
                expiredCouponsCount: expiredCouponsCount,
                couponDiscountValue: couponDiscountValue
            });
        };
        _this.state = {
            retry: false,
            coupons: props.coupons || [],
            potentialCoupons: [],
            couponSelectionStatus: props.coupons
                ? props.coupons.reduce(function (couponSelection, coupon) {
                    couponSelection[coupon.code] = true;
                    return couponSelection;
                }, {})
                : {},
            couponApplied: false,
            loading: true,
            appliedCoupon: '',
            couponInput: '',
            errorMessage: '',
            maximumSavings: 0,
            tagLink: ''
        };
        [
            'setCouponCode',
            'applyCoupon',
            'onCouponClick',
            'applyAndGetCoupons',
            'onApplyAllCouponsSuccess',
            'getCoupons',
            'applyAllCoupons',
            'getRetryAction',
            'applyCouponsErrorCallback',
            'applyAndGetSuccessCallBack',
            'getCouponsSuccessCallBack',
            'getCouponsErrorCallback',
            'applyCouponWithCode',
            'removeWithCouponCode'
        ].forEach(function (member) { return (_this[member] = _this[member].bind(_this)); });
        _this.renderBannerFG = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('COUPON_AGGREGATION_BANNER');
        return _this;
    }
    CouponsContainer.prototype.componentDidMount = function () {
        if (!this.props.inCartPage) {
            this.getCoupons();
        }
    };
    CouponsContainer.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _a, _b, _c;
        var areCouponsUpdated = !lodash_isEqual__WEBPACK_IMPORTED_MODULE_2___default()((_a = this.props.coupons) === null || _a === void 0 ? void 0 : _a.map(function (coupon) { return coupon === null || coupon === void 0 ? void 0 : coupon.code; }), (_b = prevProps === null || prevProps === void 0 ? void 0 : prevProps.coupons) === null || _b === void 0 ? void 0 : _b.map(function (coupon) { return coupon === null || coupon === void 0 ? void 0 : coupon.code; }));
        if (areCouponsUpdated && ((_c = this.props.coupons) === null || _c === void 0 ? void 0 : _c.length) > 0)
            this.handleAutoAppliedCoupons();
    };
    CouponsContainer.prototype.getCoupons = function () {
        this.inputField = document.getElementById('coupon-input-field');
        this.props.handleCartAction &&
            this.props.handleCartAction('applyAndGetCoupons', [], this.getCouponsSuccessCallBack, this.getCouponsErrorCallback, { keepPreviousState: false }, this.inputField ? { pagesource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.checkoutPage.COUPONS } : {});
    };
    CouponsContainer.prototype.getCouponsSuccessCallBack = function (res) {
        this.setState({ loading: false });
        if (res && res.coupons) {
            var getCouponsResponse = new _CouponsResponseHandler__WEBPACK_IMPORTED_MODULE_10__.default(res, 'getCoupons', '');
            //checking for error from coupons side.
            if (getCouponsResponse.isCouponsError()) {
                this.getCouponsErrorCallback({}, getCouponsResponse);
            }
            else {
                var coupons = getCouponsResponse.getAllCoupons();
                var potentialCoupons = getCouponsResponse.getPotentialCoupons();
                var couponSelectionStatus = getCouponsResponse.getCouponSelectionStatus();
                var maximumSavings = getCouponsResponse.getMaximumSavings();
                this.setState({
                    couponSelectionStatus: couponSelectionStatus,
                    maximumSavings: maximumSavings,
                    coupons: coupons,
                    potentialCoupons: potentialCoupons
                });
                triggerEvent('GET_COUPON_SUCCESS', {
                    custom: {
                        widget: {
                            applicableCoupons: getCouponsResponse.getCouponDataWithFlag('applicable'),
                            appliedCoupons: getCouponsResponse.getCouponDataWithFlag('applied'),
                            notApplicableCoupons: [],
                            potentialCoupons: getCouponsResponse.getCouponDataWithFlag('potential')
                        }
                    }
                });
            }
        }
        else {
            this.getCouponsErrorCallback();
        }
    };
    CouponsContainer.prototype.getCouponsErrorCallback = function (error, couponsResponse) {
        if (error === void 0) { error = {}; }
        var errorMessage = error.message || ERROR_MESSAGE;
        triggerEvent('GET_COUPON_ERROR', {
            gaLabel: errorMessage
        });
        if (couponsResponse) {
            this.onRetryAction = this.getRetryAction(couponsResponse.getType(), []);
            errorMessage = '';
        }
        this.setState({
            loading: false,
            errorMessage: errorMessage
        });
    };
    CouponsContainer.prototype.getRetryAction = function (callback, coupons) {
        var _this = this;
        var onRetryAction = function (e) {
            e.stopPropagation();
            _this[callback](coupons);
            _this.setState({ loading: true, retry: false });
        };
        this.setState({ coupons: [], maximumSavings: 0, retry: true });
        return onRetryAction;
    };
    CouponsContainer.prototype.applyAndGetCoupons = function (coupons, isCouponsPage) {
        var _this = this;
        if (coupons === void 0) { coupons = []; }
        if (isCouponsPage === void 0) { isCouponsPage = false; }
        this.props.handleCartAction('applyAndGetCoupons', coupons, this.applyAndGetSuccessCallBack, function (err) { return _this.applyCouponsErrorCallback(err, coupons); }, {}, isCouponsPage ? { pagesource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.checkoutPage.COUPONS } : {});
    };
    CouponsContainer.prototype.applyAndGetSuccessCallBack = function (res) {
        this.setState({ loading: false });
        if (res && res.coupons) {
            var _a = this.state, errorMessage = _a.errorMessage, couponInput = _a.couponInput, tagLink = _a.tagLink;
            var applyAndGetResponse = new _CouponsResponseHandler__WEBPACK_IMPORTED_MODULE_10__.default(res, 'applyAndGetCoupons', couponInput);
            if (applyAndGetResponse.isCouponsError()) {
                this.applyCouponsErrorCallback({}, [], applyAndGetResponse);
            }
            else {
                var invalidOrExpiredInputCoupon = applyAndGetResponse.getInvalidOrExpiredInputCoupon();
                errorMessage =
                    (invalidOrExpiredInputCoupon &&
                        invalidOrExpiredInputCoupon.message) ||
                        '';
                tagLink =
                    (invalidOrExpiredInputCoupon &&
                        invalidOrExpiredInputCoupon.showTagLink &&
                        invalidOrExpiredInputCoupon.tagLink) ||
                        '';
                invalidOrExpiredInputCoupon &&
                    applyAndGetResponse.removeCoupon(invalidOrExpiredInputCoupon);
                applyAndGetResponse.isInputCouponSuccessful() &&
                    (0,_CouponsShellNotification__WEBPACK_IMPORTED_MODULE_11__.default)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.couponsNotificationTypes.TYPED_IN_COUPON, {
                        name: couponInput
                    });
                couponInput = errorMessage ? couponInput : '';
                var coupons = applyAndGetResponse.getAllCoupons();
                var couponSelectionStatus = applyAndGetResponse.getCouponSelectionStatus();
                var maximumSavings = applyAndGetResponse.getMaximumSavings();
                this.setState({
                    couponSelectionStatus: couponSelectionStatus,
                    maximumSavings: maximumSavings,
                    errorMessage: errorMessage,
                    couponInput: couponInput,
                    coupons: coupons,
                    tagLink: tagLink
                });
            }
        }
        this.triggerAnalyticsEvents(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'coupons', []));
    };
    CouponsContainer.prototype.applyCouponsErrorCallback = function (error, coupons, couponsResponse) {
        if (error === void 0) { error = {}; }
        if (coupons === void 0) { coupons = []; }
        var allCoupons = couponsResponse
            ? couponsResponse.getAllCoupons()
            : coupons;
        this.onRetryAction =
            couponsResponse &&
                this.getRetryAction(couponsResponse.getType(), couponsResponse.getRetryCouponsPayload());
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUidx)();
        var errorCoupons = allCoupons
            .filter(function (_a) {
            var status = _a.status;
            return status === 'ERROR';
        })
            .reduce(function (_a, res) {
            var code = _a.code, message = _a.message;
            return __spreadArray(__spreadArray([], res, true), [
                { code: code, message: message || error.message }
            ], false);
        }, []);
        var ga_object = { uidx: uidx, errorCoupons: errorCoupons };
        triggerEvent('APPLY_COUPON_ERROR', {
            gaLabel: JSON.stringify(ga_object)
        });
        var errorMessage = '';
        !couponsResponse && (errorMessage = error.message || ERROR_MESSAGE);
        this.setState({
            loading: false,
            errorMessage: errorMessage
        });
        this.setInputToFocus();
    };
    CouponsContainer.prototype.componentWillUnmount = function () {
        (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('COUPON_AGGREGATION_BANNER') &&
            (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.setCookie)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.cookieKeys.COUPON_AGGREGATION_BANNER_VIEWED, true, AGGREGATION_BANNER_COOKIE_EXPIRY);
    };
    CouponsContainer.prototype.onCouponClick = function (code, callback) {
        this.setState(function (prevState) {
            var maximumSavings = prevState.maximumSavings;
            var couponSelectionStatus = __assign({}, prevState.couponSelectionStatus);
            var clickedCoupon = prevState.coupons.find(function (coupon) { return coupon.code === code; });
            couponSelectionStatus[code] = !couponSelectionStatus[code];
            var discountValue = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(clickedCoupon, 'discountUnits[0]', {
                value: 0
            });
            if (couponSelectionStatus[code]) {
                maximumSavings += discountValue.value;
            }
            else {
                maximumSavings -= discountValue.value;
            }
            return {
                couponSelectionStatus: couponSelectionStatus,
                maximumSavings: maximumSavings
            };
        }, function () { return callback && callback(); });
    };
    CouponsContainer.prototype.setCouponCode = function (event) {
        this.setState({
            couponInput: event.currentTarget.value,
            appliedCoupon: '',
            errorMessage: ''
        });
    };
    CouponsContainer.prototype.setInputToFocus = function () {
        (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.isMobile)()
            ? window.scroll(0, 0)
            : this.inputField && this.inputField.focus();
    };
    CouponsContainer.prototype.onApplyAllCouponsSuccess = function (res) {
        this.setState({ loading: false });
        if (res.coupons) {
            var applyAllCouponResponse = new _CouponsResponseHandler__WEBPACK_IMPORTED_MODULE_10__.default(res, 'applyAllCoupons');
            if (applyAllCouponResponse.isCouponsError()) {
                this.applyCouponsErrorCallback({}, [], applyAllCouponResponse);
            }
            else {
                var _a = applyAllCouponResponse.getApplyAllNotificationData(), successCouponsCount = _a.successCouponsCount, expiredCouponsCount = _a.expiredCouponsCount, couponDiscountValue = _a.couponDiscountValue;
                if (successCouponsCount || expiredCouponsCount) {
                    var type = 'APPLY_ALL';
                    type += successCouponsCount !== 0 ? '_SUCCESS' : '';
                    type += expiredCouponsCount !== 0 ? '_EXPIRED' : '';
                    (0,_CouponsShellNotification__WEBPACK_IMPORTED_MODULE_11__.default)(commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.couponsNotificationTypes[type], {
                        successCouponsCount: successCouponsCount,
                        expiredCouponsCount: expiredCouponsCount,
                        couponDiscountValue: couponDiscountValue
                    });
                }
                this.setState({
                    couponApplied: true
                });
                this.props.goBack && this.props.goBack();
            }
        }
        else {
            this.applyCouponsErrorCallback();
        }
        this.triggerAnalyticsEvents(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(res, 'coupons', []));
    };
    CouponsContainer.prototype.triggerAnalyticsEvents = function (coupons) {
        var _this = this;
        var uidx = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getUidx)();
        var gaSuccessArray = coupons
            .filter(function (_a) {
            var status = _a.status;
            return status === 'SUCCESS';
        })
            .reduce(function (_a, res) {
            var code = _a.code;
            return __spreadArray(__spreadArray([], res, true), [
                { code: code, type: _this.state.couponInput ? 'typed' : 'selected' }
            ], false);
        }, []);
        var maxTime = (0,commonUtils_GrowthHackConfigManager__WEBPACK_IMPORTED_MODULE_8__.getGrowthHackConfigValue)('COUPON_EXPIRY').maximumTime;
        var maSuccessArray = coupons
            .filter(function (_a) {
            var status = _a.status;
            return status === 'SUCCESS';
        })
            .reduce(function (res, coupon) {
            var expiryData = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_6__.getFullDateDiff)(coupon.expiry);
            var flag = !!(expiryData.days === 0 && expiryData.hours < maxTime);
            var couponData = __assign(__assign({}, coupon), { flag: flag, expiry_days: expiryData.days, expiry_hours: expiryData.hours, expiry_mins: expiryData.minutes, expiry_secs: expiryData.seconds, coupon_applicability: 'applied' });
            return __spreadArray(__spreadArray([], res, true), [couponData], false);
        }, []);
        var gaErrorArray = coupons
            .filter(function (_a) {
            var status = _a.status;
            return status === 'ERROR';
        })
            .reduce(function (_a, res) {
            var code = _a.code, message = _a.message;
            return __spreadArray(__spreadArray([], res, true), [{ code: code, error: message }], false);
        }, []);
        gaSuccessArray.length !== 0 &&
            triggerEvent('APPLY_COUPON_SUCCESS', {
                gaLabel: JSON.stringify({
                    coupon: gaSuccessArray,
                    uidx: uidx
                }),
                maData: {
                    entity_type: 'apply coupon',
                    entity_name: 'coupon',
                    entity_id: maSuccessArray
                },
                custom: {
                    widget: {
                        name: 'Checkout-Apply-Coupon',
                        type: 'Apply-Coupon'
                    }
                }
            });
        gaErrorArray.length !== 0 &&
            triggerEvent('APPLY_COUPON_ERROR', {
                gaLabel: JSON.stringify({ uidx: uidx, errorCoupons: gaErrorArray })
            });
    };
    CouponsContainer.prototype.applyAllCoupons = function (coupons, isCouponsPage, successCallBack) {
        var _this = this;
        if (isCouponsPage === void 0) { isCouponsPage = false; }
        if (successCallBack === void 0) { successCallBack = function () { }; }
        this.props.handleCartAction('applyAllCoupons', coupons, function (res) {
            _this.onApplyAllCouponsSuccess(res);
            successCallBack();
        }, function (err) { return _this.applyCouponsErrorCallback(err, coupons); }, {}, isCouponsPage ? { pagesource: commonUtils_constants__WEBPACK_IMPORTED_MODULE_9__.checkoutPage.COUPONS } : {});
    };
    CouponsContainer.prototype.checkForDuplicateCoupon = function (coupons, inputCoupon) {
        //first is the inputCoupon
        return !!coupons
            .slice(1)
            .find(function (_a) {
            var code = _a.code;
            return code.toLowerCase() === inputCoupon.toLowerCase();
        });
    };
    CouponsContainer.prototype.applyCoupon = function (e) {
        if (e === void 0) { e = {}; }
        triggerEvent('CLICK_APPLY_COUPON');
        var coupons = [];
        this.setState({ loading: true });
        var _a = this.state, couponSelectionStatus = _a.couponSelectionStatus, couponInput = _a.couponInput;
        var dataMethod = e.currentTarget && e.currentTarget.getAttribute('data-method');
        dataMethod === 'couponInputApply' &&
            coupons.push({
                code: couponInput,
                type: 'coupon'
            });
        for (var code in couponSelectionStatus) {
            if (couponSelectionStatus[code] === true) {
                coupons.push({
                    code: code,
                    type: 'coupon'
                });
            }
        }
        this.checkForDuplicateCoupon(coupons, couponInput)
            ? this.setState({
                errorMessage: DUPLICATE_COUPON_ERROR_MESSAGE,
                loading: false
            })
            : dataMethod === 'couponInputApply'
                ? /* This is required to differentiate between the calls made from the cart page and the coupons modal.
                   Needed by the back end to handle user applied coupons vs auto applied coupons. */
                    this.applyAndGetCoupons(coupons, true)
                : this.applyAllCoupons(coupons, true);
    };
    CouponsContainer.prototype.mapToCouponsRequest = function (code) {
        return { code: code, type: 'coupon' };
    };
    CouponsContainer.prototype.applyCouponWithCode = function (code, successCallBack) {
        var _a, _b;
        if (successCallBack === void 0) { successCallBack = function () { }; }
        var _c = this.props, updateCheckoutState = _c.updateCheckoutState, interactedCoupons = _c.interactedCoupons;
        interactedCoupons &&
            updateCheckoutState({
                interactedCoupons: lodash_without__WEBPACK_IMPORTED_MODULE_3___default()(interactedCoupons, code)
            });
        triggerEvent((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('COUPON_NUDGES')
            ? 'COUPON_NUDGES_APPLY_CLICKED'
            : 'AUTO_APPLY_APPLY_CLICKED', {
            custom: {
                custom: { v1: code }
            }
        });
        var coupons = (_b = lodash_union__WEBPACK_IMPORTED_MODULE_4___default()((_a = this.props.coupons) === null || _a === void 0 ? void 0 : _a.map(function (coupon) { return coupon === null || coupon === void 0 ? void 0 : coupon.code; }), [code])) === null || _b === void 0 ? void 0 : _b.map(this.mapToCouponsRequest);
        this.applyAllCoupons(coupons, false, successCallBack);
    };
    CouponsContainer.prototype.removeWithCouponCode = function (code) {
        var _a, _b;
        var _c = this.props, updateCheckoutState = _c.updateCheckoutState, interactedCoupons = _c.interactedCoupons;
        updateCheckoutState({
            interactedCoupons: interactedCoupons
                ? __spreadArray(__spreadArray([], interactedCoupons, true), [code], false) : [code]
        });
        var coupons = (_b = lodash_without__WEBPACK_IMPORTED_MODULE_3___default()((_a = this.props.coupons) === null || _a === void 0 ? void 0 : _a.map(function (coupon) { return coupon === null || coupon === void 0 ? void 0 : coupon.code; }), code)) === null || _b === void 0 ? void 0 : _b.map(this.mapToCouponsRequest);
        this.applyAndGetCoupons(coupons);
        triggerEvent((0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('COUPON_NUDGES')
            ? 'COUPON_NUDGES_COUPON_REMOVE'
            : 'AUTO_APPLY_COUPON_REMOVE', {
            maData: {
                entity_type: (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_7__.isFeatureEnabled)('COUPON_NUDGES')
                    ? 'Cart - coupon_nudge_coupon_removed'
                    : 'Cart - new_user_coupon_removed',
                entity_name: 'coupon'
            },
            custom: {
                custom: { v1: code }
            }
        });
    };
    CouponsContainer.prototype.render = function () {
        var _a = this, state = _a.state, applyCoupon = _a.applyCoupon, setCouponCode = _a.setCouponCode, onCouponClick = _a.onCouponClick, onRetryAction = _a.onRetryAction, renderBannerFG = _a.renderBannerFG, applyCouponWithCode = _a.applyCouponWithCode, removeWithCouponCode = _a.removeWithCouponCode;
        return this.props.render({
            state: state,
            applyCoupon: applyCoupon,
            setCouponCode: setCouponCode,
            onCouponClick: onCouponClick,
            onRetryAction: onRetryAction,
            renderBannerFG: renderBannerFG,
            applyCouponWithCode: applyCouponWithCode,
            removeWithCouponCode: removeWithCouponCode
        });
    };
    return CouponsContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.Component));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CouponsContainer);


/***/ }),

/***/ "./browser/components/cart/desktop/OptionsBlock/Coupons/CouponsModal/index.js":
/*!************************************************************************************!*\
  !*** ./browser/components/cart/desktop/OptionsBlock/Coupons/CouponsModal/index.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CouponsUI": () => (/* binding */ CouponsUI),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _couponsModal_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./couponsModal.base.css */ "./browser/components/cart/desktop/OptionsBlock/Coupons/CouponsModal/couponsModal.base.css");
/* harmony import */ var _common_Coupons_CouponsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/Coupons/CouponsHandler */ "./browser/components/cart/common/Coupons/CouponsHandler/index.js");
/* harmony import */ var _common_Coupons_CouponsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/Coupons/CouponsForm */ "./browser/components/cart/common/Coupons/CouponsForm/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/Loader */ "./browser/components/common/Loader/index.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../utils/maHelper */ "./browser/utils/maHelper.js");
/* harmony import */ var _utils_maHelper__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_utils_maHelper__WEBPACK_IMPORTED_MODULE_6__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var CouponsUI = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modal },
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _couponsModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.couponsModalHeader }, "APPLY COUPON"),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Loader__WEBPACK_IMPORTED_MODULE_5__.default, { show: props.loading, backdrop: true }),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_Coupons_CouponsForm__WEBPACK_IMPORTED_MODULE_3__.CouponsForm, __assign({}, props)))); };
var CouponsModal = /** @class */ (function (_super) {
    __extends(CouponsModal, _super);
    function CouponsModal(props) {
        return _super.call(this, props) || this;
    }
    CouponsModal.prototype.componentDidMount = function () {
        triggerEvent('COUPON_SCREEN_LOAD', (_utils_maHelper__WEBPACK_IMPORTED_MODULE_6___default()));
    };
    CouponsModal.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__.default, { className: _couponsModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modalContainer, cancelCallback: this.props.cancelCallback, cancelIconConfig: { show: true } }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_Coupons_CouponsHandler__WEBPACK_IMPORTED_MODULE_2__.default, { handleCartAction: _this.props.handleCartAction, cartId: _this.props.cartId, appliedCoupon: _this.props.appliedCoupon, goBack: onCancel, render: function (_a) {
                var state = _a.state, applyCoupon = _a.applyCoupon, setCouponCode = _a.setCouponCode, onCouponClick = _a.onCouponClick, onRetryAction = _a.onRetryAction, renderBannerFG = _a.renderBannerFG;
                return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CouponsUI, __assign({}, state, { applyCoupon: applyCoupon, setCouponCode: setCouponCode, onCouponClick: onCouponClick, onRetryAction: onRetryAction, renderBannerFG: renderBannerFG, analytics: _this.props.analytics })));
            } })); }));
    };
    return CouponsModal;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CouponsModal);


/***/ }),

/***/ "./browser/components/cart/desktop/OptionsBlock/GiftWrap/GiftWrapModal/index.js":
/*!**************************************************************************************!*\
  !*** ./browser/components/cart/desktop/OptionsBlock/GiftWrap/GiftWrapModal/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./giftWrapModal.base.css */ "./browser/components/cart/desktop/OptionsBlock/GiftWrap/GiftWrapModal/giftWrapModal.base.css");
/* harmony import */ var _common_GiftWrap_GiftWrapDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../common/GiftWrap/GiftWrapDetails */ "./browser/components/cart/common/GiftWrap/GiftWrapDetails/index.js");
/* harmony import */ var _common_GiftWrap_GiftWrapForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/GiftWrap/GiftWrapForm */ "./browser/components/cart/common/GiftWrap/GiftWrapForm/index.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};






var GiftWrapModal = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_4__.default, { className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.modal, cancelCallback: props.goBack, cancelIconConfig: { show: true } }, function (onCancel) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.container },
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.left },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_GiftWrap_GiftWrapForm__WEBPACK_IMPORTED_MODULE_3__.default, __assign({}, props, { goBack: onCancel }))),
    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.right },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.images },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_5__.default, { name: "giftwrap-1" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_5__.default, { name: "giftwrap-2", className: _giftWrapModal_base_css__WEBPACK_IMPORTED_MODULE_1__.default.giftWrapImg })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_common_GiftWrap_GiftWrapDetails__WEBPACK_IMPORTED_MODULE_2__.default, null)))); })); };
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GiftWrapModal);


/***/ })

}]);
//# sourceMappingURL=cartOptions.js.map