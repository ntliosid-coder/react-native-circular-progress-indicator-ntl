import type React from 'react';
import type { TextInputProps, TextStyle } from 'react-native';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';
import type { CircleProps } from 'react-native-svg';

type StrokeLineCapType = 'butt' | 'round' | 'square';

type DashedStrokeConfigType = {
  count: number;
  width: number;
};

type CircleGradientProps = {
  activeStrokeColor?: string;
  activeStrokeSecondaryColor?: string | null;
};

interface DashedCircleProps {
  circleCircumference: number;
  inActiveStrokeWidth: number;
  activeStrokeWidth: number;
  inactiveCircleRadius: number;
  activeCircleRadius: number;
  dashedStrokeConfig?: DashedStrokeConfigType;
}

type StrokeColorConfigType = {
  value: number;
  color: string;
};

interface BaseProgressCircleProps extends CircleGradientProps {
  circleBackgroundColor?: string;
  radius?: number;
  strokeLinecap?: StrokeLineCapType;
  inActiveStrokeColor?: string;
  inActiveStrokeOpacity?: number;
  activeStrokeWidth?: number;
  inActiveStrokeWidth?: number;
  dashedStrokeConfig?: DashedStrokeConfigType;
  strokeColorConfig?: StrokeColorConfigType[];
}

interface ProgressCircleProps extends BaseProgressCircleProps {
  animatedCircleProps: any;
}

interface BaseCircularProgressProps extends BaseProgressCircleProps {
  value: number;
  initialValue?: number;
  duration?: number;
  delay?: number;
  maxValue?: number;
  onAnimationComplete?: () => void;
  clockwise?: boolean;
  startInPausedState?: boolean;
  rotation?: number;
}

interface CircularProgressBaseProps extends BaseCircularProgressProps {
  children?: React.ReactNode;
}

interface CircularProgressProps extends BaseCircularProgressProps {
  title?: string;
  titleStyle?: TextStyle;
  titleColor?: string;
  titleFontSize?: number;
  progressValueColor?: string;
  progressValueStyle?: TextStyle;
  progressValueFontSize?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  showProgressValue?: boolean;
  subtitle?: string;
  subtitleStyle?: TextStyle;
  subtitleColor?: string;
  subtitleFontSize?: number;
  // eslint-disable-next-line no-unused-vars
  progressFormatter?: (v: number) => number | string;
  allowFontScaling?: boolean;
  valuePrefixStyle?: TextStyle;
  valueSuffixStyle?: TextStyle;
}

type ProgressValueProps = {
  initialValue: number;
  radius?: number;
  activeStrokeColor?: string;
  progressValueColor?: string;
  progressValueStyle?: TextStyle;
  progressValueFontSize?: number;
  // ✅ ใช้ SharedValue ตรงๆ (แก้ Error TS2694)
  progressValue: SharedValue<string>;
  // ✅ ปรับเป็น any เพื่อลดความเข้มงวดในการตรวจสอบ Nested Type ของ TextInput ใน RN 0.83
  animatedTextProps: any;
  allowFontScaling?: boolean;
};

type ProgressRef = {
  play: () => void;
  pause: () => void;
  reAnimate: () => void;
};

export type {
  CircleGradientProps,
  ProgressCircleProps,
  CircularProgressBaseProps,
  CircularProgressProps,
  DashedCircleProps,
  DashedStrokeConfigType,
  ProgressValueProps,
  StrokeColorConfigType,
  ProgressRef,
};