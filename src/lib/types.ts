export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export interface CTAItem {
  label: string;
  href: string;
  variant?: ButtonVariant;
  withArrow?: boolean;
}

export type ChannelPhase = '1' | '2';

export interface Channel {
  title: string;
  body: string;
  phase: ChannelPhase;
}

export interface FeatureProps {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  linkLabel: string;
  linkHref: string;
  imageLabel?: string;
}

export type CalloutVariant = 'dark' | 'light-tint';

export type StoryCategory = 'Recipe' | 'Origin story' | 'Cooking tip';
