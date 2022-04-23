import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AnimationExample from './AnimationExample';

export default {
  title: 'Example/AnimationExample',
  component: AnimationExample,
} as ComponentMeta<typeof AnimationExample>;

const Template: ComponentStory<typeof AnimationExample> = (args) => {
  return <AnimationExample />;
};

export const Basic = Template.bind({});
Basic.args = {};
