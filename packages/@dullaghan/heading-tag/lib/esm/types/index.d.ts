import React from 'react';
interface HeadingTagProps {
    children: React.ReactNode | React.ReactNode[];
    level: 1 | 2 | 3 | 4 | 5 | 6;
    offset?: number;
    [name: string]: unknown;
}
declare const HeadingTag: ({ level, offset, children, ...props }: HeadingTagProps) => JSX.Element;
export default HeadingTag;
