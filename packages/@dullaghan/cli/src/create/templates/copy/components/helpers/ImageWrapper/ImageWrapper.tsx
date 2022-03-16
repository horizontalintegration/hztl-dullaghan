// Global
import { Image as JSSImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import NextImage from 'next/image';
// Lib
import useExperienceEditor from 'lib/sitecore/use-experience-editor';

/**
 * JSS does not yet support Next Image in Exprience Editor
 * This component will switch between the two based on environment
 * which allows us to get the various performance benefits from Next Image
 *
 * Note that the images may display slightly differently in
 * Experience Editor as the JSS Image component doesn't have the same layout options
 */

interface SizedImageField extends ImageField {
  value?: {
    alt?: string;
    height: string;
    src?: string;
    width: string;
  };
}

type NextImageLayoutOption = 'intrinsic' | 'responsive' | 'fill';

interface AnyNextImage {
  alt: string;
  height?: string;
  layout: NextImageLayoutOption;
  objectFit?: 'cover';
  priority?: boolean;
  src: string;
  width?: string;
}

interface ImageWrapperProps {
  image: SizedImageField;
  layout?: NextImageLayoutOption;
  priority?: boolean;
}

const ImageWrapper = ({
  image,
  layout = 'intrinsic',
  priority,
}: ImageWrapperProps): JSX.Element => {
  const isEE = useExperienceEditor();

  if (isEE) {
    return <JSSImage field={image} />;
  }

  // If the image has no value, return nothing
  if (!image.value || !image.value.src) {
    return <></>;
  }

  const nextImageProps: AnyNextImage = {
    src: image.value.src,
    alt: image.value.alt || '',
    layout,
    priority,
  };

  if (layout === 'fill') {
    nextImageProps.objectFit = 'cover';
  } else {
    nextImageProps.height = image.value.height;
    nextImageProps.width = image.value.width;
  }

  return <NextImage {...nextImageProps} />;
};

export default ImageWrapper;
