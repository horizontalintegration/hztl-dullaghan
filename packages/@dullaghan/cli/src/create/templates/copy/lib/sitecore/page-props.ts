import type {
  ComponentPropsCollection,
  DictionaryPhrases,
  LayoutServiceContextData,
  LayoutServiceData,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Extend the LayoutServiceData shape to include itemPath.
 */
export interface ExtendedLayoutServiceData extends LayoutServiceData {
  sitecore: LayoutServiceContextData & {
    route: RouteData;
    itemPath?: string;
  };
}

/**
 * Sitecore page props
 */
export interface SitecorePageProps {
  componentProps: ComponentPropsCollection;
  dictionary: DictionaryPhrases;
  layoutData: ExtendedLayoutServiceData;
  locale: string;
  notFound: boolean;
}
