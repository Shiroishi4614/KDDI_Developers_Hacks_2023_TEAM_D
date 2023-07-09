// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { setLogLevel } from '@azure/logger';
import { initializeIcons, Spinner } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import { buildTime, callingSDKVersion, communicationReactSDKVersion, createGroupId, fetchTokenResponse, getGroupIdFromUrl, getTeamsLinkFromUrl, isLandscape, isOnIphoneAndNotSafari, navigateToHomePage, WEB_APP_TITLE } from './utils/AppUtils';
import { useIsMobile } from './utils/useIsMobile';
import { useSecondaryInstanceCheck } from './utils/useSecondaryInstanceCheck';
import { CallError } from './views/CallError';
import { CallScreen } from './views/CallScreen';
import { HomeScreen } from './views/HomeScreen';
import { PageOpenInAnotherTab } from './views/PageOpenInAnotherTab';
import { UnsupportedBrowserPage } from './views/UnsupportedBrowserPage';
setLogLevel('warning');
console.log(`ACS sample calling app. Last Updated ${buildTime} Using @azure/communication-calling:${callingSDKVersion} and @azure/communication-react:${communicationReactSDKVersion}`);
initializeIcons();
const App = () => {
    const [page, setPage] = useState('home');
    // User credentials to join a call with - these are retrieved from the server
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [userCredentialFetchError, setUserCredentialFetchError] = useState(false);
    // Call details to join a call - these are collected from the user on the home screen
    const [callLocator, setCallLocator] = useState(createGroupId());
    const [displayName, setDisplayName] = useState('');
    // Get Azure Communications Service token from the server
    useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { token, user } = yield fetchTokenResponse();
                setToken(token);
                setUserId(user);
            }
            catch (e) {
                console.error(e);
                setUserCredentialFetchError(true);
            }
        }))();
    }, []);
    const isMobileSession = useIsMobile();
    const isLandscapeSession = isLandscape();
    const isAppAlreadyRunningInAnotherTab = useSecondaryInstanceCheck();
    useEffect(() => {
        if (isMobileSession && isLandscapeSession) {
            console.log('ACS Calling sample: Mobile landscape view is experimental behavior');
        }
    }, [isMobileSession, isLandscapeSession]);
    if (isMobileSession && isAppAlreadyRunningInAnotherTab) {
        return React.createElement(PageOpenInAnotherTab, null);
    }
    const supportedBrowser = !isOnIphoneAndNotSafari();
    if (!supportedBrowser) {
        return React.createElement(UnsupportedBrowserPage, null);
    }
    switch (page) {
        case 'home': {
            document.title = `home - ${WEB_APP_TITLE}`;
            // Show a simplified join home screen if joining an existing call
            const joiningExistingCall = !!getGroupIdFromUrl() || !!getTeamsLinkFromUrl();
            return (React.createElement(HomeScreen, { joiningExistingCall: joiningExistingCall, startCallHandler: (callDetails) => __awaiter(void 0, void 0, void 0, function* () {
                    setDisplayName(callDetails.displayName);
                    const callLocatorUrl = callDetails.callLocator || getTeamsLinkFromUrl() || getGroupIdFromUrl() || createGroupId();
                    setCallLocator(callLocatorUrl);
                    // Update window URL to have a joinable link
                    if (!joiningExistingCall) {
                        window.history.pushState({}, document.title, window.location.origin + getJoinParams(callLocatorUrl));
                    }
                    setPage('call');
                }) }));
        }
        case 'call': {
            if (userCredentialFetchError) {
                document.title = `error - ${WEB_APP_TITLE}`;
                return (React.createElement(CallError, { title: "Error getting user credentials from server", reason: "Ensure the sample server is running.", rejoinHandler: () => setPage('call'), homeHandler: navigateToHomePage }));
            }
            if (!token || !userId || !displayName || !callLocator) {
                document.title = `credentials - ${WEB_APP_TITLE}`;
                return React.createElement(Spinner, { label: 'Getting user credentials from server', ariaLive: "assertive", labelPosition: "top" });
            }
            return (React.createElement(React.StrictMode, null,
                React.createElement(CallScreen, { token: token, userId: userId, displayName: displayName, callLocator: callLocator })));
        }
        default:
            document.title = `error - ${WEB_APP_TITLE}`;
            return React.createElement(React.Fragment, null, "Invalid page");
    }
};
const getJoinParams = (locator) => {
    if ('meetingLink' in locator) {
        return '?teamsLink=' + encodeURIComponent(locator.meetingLink);
    }
    return '?groupId=' + encodeURIComponent(locator.groupId);
};
export default App;
//# sourceMappingURL=App.js.map