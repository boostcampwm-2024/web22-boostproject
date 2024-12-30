import { TypographyToken, ColorToken } from '@type/style';

export const colorMap = {
  gray: {
    100: '#DFE2EA',
    200: '#DDDDDD',
    300: '#C9CEDC',
    500: '#9DA5B6',
    700: '#697183',
    900: '#2E3033',
    black: '#141517',
    white: '#FFFFFF'
  },
  purple: {
    100: '#E4E3FA',
    500: '#4E41DB'
  },
  red: '#E02020',
  brand: '#01F89F'
};

export const tokenColors: Record<ColorToken, string> = {
  'surface-default': colorMap.gray.black,
  'surface-alt': colorMap.gray[900],
  'text-weak': colorMap.gray[700],
  'text-default': colorMap.gray[500],
  'text-bold': colorMap.gray[300],
  'text-strong': colorMap.gray[100],
  'color-white': colorMap.gray.white,
  'brand-default': colorMap.brand,
  'purple-default': colorMap.purple[500],
  'purple-alt': colorMap.purple[100],
  'border-default': colorMap.gray[200],
  'red-default': colorMap.red
};

export const typographyMap = {
  fontWeights: {
    bold: 700,
    medium: 400
  },
  lineHeights: {
    default: 1.5
  }
};

export const tokenTypographys: Record<TypographyToken, string> = {
  'display-bold48': `font-size: 48px; font-weight: ${typographyMap.fontWeights.bold}; line-height: ${typographyMap.lineHeights.default};`,
  'display-bold24': `font-size: 24px; font-weight: ${typographyMap.fontWeights.bold}; line-height: ${typographyMap.lineHeights.default};`,
  'display-bold20': `font-size: 20px; font-weight: ${typographyMap.fontWeights.bold};  line-height: ${typographyMap.lineHeights.default};`,
  'display-bold16': `font-size: 16px; font-weight: ${typographyMap.fontWeights.bold}; line-height: ${typographyMap.lineHeights.default};`,
  'display-bold14': `font-size: 14px; font-weight: ${typographyMap.fontWeights.bold}; line-height: ${typographyMap.lineHeights.default};`,
  'display-bold12': `font-size: 12px; font-weight: ${typographyMap.fontWeights.bold};  line-height: ${typographyMap.lineHeights.default};`,
  'display-medium16': `font-size: 16px; font-weight: ${typographyMap.fontWeights.medium}; line-height: ${typographyMap.lineHeights.default};`,
  'display-medium14': `font-size: 14px; font-weight: ${typographyMap.fontWeights.medium}; line-height: ${typographyMap.lineHeights.default};`,
  'display-medium12': `font-size: 12px; font-weight: ${typographyMap.fontWeights.medium}; line-height: ${typographyMap.lineHeights.default};`
};

export const theme = {
  colorMap,
  tokenColors,
  tokenTypographys
};
