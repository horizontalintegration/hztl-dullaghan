import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const useExperienceEditor = () => {
  const context = useSitecoreContext();
  return context?.sitecoreContext.pageEditing ? context.sitecoreContext.pageEditing : false;
};

export default useExperienceEditor;
