import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375;

export const normalize = (size: number): number => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const COLORS = {
  primary: '#6C63FF',
  secondary: '#2D3436',

  success: '#27AE60',
  danger: '#FF4757',
  warning: '#FFC107',
  info: '#17A2B8',

  background: '#F8F9FB',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray: '#888888',
  lightGray: '#E0E0E0',
  border: '#EEEEEE',

  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.5)',
  cardBg: '#FFFFFF',
};

export const SIZES = {
  h1: normalize(26),
  h2: normalize(22),
  h3: normalize(18),
  body: normalize(16),
  small: normalize(14),
  extraSmall: normalize(12),

  radius: normalize(15),
  padding: normalize(20),
  margin: normalize(20),

  width,
  height,
};

export const FONTS = {
  h1: {
    fontSize: SIZES.h1,
    fontWeight: 'bold' as const,
    color: COLORS.black,
  },
  h2: {
    fontSize: SIZES.h2,
    fontWeight: 'bold' as const,
    color: COLORS.black,
  },
  body: {
    fontSize: SIZES.body,
    color: COLORS.gray,
  },
  small: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
};
