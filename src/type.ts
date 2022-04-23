export type AnimationState = 'open' | 'opening' | 'closing' | 'close';
export type AnimationDelayType = 'debounce' | 'default';
export type UseAnimationStateOption = {
  onAnimationTime?: number;
  onDelayType?: AnimationDelayType;
  onPreemption?: boolean;
  offAnimationTime?: number;
  offDelayType?: AnimationDelayType;
  offPreemption?: boolean;
};
