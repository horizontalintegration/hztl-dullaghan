import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ExtendedSitecoreContext } from './sitecore-context';

const useExperienceEditor = () => {
  const context = useSitecoreContext<ExtendedSitecoreContext>();
  return context?.sitecoreContext.pageEditing ? context.sitecoreContext.pageEditing : false;
};

export default useExperienceEditor;
