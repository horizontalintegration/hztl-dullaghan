// Global
import React from 'react';
import { render } from '@testing-library/react';
// Local
import HeadingTag from '../lib/index';

const checkHeading = (props, expectedTag) => {
  const component = render(<HeadingTag {...props}>Foo</HeadingTag>);
  expect(component.container.firstChild.tagName).toBe(expectedTag);
};

describe('@dullaghan/heading-tag', () => {
  it('prints the correct heading with just a level', () => {
    checkHeading({ level: 2 }, 'H2');
  });

  it('prints the correct heading with an offset', () => {
    checkHeading({ level: 2, offset: 3 }, 'H5');
  });

  it('ignores a negative offset', () => {
    checkHeading({ level: 2, offset: -1 }, 'H2');
  });

  it('prints p if we exceed available tags', () => {
    checkHeading({ level: 4, offset: 3 }, 'P');
  });
});
