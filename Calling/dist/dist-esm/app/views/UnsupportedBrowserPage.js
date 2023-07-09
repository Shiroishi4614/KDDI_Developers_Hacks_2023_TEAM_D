// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Link } from '@fluentui/react';
import React from 'react';
import { NoticePage } from './NoticePage';
export const UnsupportedBrowserPage = () => {
    window.document.title = 'Unsupported browser';
    return (React.createElement(NoticePage, { title: "Unsupported Browser", moreDetails: React.createElement(React.Fragment, null,
            React.createElement(Link, { href: "https://docs.microsoft.com/azure/communication-services/concepts/voice-video-calling/calling-sdk-features#calling-client-library-browser-support", target: "_blank" }, "Learn more"),
            ' ',
            "about browsers and platforms supported by the web calling sdk."), icon: "\u26A0\uFE0F" }));
};
//# sourceMappingURL=UnsupportedBrowserPage.js.map