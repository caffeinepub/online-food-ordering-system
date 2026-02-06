import { useState, useEffect } from 'react';
import { FALLBACK_IMAGES } from '../../utils/imageFallbacks';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onError?: () => void;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className = '',
  onError,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Reset state when src prop changes (e.g., navigating between restaurants)
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Use the provided fallback or default to dish fallback
      // The caller should provide appropriate fallback (restaurant or dish)
      const fallback = fallbackSrc || FALLBACK_IMAGES.dish;
      setImgSrc(fallback);
      onError?.();
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}
