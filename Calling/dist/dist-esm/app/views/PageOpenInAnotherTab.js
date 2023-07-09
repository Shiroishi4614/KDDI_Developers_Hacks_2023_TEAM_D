// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Link } from '@fluentui/react';
import React from 'react';
import { NoticePage } from './NoticePage';
export const PageOpenInAnotherTab = () => {
    window.document.title = 'App already open in another tab';
    return (React.createElement(NoticePage, { title: "App is already open in another tab", moreDetails: React.createElement(React.Fragment, null,
            "On mobile browsers, Azure Communication Services only supports one active call at a time. For more information see:",
            ' ',
            React.createElement(Link, { href: "https://docs.microsoft.com/en-us/azure/communication-services/concepts/best-practices#handling-multiple-calls-on-multiple-tabs-on-mobile", target: "_blank" }, "Calling SDK Best Practices"),
            "."), icon: "\u26A0\uFE0F" }));
};
//# sourceMappingURL=PageOpenInAnotherTab.js.map