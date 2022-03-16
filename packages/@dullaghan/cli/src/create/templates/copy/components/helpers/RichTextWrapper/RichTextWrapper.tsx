// Global
import { RichTextProps } from '@sitecore-jss/sitecore-jss-react';
import { RichText } from '@sitecore-jss/sitecore-jss-nextjs';
// Lib
import useExperienceEditor from 'lib/sitecore/use-experience-editor';

const RichTextWrapper = ({ field, ...props }: RichTextProps): JSX.Element => {
  const isEE = useExperienceEditor();

  // Just pass as normal if in Experience Editor
  if (isEE) {
    return <RichText field={field} {...props} />;
  }

  // Bail if we don't have any field data
  if (!field || !field.value) {
    return <></>;
  }

  const SR_ONLY_SPAN = '<span class="sr-only"> (Opens in a new tab)</span>';
  const NEW_TAB_ICON =
    '<span class="svg-icon inline-flex align-middle w-em h-em ml-1"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="48" height="48" viewBox="0, 0, 48, 48"><path d="M19.617,13.401 L19.594,17.697 L10.925,17.697 L10.925,35.793 L29.021,35.793 L29.021,26.281 L33.33,26.269 L33.316,40.088 L6.629,40.088 L6.629,13.401 L19.617,13.401 z M21.914,5.912 L22.008,9.725 L34.219,10.026 L18.268,25.924 L21.031,28.688 L37.243,12.528 L37.558,25.274 L41.371,25.368 L40.902,6.385 L40.898,6.385 L40.898,6.38 L21.914,5.912 z" fill="currentColor"/></svg></span>';

  /**
   *  We are well aware the manipulating HTML as a string using regex is generally a bad idea.
   *  However, to have minimal impact on performance, we're using regex here for this very simple
   *  process of inserted a11y content into <a> tags that have target="_blank" set and that is it.
   *  Otherwise, the smallest Node-compatible parsers are 60kb gzipped, bad.
   *
   *  @TODO if we ever need to do anything more, we should at look at performing these kind of
   *  operationg server side in Sitecore OR including something like node-html-parser.
   */
  const updatedContent = field.value.replace(
    // https://regexr.com/640ij
    /((\<a[\s]+([^>]+))target="_blank"((?:(.|\n)(?!(\<\/a\>|\<\/.\>|\<\/div\>)))*.))/g,
    `$1${SR_ONLY_SPAN}${NEW_TAB_ICON}`
  );

  return <RichText field={{ value: updatedContent }} {...props} />;
};

export default RichTextWrapper;
