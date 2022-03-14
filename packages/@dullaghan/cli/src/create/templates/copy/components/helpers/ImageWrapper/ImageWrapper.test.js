// Lib
import { snapshot, renderComponent, eeSitecoreContext } from 'lib/jest/test-utils';
// Local
import ImageWrapper from './ImageWrapper';
import defaultData, { layoutFill, noContent } from './ImageWrapper.mock-data';

it('renders default content', () => {
  snapshot(ImageWrapper, { componentProps: defaultData });
});

it('renders layout: fill without sizes', () => {
  snapshot(ImageWrapper, { componentProps: layoutFill });
});

it('uses JSS image in Experience Editor', () => {
  snapshot(ImageWrapper, { componentProps: defaultData, sitecoreContext: eeSitecoreContext });
});

it("doesn't print if no content is present", () => {
  const component = renderComponent(ImageWrapper, { componentProps: noContent });
  expect(component.container.firstChild).toBe(null);
});
