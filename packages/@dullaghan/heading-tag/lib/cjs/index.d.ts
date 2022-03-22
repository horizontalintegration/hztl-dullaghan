import React from 'react';
export declare type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingTagProps {
    children: React.ReactNode | React.ReactNode[];
    level: HeadingLevel;
    offset?: number;
    [name: string]: unknown;
}
declare const HeadingTag: ({ level, offset, children, ...props }: HeadingTagProps) => JSX.Element;
export default HeadingTag;
