import React from 'react';

import Input from '../Input';
import Style from './input.stories.css';

export default {
  title: 'CommonComp/Input',
  component: Input
};

const Template = args => <Input {...args} />;

const tagConfig = {
  showTag: false,
  containerClassName: Style.tagContainer,
  text: 'Text',
  textClassName: Style.textContainer
};

export const CorrectInput = Template.bind({});
CorrectInput.args = {
  storybookConfig: {
    componentName: 'Input'
  },
  label: 'Name*',
  id: 'name',
  type: 'text',
  onChange: () => {},
  tagConfig,
  value: '',
  errorMessage: ''
};
