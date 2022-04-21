import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface WithHeadingLevel {
  level: HeadingLevel;
  offset?: number;
}

interface HeadingTagProps extends WithHeadingLevel {
  children: React.ReactNode | React.ReactNode[];
  [name: string]: unknown;
}

const HeadingTag = ({ level, offset = 0, children, ...props }: HeadingTagProps) => {
  let i = level;

  if (!!offset && offset > 0) {
    i += Math.floor(offset);
  }

  if (i > 6) {
    return <p {...props}>{children}</p>;
  }

  const Tag = `h${i}` as keyof JSX.IntrinsicElements;

  return <Tag {...props}>{children}</Tag>;
};

export default HeadingTag;
