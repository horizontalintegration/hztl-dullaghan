import React from 'react';

interface HeadingTagProps {
  children: React.ReactNode | React.ReactNode[];
  level: 1 | 2 | 3 | 4 | 5 | 6;
  offset?: number;
  [name: string]: unknown;
}

const HeadingTag = ({ level, offset = 0, children, ...props }: HeadingTagProps): JSX.Element => {
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
