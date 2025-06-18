export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  text: string;
  background: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  subtitle: string;
  buttonBorder: string;
  facebookButton: string;
  googleButton: string;
  emailButton: string;
  phoneButton: string;
  border: string;
}

export interface Colors {
  light: ThemeColors;
  dark: ThemeColors;
}
