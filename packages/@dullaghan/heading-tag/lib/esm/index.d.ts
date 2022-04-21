import React from 'react';
export declare type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface WithHeadingLevel {
    level: HeadingLevel;
    offset?: number;
}
interface HeadingTagProps extends WithHeadingLevel {
    children: React.ReactNode | React.ReactNode[];
    [name: string]: unknown;
}
declare const HeadingTag: ({ level, offset, children, ...props }: HeadingTagProps) => JSX.Element;
export default HeadingTag;
