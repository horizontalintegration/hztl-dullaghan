import type { ComponentFactory } from '@sitecore-jss/sitecore-jss-react';

export namespace DullahanJest {
  export type RenderingDataOptions = {
    componentProps?: Record<string, any>;
    staticProps?: Record<string, Record<string, any>>;
    componentFactory: ComponentFactory;
    sitecoreContext: {
      route: {
        name: string;
        placeholders: Record<string, any>;
      };
    };
  };
}
