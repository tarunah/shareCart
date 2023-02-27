import React from 'react';
import { useArgs } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import PillView from '.';

export default {
  title: 'CommonComp/PillView',
  component: PillView,
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    mode: {
      options: ['mobile', 'desktop'],
      control: { type: 'select' }
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<PillView
  pillValues = {[
    'item 1',
    'item 2',
    'item 3',
    'item 4',
    'item 5'
  ]}
  selectedValue = 'item 1'
  renderOther = {() => 'Other'}
  otherSelected = {false}
  className = {''}
  pillClassName = ''
  prefix = ''
  mode = 'mobile'
  onPillClick = {null}
  valueTransformation = {null}
/>;`
      }
    }
  }
};

const commonArgs = {
  selectedValue: 'item 1',
  otherSelected: false,
  pillValues: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
  className: '',
  pillClassName: '',
  prefix: ''
};

const Template = args => {
  const [{}, updateArgs] = useArgs();
  const onPillClick = e => {
    const value = e.currentTarget.dataset.key;
    updateArgs({ selectedValue: value });
  };

  return (
    <PillView {...args} renderOther={() => 'Other'} onPillClick={onPillClick} />
  );
};

export const PillViewDesktop = Template.bind({});

PillViewDesktop.args = {
  ...commonArgs,
  mode: 'desktop'
};

export const PillViewMobile = Template.bind({});

PillViewMobile.args = {
  ...commonArgs,
  mode: 'mobile'
};

PillViewMobile.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone12'
  }
};
