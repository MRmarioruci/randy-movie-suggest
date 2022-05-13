"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var react_2 = require("@ionic/react");
var react_router_1 = require("@ionic/react-router");
var icons_1 = require("ionicons/icons");
var Suggest_1 = require("./pages/Suggest");
var Album_1 = require("./pages/Album");
var Chat_1 = require("./pages/Chat");
var Account_1 = require("./pages/Account");
var Provider_1 = require("./Provider");
/* Core CSS required for Ionic components to work properly */
require("@ionic/react/css/core.css");
/* Basic CSS for apps built with Ionic */
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
/* Optional CSS utils that can be commented out */
require("@ionic/react/css/padding.css");
require("@ionic/react/css/float-elements.css");
require("@ionic/react/css/text-alignment.css");
require("@ionic/react/css/text-transformation.css");
require("@ionic/react/css/flex-utils.css");
require("@ionic/react/css/display.css");
/* Theme variables */
require("./theme/variables.css");
require("./theme/tabs.css");
require("./theme/main.css");
var App = function () {
    return (react_1["default"].createElement(Provider_1.Provider, null,
        react_1["default"].createElement(react_2.IonApp, null,
            react_1["default"].createElement(react_router_1.IonReactRouter, null,
                react_1["default"].createElement(react_2.IonTabs, null,
                    react_1["default"].createElement(react_2.IonRouterOutlet, null,
                        react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/suggest" },
                            react_1["default"].createElement(Suggest_1["default"], null)),
                        react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/album" },
                            react_1["default"].createElement(Album_1["default"], null)),
                        react_1["default"].createElement(react_router_dom_1.Route, { path: "/chat" },
                            react_1["default"].createElement(Chat_1["default"], null)),
                        react_1["default"].createElement(react_router_dom_1.Route, { path: "/account" },
                            react_1["default"].createElement(Account_1["default"], null)),
                        react_1["default"].createElement(react_router_dom_1.Route, { exact: true, path: "/" },
                            react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/suggest" }))),
                    react_1["default"].createElement(react_2.IonTabBar, { slot: "bottom", className: "tabs" },
                        react_1["default"].createElement(react_2.IonTabButton, { tab: "suggest", href: "/suggest" },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.shuffle }),
                            react_1["default"].createElement(react_2.IonLabel, null, "Find")),
                        react_1["default"].createElement(react_2.IonTabButton, { tab: "album", href: "/album" },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.albums }),
                            react_1["default"].createElement(react_2.IonLabel, null, "My list")),
                        react_1["default"].createElement(react_2.IonTabButton, { tab: "chat", href: "/chat" },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.chatbubbles }),
                            react_1["default"].createElement(react_2.IonLabel, null, "Chat")),
                        react_1["default"].createElement(react_2.IonTabButton, { tab: "account", href: "/account" },
                            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.person }),
                            react_1["default"].createElement(react_2.IonLabel, null, "Me"))))))));
};
exports["default"] = App;
