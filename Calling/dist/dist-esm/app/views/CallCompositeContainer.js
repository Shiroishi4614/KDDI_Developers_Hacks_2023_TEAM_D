// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CallComposite } from '@azure/communication-react';
import { Spinner } from '@fluentui/react';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
import { useIsMobile } from '../utils/useIsMobile';
import React, { useEffect } from 'react';
export const CallCompositeContainer = (props) => {
    const { adapter } = props;
    const { currentTheme, currentRtl } = useSwitchableFluentTheme();
    const isMobileSession = useIsMobile();
    // Dispose of the adapter in the window's before unload event.
    // This ensures the service knows the user intentionally left the call if the user
    // closed the browser tab during an active call.
    useEffect(() => {
        const disposeAdapter = () => adapter === null || adapter === void 0 ? void 0 : adapter.dispose();
        window.addEventListener('beforeunload', disposeAdapter);
        return () => window.removeEventListener('beforeunload', disposeAdapter);
    }, [adapter]);
    if (!adapter) {
        return React.createElement(Spinner, { label: 'Creating adapter', ariaLive: "assertive", labelPosition: "top" });
    }
    const callInvitationUrl = window.location.href;
    return (React.createElement(CallComposite, { adapter: adapter, fluentTheme: currentTheme.theme, rtl: currentRtl, callInvitationUrl: callInvitationUrl, formFactor: isMobileSession ? 'mobile' : 'desktop' }));
};
//# sourceMappingURL=CallCompositeContainer.js.map