// Global
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { PlaceholderComponentProps } from '@sitecore-jss/sitecore-jss-react/types/components/Placeholder';
// Lib
import useExperienceEditor from 'lib/sitecore/use-experience-editor';

/**
 * Adds a visual area for authors to click when placeholder is empty
 * in Experience Editor
 */

const PlaceholderWrapper = ({ name, ...props }: PlaceholderComponentProps): JSX.Element => {
  const isEE = useExperienceEditor();

  if (isEE) {
    return (
      <div>
        <div className="mx-auto">{name}</div>
        <Placeholder name={name} {...props} />
        <div className="mx-auto">{name}</div>
      </div>
    );
  }

  return <Placeholder name={name} {...props} />;
};

export default PlaceholderWrapper;
