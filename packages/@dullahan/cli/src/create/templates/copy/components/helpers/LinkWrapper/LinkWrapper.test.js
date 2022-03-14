// Global
import dynamic from 'next/dynamic';
// Lib
import { snapshot, renderComponent, eeSitecoreContext } from 'lib/jest/test-utils';
// Components
import IconNewTab from 'components/helpers/SvgIcon/icons/icon--new-tab';
// Local
import LinkWrapper from './LinkWrapper';
import defaultData, {
  fieldAsLinkFieldValue,
  noContent,
  suppressIconAndText,
} from './LinkWrapper.mock-data';

// Mock SvgIcon dynamic import
jest.mock('next/dynamic');

beforeAll(() => {
  dynamic.mockImplementation(() => IconNewTab);
});

const NEW_TAB_TEXT = '(Opens in a new tab)';

it('adds new tab content appropriately', () => {
  snapshot(LinkWrapper, { componentProps: defaultData });
});

it('allows for field to be of type LinkFieldValue', () => {
  snapshot(LinkWrapper, { componentProps: fieldAsLinkFieldValue });
});

it('can suppress text and icons', () => {
  snapshot(LinkWrapper, { componentProps: suppressIconAndText });
});

it("doesn't change content in Experience Editor", () => {
  const component = renderComponent(LinkWrapper, {
    componentProps: defaultData,
    sitecoreContext: eeSitecoreContext,
  });
  // Expect new tab content to not be injected in Experience Editor
  const newTabText = component.queryByText(NEW_TAB_TEXT);
  expect(newTabText).toBe(null);
});

it("doesn't print if no content is present", () => {
  const component = renderComponent(LinkWrapper, { componentProps: noContent });
  expect(component.container.firstChild).toBe(null);
});
