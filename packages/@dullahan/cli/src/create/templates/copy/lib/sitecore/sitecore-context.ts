// Global
import { LayoutServiceContext, RouteData } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Sitecore context value shape
 */
export interface ExtendedSitecoreContext extends LayoutServiceContext {
  itemId?: string;
  itemPath?: string;
  pageEditing?: boolean;
  route: RouteData;
}
