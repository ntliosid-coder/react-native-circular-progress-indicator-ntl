jest.mock('react-native-reanimated', () => {
  const mocks = jest.requireActual('react-native-reanimated/mock');
  return {
    ...mocks,
    createAnimatedPropAdapter: (cb) => cb, 
  };
});