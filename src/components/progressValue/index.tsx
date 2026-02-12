// src/components/progressValue/index.tsx

import React, { useMemo, useRef } from 'react';
import { TextInput, Platform } from 'react-native';
import Animated, { useAnimatedReaction } from 'react-native-reanimated';

import COLORS from '../../utils/colors';
import type { ProgressValueProps } from '../../types';

import styles from './styles';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const ProgressValue: React.FC<ProgressValueProps> = ({
  initialValue = 0,
  radius = 60,
  activeStrokeColor = COLORS.GREEN,
  progressValueColor,
  progressValueStyle = {},
  progressValueFontSize,
  progressValue,
  animatedTextProps,
  allowFontScaling = true,
}: ProgressValueProps) => {
  const inputRef = useRef<any>(null);

  if (Platform.OS === 'web') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAnimatedReaction(
      () => progressValue.value,
      (data, prevData) => {
        if (data !== prevData && inputRef.current) {
          // สำหรับ Web ต้องเปลี่ยนค่าผ่าน DOM property โดยตรง
          inputRef.current.value = data;
        }
      }
    );
  }

  const styleProps = useMemo(
    () => ({
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    }),
    [
      radius,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
    ]
  );

  return (
    <AnimatedInput
      testID="progress-value-text"
      ref={inputRef}
      underlineColorAndroid={COLORS.TRANSPARENT}
      editable={false}
      defaultValue={String(initialValue)}
      style={[
        styles(styleProps).input,
        progressValueStyle,
        styles(styleProps).fromProps,
      ]}
      animatedProps={animatedTextProps as any}
      allowFontScaling={allowFontScaling}
    />
  );
};

export default ProgressValue;