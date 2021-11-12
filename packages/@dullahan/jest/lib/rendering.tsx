// Interfaces
import type { DullahanJest } from '../jest';
// Global
import { render, RenderResult } from '@testing-library/react';
import { ComponentPropsContext, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// Local
import { createComponentFactory } from '@dullahan/mock-placeholder';

export const renderComponent = (
  Component: () => JSX.Element,
  {
    componentProps = {},
    staticProps = {},
    componentFactory = createComponentFactory(),
    sitecoreContext = {
      route: {
        name: 'Foo',
        placeholders: {},
      },
    },
  }: DullahanJest.RenderingDataOptions,
  excludeContext = false
): RenderResult => {
  if (excludeContext) {
    return render(<Component {...componentProps} />);
  }

  return render(
    <ComponentPropsContext value={staticProps}>
      <SitecoreContext componentFactory={componentFactory} context={sitecoreContext}>
        <Component {...componentProps} />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};
export const snapshot = (
  Component: () => JSX.Element,
  mockData: DullahanJest.RenderingDataOptions
): RenderResult => {
  const component = renderComponent(Component, mockData);
  expect(component.container.firstChild).toMatchSnapshot();
  return component;
};

export const hasDataComponent = (component: RenderResult, name: string): void => {
  const nodes = component.baseElement.querySelectorAll(`[data-component="${name}"]`);
  expect(nodes.length).toBe(1);
};
