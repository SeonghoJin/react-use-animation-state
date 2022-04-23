import React from 'react';
import { ComponentMeta } from '@storybook/react';

import AnimationExample from './AnimationExample';

export default {
  title: 'Example/AnimationExample',
  component: AnimationExample,
} as ComponentMeta<typeof AnimationExample>;

export const DefaultAnimation = () => <AnimationExample state="open" />;

export const DefaultDelayAnimation = () => (
  <AnimationExample
    state="close"
    option={{
      onAnimationTime: 1000,
      offAnimationTime: 1000,
    }}
  />
);

export const DefaultPreeptionOnAnimation = () => (
  <AnimationExample
    state="open"
    option={{
      onAnimationTime: 1000,
      offAnimationTime: 5000,
      onPreemption: true,
    }}
  />
);

export const DefaultPreeptionOnOffAnimation = () => (
  <AnimationExample
    state="open"
    option={{
      onAnimationTime: 5000,
      offAnimationTime: 5000,
      onPreemption: true,
      offPreemption: true,
    }}
  />
);

export const DelayDebounceAnimation = () => (
  <AnimationExample
    state="open"
    option={{
      onAnimationTime: 1000,
      offAnimationTime: 1000,
      onDelayType: 'debounce',
      offDelayType: 'debounce',
    }}
  />
);

export const DebouncePreemptionAnimation = () => (
  <AnimationExample
    state="open"
    option={{
      onAnimationTime: 1000,
      offAnimationTime: 1000,
      onDelayType: 'debounce',
      offDelayType: 'debounce',
      onPreemption: true,
      offPreemption: true,
    }}
  />
);
