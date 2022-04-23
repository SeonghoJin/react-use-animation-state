type AnimationState = 'open' | 'opening' | 'closing' | 'close';
type AnimationDelayType = 'debounce' | 'default';
type UseAnimationStateOption = {
  onAnimationTime?: number;
  onDelayType?: AnimationDelayType;
  onPreemption?: boolean;
  offAnimationTime?: number;
  offDelayType?: AnimationDelayType;
  offPreemption?: boolean;
};
export const useAnimationState: (
  defaultState: 'open' | 'close',
  option?: UseAnimationStateOption | undefined,
) => {
  state: AnimationState;
  onAnimation: () => void;
  offAnimation: () => void;
};

// # sourceMappingURL=index.d.ts.map
