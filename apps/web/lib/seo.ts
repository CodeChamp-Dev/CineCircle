export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export function buildTitle(suffix: string) {
  return suffix ? `${suffix} | CineCircle` : 'CineCircle';
}
