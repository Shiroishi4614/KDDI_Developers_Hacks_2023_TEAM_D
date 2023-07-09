/// <reference types="react" />
import { CallAdapterLocator } from '@azure/communication-react';
export interface HomeScreenProps {
    startCallHandler(callDetails: {
        displayName: string;
        callLocator?: CallAdapterLocator;
    }): void;
    joiningExistingCall: boolean;
}
export declare const HomeScreen: (props: HomeScreenProps) => JSX.Element;
//# sourceMappingURL=HomeScreen.d.ts.map