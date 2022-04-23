import React from 'react';
import { UseAnimationStateOption } from '../type';
import { useAnimationState } from '../useAnimationState';

type Props = {
  state: 'close' | 'open';
  option?: UseAnimationStateOption;
};

const AnimationExample = ({ state, option }: Props) => {
  const { state: animationState, offAnimation, onAnimation } = useAnimationState(state, option);

  return (
    <>
      <button type="button" onClick={() => onAnimation()}>
        animationStart
      </button>
      <button type="button" onClick={() => offAnimation()}>
        animationEnd
      </button>
      <div>{animationState}</div>
    </>
  );
};

AnimationExample.defaultProps = {
  option: {},
};

export default AnimationExample;
