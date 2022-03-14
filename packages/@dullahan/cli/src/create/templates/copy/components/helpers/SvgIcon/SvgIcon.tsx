// Global
import dynamic from 'next/dynamic';
import classnames from 'classnames';

/**
 * Standardize SVG icons on a 48x48 grid to allow
 * for consistent use across the project
 *
 * Icon contents should be stored in the icons subdirectory
 * using the naming scheme 'icon--[name].tsx'
 */

type SvgIconSize = 'sm' | 'md' | 'em';

interface SvgIconProps {
  className?: string;
  icon: 'new-tab';
  size?: SvgIconSize;
}

const sizeClasses: Record<SvgIconSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16',
  em: 'h-em w-em',
};

const SvgIcon = ({ icon, size = 'em', className }: SvgIconProps): JSX.Element => {
  const IconContent = dynamic(() => import(`./icons/icon--${icon}`));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={classnames(sizeClasses[size], className)}
    >
      <IconContent />
    </svg>
  );
};

export default SvgIcon;
