import { GroupLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
/**
 * Get ACS user token from the Contoso server.
 */
export declare const fetchTokenResponse: () => Promise<any>;
/**
 * Generate a random user name.
 * @return username in the format user####
 */
export declare const createRandomDisplayName: () => string;
/**
 * Get group id from the url's query params.
 */
export declare const getGroupIdFromUrl: () => GroupLocator | undefined;
export declare const createGroupId: () => GroupLocator;
/**
 * Get teams meeting link from the url's query params.
 */
export declare const getTeamsLinkFromUrl: () => TeamsMeetingLinkLocator | undefined;
export declare const isOnIphoneAndNotSafari: () => boolean;
export declare const isLandscape: () => boolean;
export declare const navigateToHomePage: () => void;
export declare const WEB_APP_TITLE: string;
export declare const buildTime: string;
export declare const callingSDKVersion: string;
export declare const communicationReactSDKVersion: string;
//# sourceMappingURL=AppUtils.d.ts.map