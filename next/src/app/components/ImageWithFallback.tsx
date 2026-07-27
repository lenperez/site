import { useState } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  return (
    <img
      src={error ? (fallback || "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80") : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}
