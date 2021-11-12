# @dullahan/mock-placeholder

Mock Sitecore placeholder content in Storybook, Jest or any other non-JSS React environment.

## TODOS:

- Figure out the config thing here

## Configuration

You can set a custom component for the mocked content in the `dullahan.config` file

**dullahan.config**

```js
import MyComponent from './path/to/compoent';


{
  mockPlaceholderContent: MyComponent,
}
```
