"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAnimatedValue;

var _react = require("react");
var _reactNativeReanimated = require("react-native-reanimated");
var _reactNativeRedash = require("react-native-redash");
var _useCircleValues = _interopRequireDefault(require("./useCircleValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useAnimatedValue(_ref) {
  let {
    initialValue = 0,
    radius = 60,
    maxValue = 100,
    clockwise,
    startInPausedState,
    delay = 0,
    value,
    duration,
    onAnimationComplete = () => null,
    activeStrokeWidth = 10,
    inActiveStrokeWidth = 10,
    progressFormatter = v => {
      'worklet';
      return Math.round(v);
    },
    strokeColorConfig = undefined
  } = _ref;

  const paused = (0, _reactNativeReanimated.useSharedValue)(startInPausedState);
  const animatedValue = (0, _reactNativeReanimated.useSharedValue)(initialValue);
  const { circleCircumference } = (0, _useCircleValues.default)({
    radius,
    activeStrokeWidth,
    inActiveStrokeWidth
  });

  const pause = (0, _react.useCallback)(() => {
    paused.value = true;
  }, [paused]);

  const play = (0, _react.useCallback)(() => {
    paused.value = false;
  }, [paused]);

  const resetAnimatedValue = (0, _react.useCallback)(() => {
    paused.value = false;
    animatedValue.value = initialValue;
  }, [animatedValue, initialValue, paused]);

  const animateValue = (0, _react.useCallback)(() => {
    animatedValue.value = (0, _reactNativeRedash.withPause)(
      (0, _reactNativeReanimated.withDelay)(
        delay,
        (0, _reactNativeReanimated.withTiming)(
          value,
          {
            duration,
            easing: _reactNativeReanimated.Easing.linear
          },
          isFinished => {
            if (isFinished) {
              (0, _reactNativeReanimated.runOnJS)(onAnimationComplete)();
            }
          }
        )
      ),
      paused
    );
  }, [animatedValue, delay, duration, paused, value, onAnimationComplete]);

  const reAnimate = () => {
    resetAnimatedValue();
    animateValue();
  };

  const sortedStrokeColors = (0, _react.useMemo)(() => {
    if (!strokeColorConfig) {
      return null;
    }
    return [...strokeColorConfig].sort((a, b) => a.value - b.value);
  }, [strokeColorConfig]);

  const colors = (0, _react.useMemo)(() => {
    if (!sortedStrokeColors) {
      return null;
    }
    return sortedStrokeColors.map(item => item.color);
  }, [sortedStrokeColors]);

  const values = (0, _react.useMemo)(() => {
    if (!sortedStrokeColors) {
      return null;
    }
    return sortedStrokeColors.map(item => item.value);
  }, [sortedStrokeColors]);

  const animatedCircleProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    let biggestValue = Math.max(initialValue, maxValue);
    biggestValue = biggestValue <= 0 ? 1 : biggestValue;
    const maxPercentage = clockwise ? 100 * animatedValue.value / biggestValue : 100 * -animatedValue.value / biggestValue;
    const config = {
      strokeDashoffset: circleCircumference - circleCircumference * maxPercentage / 100
    };
    const strokeColor = colors && values ? (0, _reactNativeReanimated.interpolateColor)(animatedValue.value, values, colors) : undefined;

    if (strokeColor) {
      config.stroke = strokeColor;
    }

    return config;
  }, [], props => {
    'worklet';
    if (Object.keys(props).includes('stroke')) {
      props.stroke = {
        type: 0,
        payload: (0, _reactNativeReanimated.processColor)(props.stroke)
      };
    }
  });

  (0, _react.useEffect)(() => {
    animateValue();
  }, [animateValue]);

  const progressValue = (0, _reactNativeReanimated.useDerivedValue)(() => {
    return `${progressFormatter(animatedValue.value)}`;
  });

  const animatedTextProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    return {
      text: progressValue.value
    };
  });

  return {
    animatedCircleProps,
    animatedTextProps,
    progressValue,
    pause,
    play,
    reAnimate
  };
}