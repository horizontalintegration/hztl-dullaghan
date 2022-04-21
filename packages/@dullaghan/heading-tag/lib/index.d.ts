import React from 'react';

declare type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface WithHeadingLevel {
    level: HeadingLevel;
    offset?: number;
}
interface HeadingTagProps extends WithHeadingLevel {
    children: React.ReactNode | React.ReactNode[];
    [name: string]: unknown;
}
declare const HeadingTag: ({ level, offset, children, ...props }: HeadingTagProps) => JSX.Element;

export { HeadingLevel, WithHeadingLevel, HeadingTag as default };
