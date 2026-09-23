export interface SiteLayoutProps {
  title?: string;
  description?: string;
}

export interface ArrowIconProps {
  direction?: 'up' | 'up-right' | 'down-right';
}

export type BrandIconName = 'sum' | 'parallelogram' | 'arrow' | 'diagonal-bars';

export interface BrandIconProps {
  name: BrandIconName;
  className?: string;
  width?: number;
  height?: number;
}

export interface MenuIconProps {
  expanded: boolean;
}
