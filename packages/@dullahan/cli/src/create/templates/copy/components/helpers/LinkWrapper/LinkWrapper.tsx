// Global
import type { LinkProps } from '@sitecore-jss/sitecore-jss-react';
import { Link, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
// Lib
import isExperienceEditor from 'lib/sitecore/is-experience-editor';
// Components
import SvgIcon from 'components/helpers/SvgIcon/SvgIcon';

/**
 * This component adds some needed accessibility
 * updates to the JSS Link component
 */

interface LinkWrapperProps extends LinkProps {
  srOnlyText?: string;
  suppressLinkText?: boolean;
  suppressNewTabIcon?: boolean;
}

const INTERNAL_LINK_REGEX = /^\/|^\#/g;

const LinkWrapper = ({
  children,
  field,
  srOnlyText,
  suppressLinkText,
  suppressNewTabIcon,
  ...props
}: LinkWrapperProps): JSX.Element => {
  // Format field as LinkField for consistency
  const asLinkField = !field.value ? { value: { ...field } } : (field as LinkField);
  const text = suppressLinkText ? '' : asLinkField?.value?.text;
  const target = asLinkField?.value?.target;

  const isEE = isExperienceEditor();

  // In experience editor, do not pass any children but retain basic styling
  // so that double components do not appear when using <Link>
  if (isEE) {
    return (
      <Link
        field={asLinkField}
        {...props}
        showLinkTextWithChildrenPresent={false}
        internalLinkMatcher={INTERNAL_LINK_REGEX}
      />
    );
  }

  // If no content is present, don't print
  if (!suppressLinkText && !asLinkField.value.text && !asLinkField.value.href) {
    return <></>;
  }

  return (
    <Link
      field={asLinkField}
      {...props}
      showLinkTextWithChildrenPresent={false}
      internalLinkMatcher={INTERNAL_LINK_REGEX}
    >
      {text}
      {children}
      {(target === '_blank' || srOnlyText) && (
        <>
          <span className="sr-only">
            {srOnlyText && srOnlyText}
            {/* Preserve a single space character before SR Tab Text */}
            {target === '_blank' && ' (Opens in a new tab)'}
          </span>
          {!suppressNewTabIcon && target === '_blank' && (
            <SvgIcon icon="new-tab" size="md" className="ml-2" />
          )}
        </>
      )}
    </Link>
  );
};

export default LinkWrapper;
