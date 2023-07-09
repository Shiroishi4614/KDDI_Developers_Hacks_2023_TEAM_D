// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from 'react';
import { mergeStyles, Stack, Text } from '@fluentui/react';
/**
 * Generic page with a title and more details text for serving up a notice to the user.
 */
export const NoticePage = (props) => (React.createElement(Stack, { verticalFill: true, verticalAlign: "center", horizontalAlign: "center" },
    React.createElement(Stack, { className: mergeStyles(containerStyle), tokens: containerItemGap },
        props.icon && React.createElement(Text, { className: mergeStyles(titleStyles) }, props.icon),
        React.createElement(Text, { className: mergeStyles(titleStyles) }, props.title),
        React.createElement(Text, { className: mergeStyles(moreDetailsStyles) }, props.moreDetails))));
const containerStyle = {
    maxWidth: '22.5rem',
    margin: '1rem'
};
const containerItemGap = {
    childrenGap: '0.5rem'
};
const titleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600
};
const moreDetailsStyles = {
    fontSize: '1rem'
};
//# sourceMappingURL=NoticePage.js.map