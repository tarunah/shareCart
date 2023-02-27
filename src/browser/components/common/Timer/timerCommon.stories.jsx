import React, { useEffect } from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import TimerComponent from '.';

export default {
  title: 'CommonComp/Timer',
  component: TimerComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    }
  },
  decorators: [
    Story => (
      <div style={{ margin: '4em' }}>
        <Story />
      </div>
    )
  ]
};

var key = 0;

const Template = args => {
  useEffect(() => {
    console.log('useEffect called');
    key ^= 1;
  }, [args.seconds, args.minutes, args.hours, args.disabled]);

  return <TimerComponent key={key} {...args} />;
};

export const Timer = Template.bind({});
Timer.args = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  disabled: false,
  expanded: false,
  units: true
};

Timer.parameters = {
  docs: {
    source: {
      code: `<Timer 
  seconds = {0}
  minutes = {0}
  hours = {0}
  disabled = {false}
  expanded = {false}
  units = {true}
  stopCallback = {null}
/>;`
    }
  }
};
