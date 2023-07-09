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
var __rest = (this && this.__rest) || function (s, e) {
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
import { useAzureCommunicationCallAdapter, toFlatCommunicationIdentifier, } from '@azure/communication-react';
import React, { useCallback, useMemo, useRef, useEffect, useState, createContext, useContext } from 'react';
import { createAutoRefreshingCredential } from '../utils/credential';
import { WEB_APP_TITLE } from '../utils/AppUtils';
import { CallCompositeContainer } from './CallCompositeContainer';
import { VideoTile, FluentThemeProvider } from '@azure/communication-react';
import { Stack } from '@fluentui/react';
// import { stampStyleLeft, stampStyleRight, stampStyleUp, stampStyleVibration } from '../styles/Stamp.styles';
import { stampStyleUp, stampStyleVibration } from '../styles/Stamp.styles';
const FaceContext = createContext({
    faceType: 'normal',
    changeFaceType: (n) => { }
});
const ItoStampContext = createContext({
    itoStampF: false,
    changeItoStampF: (f) => { }
});
const ShiroishiStampContext = createContext({
    shiroishiStampF: false,
    changeShiroishiStampF: (f) => { }
});
const ShinoharaStampContext = createContext({
    shinoharaStampF: false,
    changeShinoharaStampF: (f) => { }
});
const MiyamuraStampContext = createContext({
    miyamuraStampF: false,
    changeMiyamuraStampF: (f) => { }
});
export const CallScreen = (props) => {
    const { token, userId } = props;
    const callIdRef = useRef();
    const pressInterval = 10;
    const [faceType, setFaceType] = useState('normal');
    const [itoStampF, setItoStampF] = useState(false);
    const [shiroishiStampF, setShiroishiStampF] = useState(false);
    const [shinoharaStampF, setShinoharaStampF] = useState(false);
    const [miyamuraStampF, setMiyamuraStampF] = useState(false);
    const changeFaceType = (s) => {
        setFaceType(s);
    };
    const changeItoStampF = (f) => {
        setItoStampF(f);
    };
    const changeShiroishiStampF = (f) => {
        setShiroishiStampF(f);
    };
    const changeShinoharaStampF = (f) => {
        setShinoharaStampF(f);
    };
    const changeMiyamuraStampF = (f) => {
        setMiyamuraStampF(f);
    };
    // Key Down
    const keyFunction = useCallback((event) => {
        switch (event.keyCode) {
            // A
            case 65:
                setTimeout(() => {
                    changeFaceType('negative');
                }, pressInterval);
                break;
            // S
            case 83:
                setTimeout(() => {
                    changeFaceType('normal');
                    console.log(faceType);
                }, pressInterval);
                break;
            // D
            case 68:
                setTimeout(() => {
                    changeFaceType('positive');
                }, pressInterval);
                break;
            // F
            case 70:
                setTimeout(() => {
                    changeItoStampF(true);
                    console.log(itoStampF);
                }, pressInterval);
                break;
            // R
            case 82:
                setTimeout(() => {
                    changeItoStampF(false);
                    console.log(itoStampF);
                }, pressInterval);
                break;
            // G
            case 71:
                setTimeout(() => {
                    changeShinoharaStampF(true);
                }, pressInterval);
                break;
            // T
            case 84:
                setTimeout(() => {
                    changeShinoharaStampF(false);
                }, pressInterval);
                break;
            // H
            case 72:
                setTimeout(() => {
                    changeShiroishiStampF(true);
                }, pressInterval);
                break;
            // Y
            case 89:
                setTimeout(() => {
                    changeShiroishiStampF(false);
                }, pressInterval);
                break;
            // J
            case 74:
                setTimeout(() => {
                    changeMiyamuraStampF(true);
                }, pressInterval);
                break;
            // U
            case 85:
                setTimeout(() => {
                    changeMiyamuraStampF(false);
                }, pressInterval);
                break;
        }
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", keyFunction, false);
        return () => {
            document.removeEventListener("keydown", keyFunction, false);
        };
    }, [keyFunction]);
    // Azure
    const subscribeAdapterEvents = useCallback((adapter) => {
        adapter.on('error', (e) => {
            // Error is already acted upon by the Call composite, but the surrounding application could
            // add top-level error handling logic here (e.g. reporting telemetry).
            console.log('Adapter error event:', e);
        });
        adapter.onStateChange((state) => {
            var _a, _b, _c;
            const pageTitle = convertPageStateToString(state);
            document.title = `${pageTitle} - ${WEB_APP_TITLE}`;
            if (((_a = state === null || state === void 0 ? void 0 : state.call) === null || _a === void 0 ? void 0 : _a.id) && callIdRef.current !== ((_b = state === null || state === void 0 ? void 0 : state.call) === null || _b === void 0 ? void 0 : _b.id)) {
                callIdRef.current = (_c = state === null || state === void 0 ? void 0 : state.call) === null || _c === void 0 ? void 0 : _c.id;
                console.log(`Call Id: ${callIdRef.current}`);
            }
        });
    }, []);
    const afterCallAdapterCreate = useCallback((adapter) => __awaiter(void 0, void 0, void 0, function* () {
        subscribeAdapterEvents(adapter);
        return adapter;
    }), [subscribeAdapterEvents]);
    const credential = useMemo(() => {
        return createAutoRefreshingCredential(toFlatCommunicationIdentifier(userId), token);
    }, [token, userId]);
    return (React.createElement(MiyamuraStampContext.Provider, { value: { miyamuraStampF, changeMiyamuraStampF } },
        React.createElement(ShiroishiStampContext.Provider, { value: { shiroishiStampF, changeShiroishiStampF } },
            React.createElement(ShinoharaStampContext.Provider, { value: { shinoharaStampF, changeShinoharaStampF } },
                React.createElement(ItoStampContext.Provider, { value: { itoStampF, changeItoStampF } },
                    React.createElement(FaceContext.Provider, { value: { faceType, changeFaceType } },
                        React.createElement(AzureCommunicationCallScreen, Object.assign({ afterCreate: afterCallAdapterCreate, credential: credential }, props))))))));
};
const AzureCommunicationCallScreen = (props) => {
    const { afterCreate, callLocator: locator, userId } = props, adapterArgs = __rest(props, ["afterCreate", "callLocator", "userId"]);
    if (!('communicationUserId' in userId)) {
        throw new Error('A MicrosoftTeamsUserIdentifier must be provided for Teams Identity Call.');
    }
    const adapter = useAzureCommunicationCallAdapter(Object.assign(Object.assign({}, adapterArgs), { userId,
        locator }), afterCreate);
    // 伊藤切り替え
    const onRenderPlaceholder_Ito = () => {
        switch (useContext(FaceContext).faceType) {
            case 'normal':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/sJ0Fm5N.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'positive':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/dpBrZGX.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'negative':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/nZsd3vM.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            default:
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/sJ0Fm5N.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
        }
    };
    // 城石切り替え
    const onRenderPlaceholder_Shiroishi = () => {
        switch (useContext(FaceContext).faceType) {
            case 'normal':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/oXyrTui.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'positive':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/V7AV0k4.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'negative':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/E4wzzid.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            default:
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/oXyrTui.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
        }
    };
    // 篠原切り替え
    const onRenderPlaceholder_Shinohara = () => {
        switch (useContext(FaceContext).faceType) {
            case 'normal':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/wNCKJJS.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'positive':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/YzbpWfN.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'negative':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/1Jk2eib.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            default:
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/wNCKJJS.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
        }
    };
    // 宮村切り替え
    const onRenderPlaceholder_Miyamura = () => {
        switch (useContext(FaceContext).faceType) {
            case 'normal':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/bY1wqNC.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'positive':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/VYO6ij3.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            case 'negative':
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/Vezm74Y.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
            default:
                return (React.createElement(Stack, null,
                    React.createElement("img", { src: "https://i.imgur.com/bY1wqNC.png", style: {
                            borderRadius: '170px',
                            width: '170px',
                            position: 'absolute',
                            margin: 'auto',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        } })));
        }
    };
    const ItoStamp = () => {
        if (useContext(ItoStampContext).itoStampF) {
            return (React.createElement("div", null,
                React.createElement("img", { src: "https://i.imgur.com/KZILTky.png", style: {
                        height: '200px', width: '200px'
                    }, className: stampStyleUp })));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    const ShinoharaStamp = () => {
        if (useContext(ShinoharaStampContext).shinoharaStampF) {
            return (React.createElement("div", null,
                React.createElement("img", { src: "https://i.imgur.com/9IaSKbt.png", style: {
                        height: '200px', width: '200px'
                    }, className: stampStyleVibration })));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    const ShiroishiStamp = () => {
        if (useContext(ShiroishiStampContext).shiroishiStampF) {
            return (React.createElement("div", null,
                React.createElement("img", { src: "https://i.imgur.com/EbOS6Fs.png", style: {
                        height: '200px', width: '200px'
                    } })));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    const MiyamuraStamp = () => {
        if (useContext(MiyamuraStampContext).miyamuraStampF) {
            return (React.createElement("div", null,
                React.createElement("img", { src: "https://i.imgur.com/KZILTky.png", style: {
                        height: '200px', width: '200px'
                    }, className: stampStyleUp })));
        }
        else {
            return (React.createElement("div", null));
        }
    };
    // const videoTileStyles = { root: { height: '300px', width: '400px', border: '1px solid #999' } };
    const videoTileStyles = { root: { height: '205px', width: '500px', border: '1px solid #999' } };
    return (React.createElement(React.Fragment, null,
        React.createElement(CallCompositeContainer, Object.assign({}, props, { adapter: adapter })),
        React.createElement(FluentThemeProvider, null,
            React.createElement("div", { style: { marginTop: '0px', display: 'flex', alignItems: 'center' } },
                React.createElement(VideoTile, { userId: "UserIdPlaceholder", styles: videoTileStyles, displayName: 'Iさん', renderElement: null, isMirrored: true, onRenderPlaceholder: onRenderPlaceholder_Ito }),
                React.createElement(ItoStamp, null)),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                React.createElement(VideoTile, { userId: "UserIdPlaceholder", styles: videoTileStyles, displayName: 'Sさん', renderElement: null, isMirrored: true, onRenderPlaceholder: onRenderPlaceholder_Shinohara }),
                React.createElement(ShinoharaStamp, null)),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                React.createElement(VideoTile, { userId: "UserIdPlaceholder", styles: videoTileStyles, displayName: 'Sさん', renderElement: null, isMirrored: true, onRenderPlaceholder: onRenderPlaceholder_Shiroishi }),
                React.createElement(ShiroishiStamp, null)),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                React.createElement(VideoTile, { userId: "UserIdPlaceholder", styles: videoTileStyles, displayName: 'Mさん', renderElement: null, isMirrored: true, onRenderPlaceholder: onRenderPlaceholder_Miyamura }),
                React.createElement(MiyamuraStamp, null)))));
};
const convertPageStateToString = (state) => {
    switch (state.page) {
        case 'accessDeniedTeamsMeeting':
            return 'error';
        case 'leftCall':
            return 'end call';
        case 'removedFromCall':
            return 'end call';
        default:
            return `${state.page}`;
    }
};
//# sourceMappingURL=CallScreen.js.map