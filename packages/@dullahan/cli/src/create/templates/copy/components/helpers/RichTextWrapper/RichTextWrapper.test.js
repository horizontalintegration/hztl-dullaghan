// Lib
import { snapshot, renderComponent, eeSitecoreContext } from 'lib/jest/test-utils';
// Local
import RichTextWrapper from './RichTextWrapper';
import defaultData, { regExTest } from './RichTextWrapper.mock-data';

const NEW_TAB_TEXT = '(Opens in a new tab)';

it('renders common usage correctly', () => {
  const component = snapshot(RichTextWrapper, { componentProps: defaultData });
  // Expect that we have inserted our new tab content
  const newTabText = component.queryAllByText(NEW_TAB_TEXT);
  expect(newTabText).not.toBe(null);
});

it('handles various attributes, invalid attributes, and character types in <a> tags appropriately and nested tags in <a> tags', () => {
  snapshot(RichTextWrapper, { componentProps: regExTest });
});

it("doesn't change content in Experience Editor", () => {
  const component = renderComponent(RichTextWrapper, {
    componentProps: defaultData,
    sitecoreContext: eeSitecoreContext,
  });
  // Expect that our new tab SR text is not inserted
  const newTabText = component.queryByText(NEW_TAB_TEXT);
  expect(newTabText).toBe(null);
});

it("doesn't display with no field data", () => {
  const component = renderComponent(RichTextWrapper, {});
  expect(component.container.firstChild).toBe(null);
});
