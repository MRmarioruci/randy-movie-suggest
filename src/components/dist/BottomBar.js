"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var icons_1 = require("ionicons/icons");
require("../theme/main.css");
var Provider_1 = require("../Provider");
var BottomBar = function () {
    alert('gere');
    var _a = react_1.useContext(Provider_1.AppContext), state = _a.state, dispatch = _a.dispatch;
    console.log(state);
    console.log('asdf');
    react_1.useEffect(function () {
        console.log('here');
        /* dispatch({
            type: actions.SET_TOOLBAR,
            value: true
        }) */
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_2.IonTabButton, { tab: "suggest", href: "/suggest" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.shuffle }),
            react_1["default"].createElement(react_2.IonLabel, null, "Find")),
        react_1["default"].createElement(react_2.IonTabButton, { tab: "album", href: "/album" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.albums }),
            react_1["default"].createElement(react_2.IonLabel, null, "My list")),
        react_1["default"].createElement(react_2.IonTabButton, { tab: "chat", href: "/chat" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.add }),
            react_1["default"].createElement(react_2.IonLabel, null, "Chat")),
        react_1["default"].createElement(react_2.IonTabButton, { tab: "account", href: "/account" },
            react_1["default"].createElement(react_2.IonIcon, { icon: icons_1.person }),
            react_1["default"].createElement(react_2.IonLabel, null, "Me"))));
};
exports["default"] = BottomBar;
