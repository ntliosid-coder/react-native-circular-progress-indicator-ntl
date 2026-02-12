import type React from 'react';
import type { TextInputProps, TextStyle } from 'react-native';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';
import type { CircleProps } from 'react-native-svg';

declare type StrokeLineCapType = 'butt' | 'round' | 'square';

declare type DashedStrokeConfigType = {
    count: number;
    width: number;
};

declare type CircleGradientProps = {
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

declare type StrokeColorConfigType = {
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
    animatedCircleProps: AnimatedProps<CircleProps>;
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
    progressFormatter?: (v: number) => number | string;
    allowFontScaling?: boolean;
    valuePrefixStyle?: TextStyle;
    valueSuffixStyle?: TextStyle;
}

declare type ProgressValueProps = {
    initialValue: number;
    radius?: number;
    activeStrokeColor?: string;
    progressValueColor?: string;
    progressValueStyle?: TextStyle;
    progressValueFontSize?: number;
    // ✅ แก้ไข: ใช้ SharedValue ตรงๆ ไม่ผ่าน Animated namespace
    progressValue: SharedValue<string>;
    // ✅ แก้ไข: ใช้ AnimatedProps
    animatedTextProps: AnimatedProps<TextInputProps>;
    allowFontScaling?: boolean;
};

declare type ProgressRef = {
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