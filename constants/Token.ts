export type ColorKey =
  | 'uiLightPrimary'
  | 'uiLightStain'
  | 'uiLightNeutral'
  | 'uiLightSecondary'
  | 'uiDarkPrimary'
  | 'uiDarkStain'
  | 'uiDarkNeutral'
  | 'uiDarkSecondary'
  | 'uiBluePrimary'
  | 'uiBlueSecondary'
  | 'uiBlueDark'
  | 'uiBlueLight'
  | 'uiOrangePrimary'
  | 'uiOrangeSecondary'
  | 'uiOrangeDark'
  | 'uiOrangeLight'
  | 'uiGreenPrimary'
  | 'uiGreenSecondary'
  | 'uiGreenDark'
  | 'uiGreenLight'
  | 'uiRedPrimary'
  | 'uiRedSecondary'
  | 'uiRedDark'
  | 'uiRedLight'
  | 'uiYellowPrimary'
  | 'uiYellowSecondary'
  | 'uiYellowDark'
  | 'uiYellowLight'
  | 'brandGodwitBlue'
  | 'brandHighAltitude'
  | 'brandGoodNight'
  | 'brandSpeedLine'
  | 'brandCoralReef'
  | 'brandSignalPulse'
  | 'brandBusinessSuit'
  | 'brandFieldTrip'
  | 'brandRipeCarrot'
  | 'brandFuelTank'
  | 'brandTerminalLounge'
  | 'brandFuchsiaFusion'
  | 'overlay';

export type TokenColor = { [key in ColorKey]: string };

const color: TokenColor = {
  uiLightPrimary: '#FFFFFF',
  uiLightStain: '#F7F9FA',
  uiLightNeutral: '#F2F3F3',
  uiLightSecondary: '#CDD0D1',

  uiDarkPrimary: '#03121A',
  uiDarkStain: '#1C2930',
  uiDarkNeutral: '#354148',
  uiDarkSecondary: '#687176',

  uiBluePrimary: '#0194f3',
  uiBlueSecondary: '#007CE8',
  uiBlueDark: '#0264C8',
  uiBlueLight: '#ECF8FF',

  uiOrangePrimary: '#FF5E1F',
  uiOrangeSecondary: '#DF440F',
  uiOrangeDark: '#BF1D00',
  uiOrangeLight: '#FFF4EF',

  uiGreenPrimary: '#0BC175',
  uiGreenSecondary: '#05A569',
  uiGreenDark: '#00875A',
  uiGreenLight: '#E8FEF5',

  uiRedPrimary: '#F4555A',
  uiRedSecondary: '#EC3A3E',
  uiRedDark: '#E7090E',
  uiRedLight: '#FCE3E4',

  uiYellowPrimary: '#FFDC00',
  uiYellowSecondary: '#D99800',
  uiYellowDark: '#B15400',
  uiYellowLight: '#FFFAD9',

  brandGodwitBlue: '#1BA0E2',
  brandHighAltitude: '#30C5F7',
  brandGoodNight: '#235D9F',
  brandSpeedLine: '#FCA000',
  brandCoralReef: '#FF6D6A',
  brandSignalPulse: '#F0298A',
  brandBusinessSuit: '#073E68',
  brandFieldTrip: '#20BF55',
  brandRipeCarrot: '#F86F09',
  brandFuelTank: '#087E8B',
  brandTerminalLounge: '#6DD3CE',
  brandFuchsiaFusion: '#931682',

  get overlay() {
    return this.uiDarkPrimary;
  },
};

const spacing = {
  xxs: 4,
  xs: 8,
  s: 12,
  m: 16,
  ml: 20,
  l: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
  xxxxl: 56,
} as const;

const fontSize = {
  gigantic: 48,
  huge: 32,
  big: 24,
  large: 20,
  medium: 16,
  small: 14,
  tiny: 12,
  micro: 11,
} as const;

const fontWeight = {
  bold: '700',
  semiBold: '600',
  medium: '500',
  regular: '400',
} as const;

export default {
  color,
  spacing,
  fontSize,
  fontWeight,
}