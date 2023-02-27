import React from 'react';
import sinon from 'sinon';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import StyleCappingModal from './index';

const styleData = [
  {
    brand: 'xyz',
    name: 'kjfd',
    skuId: 66874635,
    sizes: [
      {
        skuId: 66874635,
        label: 'M'
      }
    ],
    images: [
      {
        secureSrc: ''
      }
    ]
  }
];

describe('Style Capping Modal', () => {
  it('should render modal content', () => {
    const toggle = sinon.spy();
    window.triggerEvent = () => {};
    render(
      <StyleCappingModal mode="mobile" toggle={toggle} data={styleData} />
    );

    expect(screen.getByText('Maximum Limit Reached')).toBeInTheDocument();
    expect(screen.getByText('xyz')).toBeInTheDocument();
    expect(screen.getByText('kjfd')).toBeInTheDocument();
    expect(screen.getByText('Size : M')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    expect(toggle.calledOnce).toBe(true);
  });
});
