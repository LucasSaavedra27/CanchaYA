/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#007AFF';
const tintColorDark = '#0A84FF';

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    subtitle: '#666666',
    buttonBorder: '#E5E5E5',
    facebookButton: '#1877F2',
    googleButton: '#FFFFFF',
    emailButton: '#007AFF',
    phoneButton: '#FFFFFF',
    border: '#E0E0E0',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    subtitle: '#A0A0A0',
    buttonBorder: '#333333',
    facebookButton: '#1877F2',
    googleButton: '#242424',
    emailButton: '#0A84FF',
    phoneButton: '#242424',
    border: '#333333',
  },
};
