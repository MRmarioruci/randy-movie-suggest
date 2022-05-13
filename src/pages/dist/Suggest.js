"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var Slider_1 = require("./parts/Slider");
require("./Suggest.css");
require("../theme/main.css");
var Provider_1 = require("../Provider");
var Suggest = function () {
    var _a = react_1.useContext(Provider_1.AppContext), state = _a.state, dispatch = _a.dispatch;
    var _b = react_1.useState(false), getting = _b[0], setGetting = _b[1];
    var _c = react_1.useState(false), showInstructions = _c[0], setInstructions = _c[1];
    var get = function () { return __awaiter(void 0, void 0, void 0, function () {
        var o, response, _a, status, data, tmp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setGetting(true);
                    o = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({}) /* Extra params will be passed */
                    };
                    return [4 /*yield*/, fetch('/get', o)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    _a = _b.sent(), status = _a.status, data = _a.data;
                    if (status === 'ok') {
                        if (data) {
                            tmp = data.results.map(function (title) {
                                return title;
                            });
                            dispatch({
                                type: Provider_1.actions.SET_MOVIE_LIST,
                                value: tmp
                            });
                            setTimeout(function () {
                                setGetting(false);
                            }, 500);
                        }
                    }
                    else {
                        setTimeout(function () {
                            setGetting(false);
                        }, 500);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        get();
        setInstructions(true);
    }, []);
    return (react_1["default"].createElement(react_2.IonPage, { className: "page__content" },
        react_1["default"].createElement(react_2.IonContent, { fullscreen: true, className: "page__content" },
            !getting && react_1["default"].createElement(Slider_1["default"], { getSlides: get }),
            getting &&
                react_1["default"].createElement("div", { className: "lds-ring" },
                    react_1["default"].createElement("div", null),
                    react_1["default"].createElement("div", null),
                    react_1["default"].createElement("div", null),
                    react_1["default"].createElement("div", null)),
            react_1["default"].createElement(react_2.IonToast, { color: 'primary', isOpen: showInstructions, onDidDismiss: function () { return setInstructions(false); }, message: "Swipe left to ignore, swipe right to add in your list.(This will only work if you have logged in to your account)", duration: 2500 }))));
};
exports["default"] = Suggest;
