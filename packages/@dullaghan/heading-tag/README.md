# `@dullaghan/heading-tag`

A simple component for handling `h1` -> `h6` dynamically.

## Usage

The idea behind this heading is to abstract the general heading level for a component so it can be used in any context. To populate this level, you could have your component accept a prop that can be overidden by some parent context.

```jsx
import HeadingTag from '@dullaghan/heading-tag';

const MyComponent = ({ headingLevel = 2 }) => (
  <div>
    <HeadingTag level={headingLevel}>My heading</HeadingTag>
    ...
  </div>
);
```

You can also abstract sub-headings within the same component by using the `offset` prop.

```jsx
import HeadingTag from '@dullaghan/heading-tag';

const MyComponent = ({ headingLevel = 2 }) => (
  <div>
    <HeadingTag level={headingLevel}>My main heading</HeadingTag>
    ...
    <HeadingTag level={headingLevel} offset={1}>
      My sub-heading
    </HeadingTag>
  </div>
);
```
