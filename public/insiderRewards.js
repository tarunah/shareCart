(self["webpackChunk"] = self["webpackChunk"] || []).push([["insiderRewards"],{

/***/ "./browser/components/common/ConfettiV2/index.js":
/*!*******************************************************!*\
  !*** ./browser/components/common/ConfettiV2/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ANIM_STATES": () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_1__.ANIM_STATES)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./browser/components/common/ConfettiV2/utils.js");
/*
    Confetti is a component that shows a confetti animation by drawing over a canvas.
    Usage: Just add <Confetti /> to any component to play the confetti animation on mount.
    Props :-
        1. animState: Use this prop to switch b/w different animation states:
             play (default), pause and stop (loop to be added later)
        2. className: One important usecase can be to add the confetti animation as an overlay
             over a component. This can be done by setting z-index CSS property.
        3. getConfettoConfig: A function that is called to get initial config for each confetto.
             Config includes properties like position, color, velocity, etc. Check out
             getDefaultConfettoConfig in .utils/js for more.
        4. confettiConfig: An object that contains config for the whole confetti animation.
             Stuff like number of pieces, gravity, colors, etc. can be configured here.
        5. updateConfetto: A function that is called to re-paint or update a confetto on each
             animation frame. The animation can be customized by passing in a function here.
             Check out updateConfetto below for more.
        6. onAnimationEnd: A callback that is called when the confetti animation ends.
*/
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
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



/*
    Confetto is a piece in confetti. Here, it is essentially just an object that
    contains its config.
*/
var Confetto = function (_a) {
    var getConfettoConfig = _a.getConfettoConfig, props = __rest(_a, ["getConfettoConfig"]);
    return (__assign(__assign({}, (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getDefaultConfettoConfig)(props)), (getConfettoConfig && getConfettoConfig(props))));
};
var Confetti = function (props) {
    var _a = props.animState, animState = _a === void 0 ? _utils__WEBPACK_IMPORTED_MODULE_1__.ANIM_STATES.PLAY : _a, _b = props.className, className = _b === void 0 ? '' : _b;
    var confettiRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]), reqIdRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null), canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    var confettiConfig = __assign(__assign({}, _utils__WEBPACK_IMPORTED_MODULE_1__.defaultConfettiConfig), props.confettiConfig);
    var populateConfetti = function () {
        var confetti = confettiRef.current, canvas = canvasRef.current;
        while (confetti.length < confettiConfig.totalCount) {
            confetti.push(Confetto(__assign(__assign({ id: confetti.length, canvasH: canvas.height, canvasW: canvas.width }, props), { confettiConfig: confettiConfig })));
        }
    };
    var clearCanvas = function () {
        var canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    var setCanvasSize = function () {
        var canvas = canvasRef.current;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };
    var reset = function () {
        clearCanvas();
        confettiRef.current = [];
        populateConfetti();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        setCanvasSize();
        reset();
        window.addEventListener('resize', setCanvasSize);
        return function () {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        switch (animState) {
            case _utils__WEBPACK_IMPORTED_MODULE_1__.ANIM_STATES.PLAY:
                draw();
                break;
            case _utils__WEBPACK_IMPORTED_MODULE_1__.ANIM_STATES.STOP:
                reset();
        }
        return function () {
            return reqIdRef.current && window.cancelAnimationFrame(reqIdRef.current);
        };
    }, [animState]);
    var draw = function () {
        clearCanvas();
        if (!confettiRef.current.length) {
            props.onAnimationEnd && props.onAnimationEnd();
            return;
        }
        updateConfetti();
        reqIdRef.current = window.requestAnimationFrame(draw);
    };
    var updateConfetti = function () {
        var confetti = confettiRef.current, canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        confetti.forEach(function (confetto) {
            ctx.save();
            // save the current drawing state containing previously drawn confetti
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);
            // translate and rotate whole canvas before painting the confetto
            props.updateConfetto
                ? props.updateConfetto(__assign(__assign({ confetto: confetto }, props), { canvasH: canvas.height, canvasW: canvas.width, confettiConfig: confettiConfig }))
                : updateConfetto(confetto);
            ctx.fillStyle = confetto.color;
            var scaledHeight = confetto.dimensions.height * confetto.scale.y;
            var scaledWidth = confetto.dimensions.width * confetto.scale.x;
            ctx.fillRect(-scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            ctx.restore();
            // restore the previously saved state
        });
        confetti.forEach(function (confetto, i) {
            return confetto.position.y >= canvas.height && confetti.splice(i, 1);
        });
        // remove confetti that went beyond the canvas boundary
    };
    var updateConfetto = function (confetto) {
        var gravity = confettiConfig.gravity, maxVelocity = confettiConfig.maxVelocity, drag = confettiConfig.drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, maxVelocity);
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.x += (0,_utils__WEBPACK_IMPORTED_MODULE_1__.randomRange)(-1, 1); // just to add some randomness
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;
        confetto.scale.y = Math.cos((confetto.position.y + confetto.randomModifier) * 0.09);
        // This part is responsible to add swivel animation to each confetto.
        // randomModifier is to add some randomness and 0.09 is to slow down the animation.
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("canvas", { id: "confetti", ref: canvasRef })));
};
Confetti.propTypes = {
    animState: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    getConfettoConfig: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    confettiConfig: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
    updateConfetto: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onAnimationEnd: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Confetti);



/***/ }),

/***/ "./browser/components/common/ConfettiV2/utils.js":
/*!*******************************************************!*\
  !*** ./browser/components/common/ConfettiV2/utils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomRange": () => (/* binding */ randomRange),
/* harmony export */   "ANIM_STATES": () => (/* binding */ ANIM_STATES),
/* harmony export */   "defaultConfettiConfig": () => (/* binding */ defaultConfettiConfig),
/* harmony export */   "getDefaultConfettoConfig": () => (/* binding */ getDefaultConfettoConfig),
/* harmony export */   "randomColor": () => (/* binding */ randomColor)
/* harmony export */ });
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! commonResources/colors */ "./browser/components/resources/colors.js");
/* harmony import */ var commonResources_colors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(commonResources_colors__WEBPACK_IMPORTED_MODULE_0__);

var randomRange = function (min, max) { return Math.random() * (max - min) + min; };
var randomColor = function (colors) { return colors[Math.floor(randomRange(0, colors.length))]; };
/*
    Different states that the Confetti can be in. This can be configured using animState prop.
*/
var ANIM_STATES = {
    PLAY: 'play',
    PAUSE: 'pause',
    STOP: 'stop'
};
/*
    Default function that is called to get config for each confetto. This can be replaced
    by passing in getConfettoConfig prop. Note how each property can be randomized
    and customized for each confetto.
    Helpful Tip: checkout how each property is used and updated in Confetti for more.
*/
var getDefaultConfettoConfig = function (_a) {
    var id = _a.id, canvasH = _a.canvasH, canvasW = _a.canvasW, confettiConfig = _a.confettiConfig;
    return ({
        id: id,
        color: randomColor(confettiConfig.colors),
        position: {
            x: canvasW / 2,
            y: canvasH / 2
        },
        // Position is where the confetto shows up at first.
        dimensions: {
            width: randomRange(3, 6),
            height: randomRange(6, 12)
        },
        rotation: randomRange(0, 2 * Math.PI),
        /*
              Confetto is just a rectangle. Rotation defines how tilted this rectangle is initially.
          This can even be changed dynamically with each animation frame by passing in a custom
          updateConfetto prop.
          */
        scale: {
            x: 1,
            y: 1
        },
        // Scale is used to add swivel to each confetto in the confetti animation.
        velocity: {
            x: randomRange(-9, 9),
            y: randomRange(-6, -11)
        },
        randomModifier: randomRange(0, 99)
        /*
              Used to add some randomness to swivel animation of each confetto. Check out how this is
              used in updateConfetto for more.
          */
    });
};
/*
    Default config for confetti animation. This can be replaced by passing in confettiConfig prop.
    Helpful Tip: checkout how each property is used and updated in Confetti for more.
*/
var defaultConfettiConfig = {
    totalCount: 30,
    // number of pieces (confetto) that show up
    gravity: 0.35,
    // downward acceleration, used to update y-velocity of each confetto
    drag: 0.067,
    // air drag, used to update x-velocity of each confetto
    maxVelocity: 1.8,
    // max y-velocity for each confetto
    colors: [(commonResources_colors__WEBPACK_IMPORTED_MODULE_0___default().watermelon), (commonResources_colors__WEBPACK_IMPORTED_MODULE_0___default().blue), (commonResources_colors__WEBPACK_IMPORTED_MODULE_0___default().yellow_50)]
};



/***/ }),

/***/ "./browser/components/common/InsiderRewards/Components/index.js":
/*!**********************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/Components/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InsiderToolTip": () => (/* binding */ InsiderToolTip),
/* harmony export */   "InsiderTrialUserProgress": () => (/* binding */ InsiderTrialUserProgress),
/* harmony export */   "EarlyAccessText": () => (/* binding */ EarlyAccessText),
/* harmony export */   "InsiderRewardsTextV2": () => (/* binding */ InsiderRewardsTextV2),
/* harmony export */   "InsiderRewardsText": () => (/* binding */ InsiderRewardsText)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/ToolTip */ "./browser/components/common/ToolTip/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var _components_base_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components.base.css */ "./browser/components/common/InsiderRewards/Components/components.base.css");
/* harmony import */ var iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! iconComp/Info.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/Info.jsx");
/* harmony import */ var iconComp_SuperCoin_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! iconComp/SuperCoin.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/SuperCoin.jsx");
/* harmony import */ var iconComp_SuperCoin2X_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! iconComp/SuperCoin2X.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/SuperCoin2X.jsx");
/* harmony import */ var iconComp_SuperCoin3X_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! iconComp/SuperCoin3X.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/SuperCoin3X.jsx");
/* harmony import */ var iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! iconComp/InsiderLogoNew.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/InsiderLogoNew.jsx");












var triggerInfoClick = function (tierName, points, shouldTriggerEvent) {
    shouldTriggerEvent &&
        triggerEvent('INSIDER_REWARDS_INFO_CLICK', {
            custom: {
                custom: {
                    v1: tierName,
                    v2: points
                },
                widget: {
                    name: 'cart_supercoins_widget_info',
                    type: 'button'
                },
                event_type: 'widgetItemClick'
            }
        });
};
var InsiderToolTip = function (_a) {
    var _b = _a.toolTipText, toolTipText = _b === void 0 ? '' : _b, _c = _a.shouldTriggerEvent, shouldTriggerEvent = _c === void 0 ? false : _c, tierName = _a.tierName, points = _a.points;
    return toolTipText ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ToolTip__WEBPACK_IMPORTED_MODULE_2__.default, { elem: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_Info_jsx__WEBPACK_IMPORTED_MODULE_6__.default, { onClick: function () { return triggerInfoClick(tierName, points, shouldTriggerEvent); }, className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.tooltipInfoIcon }), className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.toolTipText, " ").concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.toolTipInsider), tipStyle: { left: '3px', top: '-6px' } }, toolTipText)) : null;
};
InsiderToolTip.propTypes = {
    insiderConfig: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)
};
var Title = function (_a) {
    var tierName = _a.tierName;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.title },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeTextGold },
            tierName.toUpperCase(),
            ' - '),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeTextGrey }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.CART_INSIDER_REWARDS.BENEFIT_ON_THIS_PURCHASE)));
};
var CoinsEarnedText = function (_a) {
    var points = _a.points, tooltip = _a.tooltip, coinMultiplier = _a.coinMultiplier;
    var strikePoints = Math.floor(points / Math.max(1, coinMultiplier));
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.coinsEarnedText },
        "You'll earn",
        coinMultiplier > 1 && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            ' ',
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.strikedPoints }, strikePoints))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.superCoin },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_SuperCoin_jsx__WEBPACK_IMPORTED_MODULE_7__.default, null)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold },
            points,
            " SuperCoins"),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.InsiderToolTip }, tooltip)));
};
var InsiderTrialUserProgress = function (_a) {
    var insiderDetails = _a.insiderDetails, cartData = _a.cartData;
    var requiredAmountToUpgrade = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.requiredAmountToUpgrade', 0);
    var tierProgressPercent = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.tierProgressPercent', 0);
    var insiderTrialsConfig = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()((0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('CONFIRMATION_PAGE_CONFIG'), 'insiderSuperCoin.insiderTrials', {});
    var _b = insiderTrialsConfig.shopMoreMessage, shopMoreMessage = _b === void 0 ? '' : _b, _c = insiderTrialsConfig.upgradeCartMessage, upgradeCartMessage = _c === void 0 ? '' : _c, _d = insiderTrialsConfig.goalAmount, goalAmount = _d === void 0 ? 0 : _d;
    if (!shopMoreMessage || !upgradeCartMessage)
        return null;
    var currentCartValue = Math.ceil(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'price.total', 0));
    var requiredAmountToEndTrial = requiredAmountToUpgrade - currentCartValue;
    var progressPercent = tierProgressPercent + (currentCartValue / goalAmount) * 100;
    progressPercent = progressPercent > 100 ? 100 : progressPercent;
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var message = requiredAmountToEndTrial > 0
            ? shopMoreMessage.replace('{{requiredAmount}}', "\u20B9".concat(requiredAmountToEndTrial))
            : "Congratulations! ".concat(upgradeCartMessage);
        triggerEvent('INSIDER_TRIALS_WIDGET_LOAD', {
            custom: {
                widget: {
                    name: 'trialprogressbar_load',
                    type: 'card'
                },
                custom: {
                    custom_variable_v1: requiredAmountToUpgrade,
                    custom_variable_v2: message
                }
            }
        });
    }, [currentCartValue]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderTrialUserProgressContainer }, requiredAmountToEndTrial > 0 ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(react__WEBPACK_IMPORTED_MODULE_0__.default.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.shopMoreMessage }, shopMoreMessage.split(/({{requiredAmount}})/g).map(function (item, index) {
            return item === '{{requiredAmount}}' ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index, className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.requiredAmountToEndTrial },
                "\u20B9",
                requiredAmountToEndTrial)) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { key: index }, " ".concat(item)));
        })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.progressBarTrial },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.progressBarFilled, style: { width: "".concat(progressPercent, "%") } }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.progressBarTrialAmount },
                    goalAmount - requiredAmountToEndTrial,
                    "/",
                    goalAmount))))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderTrialColorGreen },
            "Congratulations!",
            ' '),
        upgradeCartMessage))));
};
var EarlyAccessText = function (_a) {
    var cartData = _a.cartData;
    var cfaRemark = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'flags.coverFeeApplicable.remark') || '';
    var pcConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PRIORITY_CHECKOUT');
    var privilegeUserMap = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('FREE_EARLY_ACCESS_FOR_INSIDER');
    return (!!privilegeUserMap[cfaRemark] && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.EarlyAccessText) },
        pcConfig.freeEarlyAccessText || commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_4__.CART_INSIDER_REWARDS.EARLY_ACCESS_FREE,
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.EarlyAccessSaveText) },
            ' ',
            "Save \u20B9",
            pcConfig.charges))));
};
var InsiderRewardsTextV2 = function (_a) {
    var _b = _a.points, points = _b === void 0 ? 0 : _b, tooltip = _a.tooltip, _c = _a.tierName, tierName = _c === void 0 ? '' : _c, _d = _a.coinMultiplier, coinMultiplier = _d === void 0 ? 1 : _d;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.rewardsTextContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.coinMultiplier },
            coinMultiplier === 2 && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_SuperCoin2X_jsx__WEBPACK_IMPORTED_MODULE_8__.default, null),
            coinMultiplier === 3 && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_SuperCoin3X_jsx__WEBPACK_IMPORTED_MODULE_9__.default, null)),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.rewardsText },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_10__.default, { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderCrown, height: "24px", width: "24px" }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(Title, { tierName: tierName }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.flexBreak }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(CoinsEarnedText, { points: points, tooltip: tooltip, coinMultiplier: coinMultiplier }))));
};
var InsiderRewardsText = function (_a) {
    var points = _a.points, cartData = _a.cartData, tooltip = _a.tooltip, isSupercoinEnabled = _a.isSupercoinEnabled;
    var cfaRemark = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(cartData, 'flags.coverFeeApplicable.remark') || '';
    var pcConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('PRIORITY_CHECKOUT');
    var privilegeUserMap = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('FREE_EARLY_ACCESS_FOR_INSIDER');
    if (!!privilegeUserMap[cfaRemark]) {
        return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeContainer, " ").concat(!isSupercoinEnabled ? _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeHeader },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeText }, privilegeUserMap === null || privilegeUserMap === void 0 ? void 0 : privilegeUserMap[cfaRemark]),
                "PRIVILEGES ON THIS PURCHASE"),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderInfoText },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.privilegeEarnText }, "You will earn"),
                isSupercoinEnabled && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_SuperCoin_jsx__WEBPACK_IMPORTED_MODULE_7__.default, null),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold, " ").concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderPointsText) }, points),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold }, isSupercoinEnabled ? 'SuperCoins' : 'Insider points'),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.InsiderToolTip }, tooltip)),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", null,
                pcConfig.freeEarlyAccessText || 'Get Early Access for free!',
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold, " ").concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderSaveText) },
                    "Save \u20B9",
                    pcConfig.charges))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderInfoText, " ").concat(!isSupercoinEnabled ? _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold : '') },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderEarnText }, "You will earn"),
        isSupercoinEnabled && react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_SuperCoin_jsx__WEBPACK_IMPORTED_MODULE_7__.default, null),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: "".concat(isSupercoinEnabled ? _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold : _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.textGreen, " ").concat(_components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderPointsText) }, points),
        isSupercoinEnabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.bold }, 'SuperCoins')) : ('Insider points'),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("span", { className: _components_base_css__WEBPACK_IMPORTED_MODULE_5__.default.insiderPurchaseText }, "on this purchase"),
        tooltip));
};
InsiderRewardsText.propTypes = {
    points: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().number)
};


/***/ }),

/***/ "./browser/components/common/InsiderRewards/InsiderTierProgress/BenefitsModal/index.js":
/*!*********************************************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/InsiderTierProgress/BenefitsModal/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonComp/Modal */ "./browser/components/common/Modal/index.js");
/* harmony import */ var commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonComp/ImageBanner */ "./browser/components/common/ImageBanner/index.js");
/* harmony import */ var _benefitsModal_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./benefitsModal.base.css */ "./browser/components/common/InsiderRewards/InsiderTierProgress/BenefitsModal/benefitsModal.base.css");





var BenefitsModal = function (_a) {
    var showModal = _a.showModal, onClose = _a.onClose, tierName = _a.tierName, bannerName = _a.bannerName;
    return showModal && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_Modal__WEBPACK_IMPORTED_MODULE_2__.default, { cancelCallback: onClose, className: _benefitsModal_base_css__WEBPACK_IMPORTED_MODULE_4__.default.modal, cancelIconConfig: { show: true, className: _benefitsModal_base_css__WEBPACK_IMPORTED_MODULE_4__.default.closeIcon }, halfCard: true },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _benefitsModal_base_css__WEBPACK_IMPORTED_MODULE_4__.default.title }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_1__.CART_INSIDER_REWARDS.BENEFITS_MODAL_TITLE.replace('<tier>', tierName.toUpperCase())),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ImageBanner__WEBPACK_IMPORTED_MODULE_3__.default, { name: bannerName, className: _benefitsModal_base_css__WEBPACK_IMPORTED_MODULE_4__.default.banner })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BenefitsModal);


/***/ }),

/***/ "./browser/components/common/InsiderRewards/InsiderTierProgress/TierProgressBar/index.js":
/*!***********************************************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/InsiderTierProgress/TierProgressBar/index.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! iconComp/RupeeBold.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/RupeeBold.jsx");
/* harmony import */ var iconComp_TierCheck_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iconComp/TierCheck.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/TierCheck.jsx");
/* harmony import */ var iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! iconComp/InsiderLogoNew.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/InsiderLogoNew.jsx");
/* harmony import */ var _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tierProgressBar.base.css */ "./browser/components/common/InsiderRewards/InsiderTierProgress/TierProgressBar/tierProgressBar.base.css");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils.js */ "./browser/components/common/InsiderRewards/InsiderTierProgress/utils.js");






var TierDetails = function (_a) {
    var tierName = _a.tierName, index = _a.index, upgradeTierIndex = _a.upgradeTierIndex, scenario = _a.scenario, upgradeAmount = _a.upgradeAmount, tiersCount = _a.tiersCount;
    var isUpgradeScenario = scenario === _utils_js__WEBPACK_IMPORTED_MODULE_5__.SCENARIOS.UPGRADE;
    var lastCheckedIndex = upgradeTierIndex - (isUpgradeScenario ? 0 : 1);
    // If it's upgrade scenario, upgradeTierIndex (upgraded tier) will also be checked
    var isUpgradeTier = index === upgradeTierIndex;
    var hasUpgradedToTier = isUpgradeScenario && isUpgradeTier;
    var isChecked = index <= lastCheckedIndex;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.tierDetails, "\n\t\t\t").concat(index === 0 ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.firstTier : '', "\n\t\t\t").concat(index + 1 === tiersCount ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.lastTier : '') },
        tierName === 'Icon' && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_3__.default, { height: "26px", width: "35px", className: !isUpgradeTier ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.insiderLogo : '' })),
        isChecked ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.checkedTier, " ").concat(hasUpgradedToTier ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.upgradedTier : '') },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_TierCheck_jsx__WEBPACK_IMPORTED_MODULE_2__.default, { height: "19px", width: "19px" }))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.uncheckedTier })),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.tierName, " ").concat(isChecked ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.checkedTierName : '', "\n\t\t\t\t").concat(isUpgradeTier ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.upgradeTierName : '') }, tierName),
        isUpgradeTier && !hasUpgradedToTier && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.upgradeAmtText },
            "Shop for",
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_RupeeBold_jsx__WEBPACK_IMPORTED_MODULE_1__.default, { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.upgradeAmtRupee }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("b", null, upgradeAmount),
            " more"))));
};
var TierProgressBar = function (_a) {
    var upgradeTierIndex = _a.upgradeTierIndex, tierNames = _a.tierNames, currentProgressPercent = _a.currentProgressPercent, purchaseProgressPercent = _a.purchaseProgressPercent, scenario = _a.scenario, upgradeAmount = _a.upgradeAmount, _b = _a.animate, animate = _b === void 0 ? false : _b;
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.tierContainer },
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.progressContainer },
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.currentProgressBar, " ").concat(animate ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.animate : ''), style: { width: "".concat(currentProgressPercent, "%") } }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.progressPoint }),
            react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.purchaseProgressBar, " ").concat(animate ? _tierProgressBar_base_css__WEBPACK_IMPORTED_MODULE_4__.default.animate : ''), style: { width: "".concat(purchaseProgressPercent, "%") } })),
        tierNames.map(function (name, index) { return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(TierDetails, { tierName: name, index: index, upgradeTierIndex: upgradeTierIndex, scenario: scenario, upgradeAmount: upgradeAmount, key: index, tiersCount: tierNames.length })); })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TierProgressBar);


/***/ }),

/***/ "./browser/components/common/InsiderRewards/InsiderTierProgress/index.js":
/*!*******************************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/InsiderTierProgress/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/Strings */ "./browser/utils/Strings.js");
/* harmony import */ var customHooks_useModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! customHooks/useModal */ "./browser/hooks/useModal.js");
/* harmony import */ var _insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./insiderTierProgress.base.css */ "./browser/components/common/InsiderRewards/InsiderTierProgress/insiderTierProgress.base.css");
/* harmony import */ var _TierProgressBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TierProgressBar */ "./browser/components/common/InsiderRewards/InsiderTierProgress/TierProgressBar/index.js");
/* harmony import */ var _BenefitsModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BenefitsModal */ "./browser/components/common/InsiderRewards/InsiderTierProgress/BenefitsModal/index.js");
/* harmony import */ var commonComp_ConfettiV2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonComp/ConfettiV2 */ "./browser/components/common/ConfettiV2/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./browser/components/common/InsiderRewards/InsiderTierProgress/utils.js");
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










/*
    Calculates and returns data related to the progress the user makes
    in the current tier with the current purchase.
*/
var getPurchaseProgressData = function (config, purchaseAmount) {
    var _a = (0,_utils__WEBPACK_IMPORTED_MODULE_8__.getScenario)(config, purchaseAmount), scenario = _a[0], upgradeTierIndex = _a[1];
    var currentUpgradeAmount = config.currentUpgradeAmounts[upgradeTierIndex] || 0;
    var extraAmountForUpgrade = Math.max(0, currentUpgradeAmount - purchaseAmount);
    var purchaseProgress = (0,_utils__WEBPACK_IMPORTED_MODULE_8__.calcPurchaseProgress)(__assign(__assign({}, config), { upgradeTierIndex: upgradeTierIndex, scenario: scenario, purchaseAmount: purchaseAmount, currentUpgradeAmount: currentUpgradeAmount }));
    return {
        scenario: scenario,
        extraAmountForUpgrade: extraAmountForUpgrade,
        purchaseProgress: purchaseProgress,
        upgradeTierIndex: upgradeTierIndex
    };
    /*
          scenario: upgrade or close to upgrade
          upgradeTierIndex: tier user is upgrading to with current purchase
              or is close to upgrade to (ie. next tier)
          extraAmountForUpgrade: amt needed to upgrade after this purchase
          purchaseProgress: extra progress user makes with the current purchase (%)
      */
};
/*
    Sets purchase related data in state which is eventually added to config ref
    variable in getConfig function.
*/
var setPurchaseData = function (config, selectedProducts, setPurchaseProgressData) {
    var purchaseAmount = (0,_utils__WEBPACK_IMPORTED_MODULE_8__.calcPurchaseAmount)(selectedProducts);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        setPurchaseProgressData(getPurchaseProgressData(config, purchaseAmount));
    }, [config, purchaseAmount]);
    // only update purchase related data when purchase amt changes
};
/*
    Sets config for the whole component in 'config' state variable.
*/
var getConfig = function (props) {
    var _a = props.insiderDetails, insiderDetails = _a === void 0 ? {} : _a, _b = props.selectedProducts, selectedProducts = _b === void 0 ? [] : _b, setPurchaseProgressData = props.setPurchaseProgressData;
    // insiderDetails: data fetched from API
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        tierNames: [],
        currentTierIndex: 0,
        currentProgress: 0,
        tierUpgradeAmounts: [],
        currentUpgradeAmounts: [],
        bannerNames: []
    }), config = _c[0], setConfig = _c[1];
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var GHConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('CART_INSIDER_PROGRESS');
        var tierNames = GHConfig.tierNames;
        var currentTierIndex = tierNames.indexOf((0,_utils__WEBPACK_IMPORTED_MODULE_8__.getFromAPIResponse)(insiderDetails, 'currentTierName'));
        var currentTierProgress = (0,_utils__WEBPACK_IMPORTED_MODULE_8__.getFromAPIResponse)(insiderDetails, 'tierProgressPercent');
        setConfig({
            tierNames: tierNames,
            currentTierIndex: currentTierIndex,
            currentProgress: (0,_utils__WEBPACK_IMPORTED_MODULE_8__.calcCurrentProgress)(tierNames, currentTierIndex, currentTierProgress),
            tierUpgradeAmounts: GHConfig.tierUpgradeAmounts || [],
            currentUpgradeAmounts: (0,_utils__WEBPACK_IMPORTED_MODULE_8__.getCurrentUpgradeAmounts)(insiderDetails),
            bannerNames: GHConfig.bannerNames || []
        });
        /*
                currentProgress: before the current purchase, total % user has progressed
                    since the first tier
                tierUpgradeAmounts: total amount gaps between consecutive tiers
                currentUpgradeAmounts: amount needed to upgrade to each tier
            */
    }, [insiderDetails]);
    setPurchaseData(config, selectedProducts, setPurchaseProgressData);
    return config;
};
/*
    Updates animations when component comes into or goes out of view.
*/
var updateAnimation = function (_a) {
    var eventData = _a.eventData, setAnimate = _a.setAnimate, setShowProgress = _a.setShowProgress, observer = _a.observer, entry = _a.entry, animCountRef = _a.animCountRef;
    if (entry.isIntersecting &&
        entry.intersectionRatio === 1 &&
        animCountRef.current < _utils__WEBPACK_IMPORTED_MODULE_8__.MAX_ANIM_COUNT) {
        !animCountRef.current && (0,_utils__WEBPACK_IMPORTED_MODULE_8__.triggerInViewPort)(eventData);
        // trigger the event only once
        animCountRef.current++;
        setAnimate(true);
        setShowProgress(true);
        // start animations when comp in view
    }
    else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
        if (animCountRef.current === _utils__WEBPACK_IMPORTED_MODULE_8__.MAX_ANIM_COUNT) {
            observer.disconnect();
            setAnimate(false);
            setShowProgress(true);
            // stop observing & stop animation but keep showing static progress bar UI
        }
        else {
            setAnimate(false);
            setShowProgress(false);
            // stop animation and hide progress bar UI when comp goes out of view
        }
    }
};
var getRef = function (_a) {
    var purchaseProgressData = _a.purchaseProgressData, mrp = _a.mrp, points = _a.points, config = _a.config, setAnimate = _a.setAnimate, setShowProgress = _a.setShowProgress, animCountRef = _a.animCountRef;
    var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
        var eventData = __assign(__assign(__assign({}, purchaseProgressData), config), { mrp: mrp, points: points });
        var observer = window.IntersectionObserver &&
            new window.IntersectionObserver(function (entries, observer) {
                return updateAnimation({
                    eventData: eventData,
                    setAnimate: setAnimate,
                    setShowProgress: setShowProgress,
                    entry: entries[0],
                    observer: observer,
                    animCountRef: animCountRef
                });
            }, {
                rootMargin: '0px 0px -80px 0px',
                // 80px because of sticky place order button
                threshold: [0, 1]
            });
        ref.current && observer && observer.observe(ref.current);
        return function () { return observer && observer.disconnect(); };
    }, [purchaseProgressData, config, mrp, points]);
    return ref;
};
// For UPGRADE and CLOSE_TO_UPGRADE scenarios
var UpgradeComp = function (props) {
    var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), animate = _a[0], setAnimate = _a[1];
    var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false), showProgress = _b[0], setShowProgress = _b[1];
    // control to show/hide progress bar UI
    var _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}), purchaseProgressData = _c[0], setPurchaseProgressData = _c[1];
    var _d = (0,customHooks_useModal__WEBPACK_IMPORTED_MODULE_3__.default)(), isModalShown = _d[0], toggleModalState = _d[1];
    var animCountRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    // count of how many times animations have been played
    var config = getConfig(__assign(__assign({}, props), { setPurchaseProgressData: setPurchaseProgressData }));
    var _e = config.tierNames, tierNames = _e === void 0 ? (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('CART_INSIDER_PROGRESS').tierNames : _e, _f = config.currentTierIndex, currentTierIndex = _f === void 0 ? 0 : _f, _g = config.currentProgress, currentProgress = _g === void 0 ? 0 : _g, _h = config.bannerNames, bannerNames = _h === void 0 ? [] : _h;
    var _j = purchaseProgressData.purchaseProgress, purchaseProgress = _j === void 0 ? 0 : _j, _k = purchaseProgressData.upgradeTierIndex, upgradeTierIndex = _k === void 0 ? 1 : _k, _l = purchaseProgressData.scenario, scenario = _l === void 0 ? _utils__WEBPACK_IMPORTED_MODULE_8__.SCENARIOS.CLOSE_TO_UPGRADE : _l, _m = purchaseProgressData.extraAmountForUpgrade, extraAmountForUpgrade = _m === void 0 ? 0 : _m;
    // all the purchase related data
    var upgradeTierName = tierNames[upgradeTierIndex] || '';
    var toggleModal = function () {
        (0,_utils__WEBPACK_IMPORTED_MODULE_8__.triggerModalToggle)(upgradeTierName, isModalShown);
        toggleModalState();
    };
    var ref = getRef({
        purchaseProgressData: purchaseProgressData,
        mrp: props.mrp,
        points: props.points,
        config: config,
        setAnimate: setAnimate,
        setShowProgress: setShowProgress,
        animCountRef: animCountRef
    });
    var iconIndex = tierNames.indexOf('Icon');
    if (currentTierIndex + 1 === tierNames.length)
        return null;
    // For the last tier, there is no UPGRADE or CLOSE_TO_UPGRADE scenario
    return (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__.default.insiderContainer, " ").concat(upgradeTierIndex === iconIndex ? _insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__.default.iconContainer : ''), ref: ref },
        scenario === _utils__WEBPACK_IMPORTED_MODULE_8__.SCENARIOS.UPGRADE && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(commonComp_ConfettiV2__WEBPACK_IMPORTED_MODULE_7__.default, __assign({ className: _insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__.default.confetti }, _utils__WEBPACK_IMPORTED_MODULE_8__.confettiConfigProps, { animState: animate ? commonComp_ConfettiV2__WEBPACK_IMPORTED_MODULE_7__.ANIM_STATES.PLAY : commonComp_ConfettiV2__WEBPACK_IMPORTED_MODULE_7__.ANIM_STATES.STOP }))),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__.default.upgradeMsg }, scenario === _utils__WEBPACK_IMPORTED_MODULE_8__.SCENARIOS.CLOSE_TO_UPGRADE
            ? commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.CART_INSIDER_REWARDS.CLOSE_TO_UPGRADE_MSG
            : commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.CART_INSIDER_REWARDS.UPGRADE_MSG.replace('<tier>', upgradeTierName.toUpperCase())),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _insiderTierProgress_base_css__WEBPACK_IMPORTED_MODULE_4__.default.viewBenefits, onClick: toggleModal }, commonBrowserUtils_Strings__WEBPACK_IMPORTED_MODULE_2__.CART_INSIDER_REWARDS.VIEW_BENEFITS),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_TierProgressBar__WEBPACK_IMPORTED_MODULE_5__.default, { upgradeTierIndex: upgradeTierIndex, tierNames: tierNames, scenario: scenario, currentProgressPercent: showProgress ? currentProgress : 0, purchaseProgressPercent: showProgress ? purchaseProgress : 0, upgradeAmount: extraAmountForUpgrade, animate: animate }),
        react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_BenefitsModal__WEBPACK_IMPORTED_MODULE_6__.default, { showModal: isModalShown, onClose: toggleModal, tierName: upgradeTierName.toUpperCase(), bannerName: bannerNames[upgradeTierIndex] })));
};
var InsiderTierProgress = function (props) {
    return react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(UpgradeComp, __assign({}, props));
    // Retention case is planned for later.
};
InsiderTierProgress.propTypes = {
    insiderDetails: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object.isRequired),
    selectedProducts: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().array.isRequired),
    mrp: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().number.isRequired),
    points: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().number.isRequired)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InsiderTierProgress);


/***/ }),

/***/ "./browser/components/common/InsiderRewards/InsiderTierProgress/utils.js":
/*!*******************************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/InsiderTierProgress/utils.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SCENARIOS": () => (/* binding */ SCENARIOS),
/* harmony export */   "MAX_ANIM_COUNT": () => (/* binding */ MAX_ANIM_COUNT),
/* harmony export */   "confettiConfigProps": () => (/* binding */ confettiConfigProps),
/* harmony export */   "getFromAPIResponse": () => (/* binding */ getFromAPIResponse),
/* harmony export */   "calcPurchaseAmount": () => (/* binding */ calcPurchaseAmount),
/* harmony export */   "calcCurrentProgress": () => (/* binding */ calcCurrentProgress),
/* harmony export */   "calcPurchaseProgress": () => (/* binding */ calcPurchaseProgress),
/* harmony export */   "getCurrentUpgradeAmounts": () => (/* binding */ getCurrentUpgradeAmounts),
/* harmony export */   "getScenario": () => (/* binding */ getScenario),
/* harmony export */   "triggerInViewPort": () => (/* binding */ triggerInViewPort),
/* harmony export */   "triggerModalToggle": () => (/* binding */ triggerModalToggle)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");


var randomRange = function (min, max) { return Math.random() * (max - min) + min; };
var MAX_ANIM_COUNT = 2;
// maximum no. of times confetti and tier progress bar animations should play
var SCENARIOS = {
    UPGRADE: 'upgrade',
    CLOSE_TO_UPGRADE: 'closeToUpgrade',
    RETENTION: 'retention'
    /*
      upgrade: if the user upgrades to a tier with current purchase
      closeToUpgrade: if the user progressed towards next tier
      retention: if the user has to retain the current tier first before
        progressing/upgrading
    */
};
// Check out these configs in Confetti for more
var confettiConfig = {
    totalCount: 20,
    gravity: 0.35
};
// Check out these configs in Confetti for more
var getConfettoConfig = function () { return ({
    velocity: {
        x: Math.random() > 0.5 ? 5 : -5,
        y: randomRange(-6, -11)
    },
    randomModifier: 0
}); };
// Check out these configs in Confetti for more
var confettiConfigProps = {
    confettiConfig: confettiConfig,
    getConfettoConfig: getConfettoConfig
};
/*
  Keys to fetch data from API response.
  Format -> name: [path, default_value]
*/
var dataKeys = {
    progressInfo: ['data.tierProgressInfo', {}],
    currentTierName: ['data.tierProgressInfo.tierName', 'Select'],
    tierProgressPercent: ['data.tierProgressInfo.tierProgressPercent', 0],
    superCoinMultiplier: ['data.tierProgressInfo.supercoinsMultiplier', 1],
    upgradeAmountKeys: [
        ['', 0],
        // there is no amt to upgrade to Select, added for consistency
        ['data.tierProgressInfo.requiredAmountToUpgradeToElite', 0],
        ['data.tierProgressInfo.requiredAmountToUpgradeToIcon', 0]
    ]
    /*
      tierProgressPercent: % user has progressed since cur tier beginning
        ie. 50% for a Select means midway between Select and Elite
    */
};
var getFromAPIResponse = function (data, key) {
    return dataKeys[key] && lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, dataKeys[key][0], dataKeys[key][1]);
};
var calcPurchaseAmount = function (products) {
    return Math.floor(products.reduce(function (tot, product) { return (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_1__.getSubTotal)(product) + tot; }, 0));
};
/*
  Calculates total % user has progressed since the first tier.
*/
var calcCurrentProgress = function (tierNames, currentTierIndex, currentTierProgress) {
    var gaps = tierNames.length - 1;
    var progressTillCurrentTier = (currentTierIndex * 100) / gaps;
    var progressAfterCurrentTier = currentTierProgress / gaps;
    var currentProgress = Math.floor(progressTillCurrentTier + progressAfterCurrentTier);
    return Math.min(100, currentProgress);
};
/*
  Calculates extra progress user makes with the current purchase (%).
  Note: here extra means % the user progressed after the current position
    in the whole insider journey.
*/
var calcPurchaseProgress = function (_a) {
    var tierNames = _a.tierNames, currentTierIndex = _a.currentTierIndex, upgradeTierIndex = _a.upgradeTierIndex, scenario = _a.scenario, purchaseAmount = _a.purchaseAmount, currentUpgradeAmount = _a.currentUpgradeAmount, tierUpgradeAmounts = _a.tierUpgradeAmounts, currentProgress = _a.currentProgress;
    var purchaseProgress = 0;
    var gaps = tierNames.length - 1;
    if (scenario === SCENARIOS.UPGRADE) {
        var progressTillUpgradeTier = (upgradeTierIndex * 100) / gaps;
        var remainingAmount = purchaseAmount - currentUpgradeAmount;
        var progressAfterUpgradeTier = (remainingAmount * 100) /
            Math.max(1, tierUpgradeAmounts[upgradeTierIndex] * gaps);
        purchaseProgress =
            progressTillUpgradeTier - currentProgress + progressAfterUpgradeTier;
    }
    else {
        var tierUpgradeAmount = tierUpgradeAmounts[currentTierIndex];
        purchaseProgress =
            (purchaseAmount * 100) / Math.max(1, tierUpgradeAmount * gaps);
    }
    /*
      progressTillUpgradeTier: % progress from first tier till upgraded tier
      currentProgress: % progress from first tier till current position in insider journey
      progressAfterUpgradeTier: % progress just after upgraded tier
    */
    purchaseProgress = Math.floor(purchaseProgress);
    purchaseProgress = Math.min(100 - currentProgress, purchaseProgress);
    // currentProgress + purchaseProgress can't exceed 100%
    return purchaseProgress;
};
/*
  Calculates if the scenario is upgrade or close to upgrade and corresponding index.
*/
var getScenario = function (config, purchaseAmount) {
    var scenario = SCENARIOS.CLOSE_TO_UPGRADE, upgradeTierIndex = config.currentTierIndex + 1;
    // Checks if it is upgrade scenario
    config.currentUpgradeAmounts.forEach(function (upgradeAmount, index) {
        var canUpgradeToTier = purchaseAmount >= upgradeAmount;
        if (canUpgradeToTier && index > config.currentTierIndex) {
            upgradeTierIndex = index;
            scenario = SCENARIOS.UPGRADE;
        }
    });
    return [scenario, upgradeTierIndex];
};
/*
  Retrieves amount need to upgrade for each tier from API response.
*/
var getCurrentUpgradeAmounts = function (data) {
    return dataKeys.upgradeAmountKeys.reduce(function (accum, key) {
        accum.push(lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(data, key[0], key[1]));
        return accum;
    }, []);
};
var triggerInViewPort = function (_a) {
    var tierNames = _a.tierNames, currentTierIndex = _a.currentTierIndex, scenario = _a.scenario, upgradeTierIndex = _a.upgradeTierIndex, extraAmountForUpgrade = _a.extraAmountForUpgrade, points = _a.points, mrp = _a.mrp;
    return triggerEvent('INSIDER_REWARDS_IN_VIEW_PORT', {
        custom: {
            custom: {
                v1: currentTierIndex + 1 === tierNames.length
                    ? 'max_tier'
                    : scenario === SCENARIOS.UPGRADE
                        ? 'upgraded_tier'
                        : 'close_to_new_tier',
                v2: "".concat(tierNames[currentTierIndex], "_").concat(tierNames[upgradeTierIndex]),
                v3: points,
                v4: extraAmountForUpgrade
            },
            widget: {
                name: 'cart_supercoins_widget_load',
                type: 'card',
                data_set: {
                    data: [
                        {
                            entity_name: mrp
                        }
                    ]
                }
            },
            widget_items: {
                name: 'is_insider'
            },
            event_type: 'widgetLoad'
        }
    });
};
var triggerModalToggle = function (tierName, isModalShown) {
    return triggerEvent("INSIDER_REWARDS_MODAL_".concat(isModalShown ? 'CLOSE' : 'OPEN'), {
        custom: {
            custom: {
                v1: tierName
            },
            widget: {
                name: "cart_supercoins_".concat(isModalShown ? 'halfcard_close' : 'widget_view_benefits'),
                type: 'button'
            },
            event_type: 'widgetItemClick'
        }
    });
};



/***/ }),

/***/ "./browser/components/common/InsiderRewards/Util/index.js":
/*!****************************************************************!*\
  !*** ./browser/components/common/InsiderRewards/Util/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getToolTipText": () => (/* binding */ getToolTipText),
/* harmony export */   "triggerInViewPort": () => (/* binding */ triggerInViewPort),
/* harmony export */   "getInsiderCacheKey": () => (/* binding */ getInsiderCacheKey),
/* harmony export */   "getCachedInsiderData": () => (/* binding */ getCachedInsiderData),
/* harmony export */   "cacheInsiderData": () => (/* binding */ cacheInsiderData)
/* harmony export */ });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonBrowserUtils_DataStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonBrowserUtils/DataStore */ "./browser/utils/DataStore/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");




var getToolTipText = function (isInsider, insiderConfig, isSupercoinEnabled) {
    var _a = insiderConfig.toolTipTextInsider, toolTipTextInsider = _a === void 0 ? '' : _a, _b = insiderConfig.toolTipTextSuperCoin, toolTipTextSuperCoin = _b === void 0 ? '' : _b;
    if (isInsider)
        return isSupercoinEnabled ? toolTipTextSuperCoin : toolTipTextInsider;
    return '';
};
var triggerInViewPort = function (orderPointsData, mrp) {
    var _a = orderPointsData || {}, _b = _a.insiderPoints, insiderPoints = _b === void 0 ? 0 : _b, tierName = _a.tierName;
    var _c = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_1__.getKVPairValue)('CART_INSIDER_PROGRESS').tierNames, tierNames = _c === void 0 ? [] : _c;
    var tierIndex = tierNames.indexOf(tierName);
    triggerEvent('INSIDER_REWARDS_IN_VIEW_PORT', {
        custom: {
            custom: {
                v1: tierIndex + 1 === tierNames.length ? 'max_tier' : '',
                v2: "".concat(tierName, "_"),
                v3: insiderPoints,
                v4: ''
            },
            widget: {
                name: 'cart_supercoins_widget_load',
                type: 'card',
                data_set: {
                    data: [
                        {
                            entity_name: mrp
                        }
                    ]
                }
            },
            widget_items: {
                name: 'is_insider'
            },
            event_type: 'widgetLoad'
        }
    });
};
var getInsiderCacheKey = function (productEntries) {
    var data = JSON.stringify(productEntries);
    return (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_3__.getHash)(data);
};
var getCachedInsiderData = function (productEntries) {
    var payloadHash = getInsiderCacheKey(productEntries);
    var cachedInsiderData = (0,commonBrowserUtils_DataStore__WEBPACK_IMPORTED_MODULE_2__.getInsiderData)();
    return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(cachedInsiderData, payloadHash, null);
};
var cacheInsiderData = function (productEntries, data) {
    var _a;
    var payloadHash = getInsiderCacheKey(productEntries);
    (0,commonBrowserUtils_DataStore__WEBPACK_IMPORTED_MODULE_2__.setInsiderData)((_a = {}, _a[payloadHash] = data, _a));
};


/***/ }),

/***/ "./browser/components/common/InsiderRewards/index.js":
/*!***********************************************************!*\
  !*** ./browser/components/common/InsiderRewards/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "../node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! commonUtils/constants */ "./utils/constants.js");
/* harmony import */ var commonUtils_constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! commonUtils/KVPairManager */ "./utils/KVPairManager/index.js");
/* harmony import */ var commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! commonUtils/FeaturesManager */ "./utils/FeaturesManager/index.js");
/* harmony import */ var commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var commonBrowserUtils_CartManager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! commonBrowserUtils/CartManager */ "./browser/utils/CartManager.js");
/* harmony import */ var commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! commonBrowserUtils/CartHelper */ "./browser/utils/CartHelper/index.js");
/* harmony import */ var commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! commonBrowserUtils/Helper */ "./browser/utils/Helper/index.js");
/* harmony import */ var _Components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components */ "./browser/components/common/InsiderRewards/Components/index.js");
/* harmony import */ var commonComp_InsiderRewards_Util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! commonComp/InsiderRewards/Util */ "./browser/components/common/InsiderRewards/Util/index.js");
/* harmony import */ var iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! iconComp/InsiderLogoNew.jsx */ "../node_modules/@myntra/m-comp/react/SVGIcon/InsiderLogoNew.jsx");
/* harmony import */ var _insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./insiderRewards.base.css */ "./browser/components/common/InsiderRewards/insiderRewards.base.css");
/* harmony import */ var _InsiderTierProgress__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./InsiderTierProgress */ "./browser/components/common/InsiderRewards/InsiderTierProgress/index.js");
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














var methods = ['getInsiderDetails', 'getInsiderData', 'setReference'];
var InsiderRewards = /** @class */ (function (_super) {
    __extends(InsiderRewards, _super);
    function InsiderRewards(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            orderPointsData: null,
            insiderDetails: {}
        };
        methods.forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        var _isReturnAbuser = (0,commonBrowserUtils_Helper__WEBPACK_IMPORTED_MODULE_7__.isReturnAbuser)(lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.props.cartData, 'userDetails.returnAbuser'));
        _this.myntraInsiderConfig = (0,commonUtils_KVPairManager__WEBPACK_IMPORTED_MODULE_3__.getKVPairValue)('MYNTRA_INSIDER');
        _this.insiderProgressEnabled =
            !_isReturnAbuser && (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('CART_INSIDER_PROGRESS');
        _this.isAcceleratedEarningsEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('CART_INSIDER_ACCELERATED_EARNINGS');
        _this.insiderTrialsEnabled = (0,commonUtils_FeaturesManager__WEBPACK_IMPORTED_MODULE_4__.isFeatureEnabled)('CHECKOUT_INSIDER_TRIAL');
        return _this;
    }
    InsiderRewards.prototype.componentDidMount = function () {
        this.getInsiderData();
    };
    InsiderRewards.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.cartData.modifiedAt !== prevProps.cartData.modifiedAt) {
            this.getInsiderData();
        }
    };
    InsiderRewards.prototype.getInsiderPayloadData = function () {
        var selectedProducts = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props, 'selectedProducts', []);
        return {
            itemEntries: selectedProducts.map(function (product) { return ({
                styleId: product.id,
                skuId: product.skuId || '',
                amount: (0,commonBrowserUtils_CartHelper__WEBPACK_IMPORTED_MODULE_6__.getSubTotal)(product)
            }); })
        };
    };
    InsiderRewards.prototype.getInsiderData = function () {
        var productEntries = this.getInsiderPayloadData();
        var cachedData = (0,commonComp_InsiderRewards_Util__WEBPACK_IMPORTED_MODULE_9__.getCachedInsiderData)(productEntries);
        var shouldRequestInsiderDetailsData = (this.insiderTrialsEnabled || this.insiderProgressEnabled) &&
            Object.keys(this.state.insiderDetails || {}).length <= 0;
        if (cachedData) {
            this.getInsiderDetails(cachedData, true);
        }
        else {
            var promises = [
                new Promise(function (resolve, reject) {
                    return commonBrowserUtils_CartManager__WEBPACK_IMPORTED_MODULE_5__.default.getPointsForItems(productEntries, resolve, reject);
                }),
                shouldRequestInsiderDetailsData
                    ? new Promise(function (resolve, reject) {
                        return commonBrowserUtils_CartManager__WEBPACK_IMPORTED_MODULE_5__.default.getInsiderDetails(resolve, reject);
                    })
                    : Promise.resolve(this.state.insiderDetails)
            ];
            Promise.all(promises)
                .then(function (data) { return ({
                orderPointsData: data[0],
                insiderDetails: data[1]
            }); })
                .then(this.getInsiderDetails)
                .catch(function () { });
        }
    };
    InsiderRewards.prototype.getInsiderDetails = function (data, fromCache) {
        if (fromCache === void 0) { fromCache = false; }
        if (!fromCache) {
            var productEntries = this.getInsiderPayloadData();
            (0,commonComp_InsiderRewards_Util__WEBPACK_IMPORTED_MODULE_9__.cacheInsiderData)(productEntries, data);
        }
        var _a = data || {}, orderPointsData = _a.orderPointsData, insiderDetails = _a.insiderDetails;
        var _b = orderPointsData || {}, enrolmentStatus = _b.enrolmentStatus, _c = _b.totalPoints, totalPoints = _c === void 0 ? 0 : _c, isSupercoinEnabled = _b.isSupercoinEnabled, tierName = _b.tierName, supercoinsMultiplier = _b.supercoinsMultiplier;
        var isInsider = enrolmentStatus === 'ENROLLED';
        var showInsiderRewards = totalPoints > 0 && isInsider;
        this.setState({
            orderPointsData: {
                isInsider: isInsider,
                insiderPoints: totalPoints,
                showInsiderRewards: showInsiderRewards,
                isSupercoinEnabled: isSupercoinEnabled,
                tierName: tierName,
                supercoinsMultiplier: supercoinsMultiplier
            },
            insiderDetails: insiderDetails
        });
        showInsiderRewards &&
            triggerEvent('INSIDER_REWARDS_WIDGET_LOAD', {
                custom: {
                    custom: {
                        v1: isInsider
                    },
                    widget: { name: 'insider widget' },
                    widget_items: { name: totalPoints }
                }
            });
    };
    InsiderRewards.prototype.setReference = function (node) {
        var _this = this;
        if (!window.IntersectionObserver)
            return;
        var observer = new window.IntersectionObserver(function (entries, observer) {
            var entry = entries[0];
            if (entry.isIntersecting && entry.intersectionRatio === 1) {
                var mrp = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(_this.props.cartData, 'price.mrp');
                (0,commonComp_InsiderRewards_Util__WEBPACK_IMPORTED_MODULE_9__.triggerInViewPort)(_this.state.orderPointsData, mrp);
                observer.unobserve(entry.target);
            }
        }, {
            rootMargin: '0px 0px -80px 0px',
            // 80px because of sticky place order button
            threshold: 1
        });
        node && observer.observe(node);
    };
    InsiderRewards.prototype.render = function () {
        var _a = this.state, orderPointsData = _a.orderPointsData, insiderDetails = _a.insiderDetails;
        var _b = orderPointsData || {}, isInsider = _b.isInsider, isSupercoinEnabled = _b.isSupercoinEnabled, insiderPoints = _b.insiderPoints, _c = _b.showInsiderRewards, showInsiderRewards = _c === void 0 ? false : _c, tierName = _b.tierName, supercoinsMultiplier = _b.supercoinsMultiplier;
        var toolTipText = (0,commonComp_InsiderRewards_Util__WEBPACK_IMPORTED_MODULE_9__.getToolTipText)(isInsider, this.myntraInsiderConfig, isSupercoinEnabled);
        var mrp = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.props.cartData, 'price.mrp');
        var isTrialInsider = this.insiderTrialsEnabled &&
            lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(insiderDetails, 'data.tierProgressInfo.isTrialUser', false);
        var showInsiderProgress = this.insiderProgressEnabled &&
            this.props.page === commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.checkoutPage.CART &&
            !isTrialInsider;
        return (showInsiderRewards && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { "data-testid": "insiderrewards", ref: this.props.page === commonUtils_constants__WEBPACK_IMPORTED_MODULE_2__.checkoutPage.CART &&
                !this.insiderProgressEnabled
                ? this.setReference
                : // to fire events for the control bucket
                    function () { } },
            this.isAcceleratedEarningsEnabled ? (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: "".concat(_insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__.default.insiderRewardsText, " ").concat(tierName === 'Icon' ? _insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__.default.iconRewards : '') },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderRewardsTextV2, { points: insiderPoints, tooltip: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderToolTip, { isInsider: isInsider, toolTipText: toolTipText, shouldTriggerEvent: true, tierName: tierName, points: insiderPoints }), tierName: tierName, coinMultiplier: supercoinsMultiplier }),
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.EarlyAccessText, { cartData: this.props.cartData }),
                isTrialInsider && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderTrialUserProgress, { insiderDetails: insiderDetails, cartData: this.props.cartData })))) : (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__.default.borderContainer },
                react__WEBPACK_IMPORTED_MODULE_0__.default.createElement("div", { className: _insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__.default.rewardsContainer },
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(iconComp_InsiderLogoNew_jsx__WEBPACK_IMPORTED_MODULE_10__.default, { className: _insiderRewards_base_css__WEBPACK_IMPORTED_MODULE_11__.default.insiderCrown }),
                    react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderRewardsText, __assign({}, this.props, { points: insiderPoints, isSupercoinEnabled: isSupercoinEnabled, tooltip: react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderToolTip, { isInsider: isInsider, toolTipText: toolTipText }) }))),
                isTrialInsider && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_Components__WEBPACK_IMPORTED_MODULE_8__.InsiderTrialUserProgress, { insiderDetails: insiderDetails, cartData: this.props.cartData })))),
            showInsiderProgress && (react__WEBPACK_IMPORTED_MODULE_0__.default.createElement(_InsiderTierProgress__WEBPACK_IMPORTED_MODULE_12__.default, { selectedProducts: this.props.selectedProducts, insiderDetails: insiderDetails, points: insiderPoints, mrp: mrp })))));
    };
    return InsiderRewards;
}(react__WEBPACK_IMPORTED_MODULE_0__.default.PureComponent));
InsiderRewards.propTypes = {
    cartData: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().object),
    selectedProducts: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().array),
    page: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InsiderRewards);


/***/ }),

/***/ "./browser/components/resources/colors.js":
/*!************************************************!*\
  !*** ./browser/components/resources/colors.js ***!
  \************************************************/
/***/ ((module) => {

var COLORS = {
    mynt: '#03A685',
    mynt_5: '#f2faf9',
    mynt_10: '#e5f6f2',
    mynt_15: '#d9f2ed',
    mynt_20: '#0e8170',
    mynt_30: '#28d59b',
    blue: '#526CD0',
    blue_light: '#58acee',
    blue_5: '#788bd0',
    purple: '#7e007e',
    white: '#FFFFFF',
    white_alpha35: '#FFFFFF59',
    white_10: '#FFFFFF19',
    white_90: '#ffffffe6',
    blueberry_5: '#F4F4F5',
    blueberry_10: '#EAEAEC',
    blueberry_20: '#D4D5D9',
    blueberry_30: '#BFC0C6',
    blueberry_40: '#A9ABB3',
    blueberry_50: '#94969F',
    blueberry_60: '#7E818C',
    blueberry_70: '#696B79',
    blueberry_80: '#535766',
    blueberry_90: '#3E4152',
    blueberry_90_alpha35: '#3E415259',
    blueberry: '#282C3F',
    blueberry_alpha10: '#282C3F1A',
    orange: '#FFA500',
    orange_70: '#E95224',
    salmon: '#ff5722',
    salmon_50: '#FFF1EC',
    salmon_05: '#FFF6F4',
    salmon_10: '#feedec',
    salmon_20: '#f54541',
    silver_white: '#F6F2F7',
    light_salmon: '#F7F7F7',
    watermelon: '#FF3F6C',
    watermelon_10: '#E93962',
    watermelon_faded: '#FF8CA7',
    watermelon_15: '#CD305526',
    watermelon_20: '#FF3F6C33',
    watermelon_50: '#ff9fb5',
    yellow: '#ffd98e',
    yellow_10: '#F8F4EC',
    yellow_20: '#fff6e5',
    yellow_30: '#F8DFB3',
    yellow_40: '#E1C67E',
    yellow_50: '#FFB21A',
    yellow_60: '#FFAA01',
    yellow_70: '#BE9347',
    yellow_80: '#A3792E',
    yellow_light: '#fffadc',
    yellow_light_10: '#ffc800',
    golden_yellow: '#dbaa3b',
    golden_yellow_10: '#C7A358',
    golden_yellow_20: '#C99949',
    golden_yellow_30: '#DEC9A3',
    sunny_yellow: '#fee003',
    off_yellow: '#fef9e5',
    off_yellow_10: '#FFE9AE',
    dark_yellow: '#BE8413',
    black: '#000',
    black_10: '#27272f',
    black_30: '#0000004d',
    black_40: '#0E0F17',
    black_50: '#00000080',
    darkgrey: '#686b79',
    red: '#f16565',
    red_10: '#cd3055',
    dark_red: '#a40400',
    lightmintgreen: '#f4fff9',
    lightmintgreen_10: '#f0faf9',
    dark_green: '#14958f',
    gold_primary: '#A3792E',
    gold_secondary: '#E1C67E',
    gold_tertiary: '#C7A358',
    grey: '#f5f5f6',
    grey_1: '#e9e9e8',
    grey_5: '#e9e9eb',
    grey_10: '#F5F5F6',
    grey_15: '#E5E5E5',
    grey_20: '#D5D6D9',
    grey_25: '#d4d5d8',
    grey_30: '#7E808D',
    grey_40: '#f8f8f9',
    grey_50: '#93959E',
    grey_60: '#686B77',
    grey_80: '#979797',
    grey_400: '#BEBFC5',
    grey_500: '#EBEBED',
    grey_700: '#3D4152',
    green_10: '#e6f7f3',
    green_20: '#03a68518',
    green_200: '#b3e4da',
    green_600: '#17a185',
    midnight_black: '#13141E',
    midnight_black_secondary: '#1B1C25',
    amour: '#FFE9EE',
    amour_90: '#fff0f4',
    brink_pink: '#FF668A',
    light_pink: '#fde3f3',
    brown_yellow: '#d1b37e',
    golden_yellow: '#dbaa3b',
    golden_yellow_light: '#FFF3DE',
    golden_yellow_dark: '#AF8846',
    mustard_yellow: '#E99D07',
    mustard_yellow_dark: '#AD8031',
    mustard_yellow_light: '#E0C57D',
    sunny_yellow: '#fee003',
    off_yellow: '#fef9e5',
    dark_yellow: '#BE8413',
    lavender: '#fef4f7',
    transparent_80: '#141414cc',
    transparent: '#14141400',
    peach: '#ffe4da',
    orange_100: '#FFEEE8'
};
module.exports = COLORS;


/***/ })

}]);
//# sourceMappingURL=insiderRewards.js.map