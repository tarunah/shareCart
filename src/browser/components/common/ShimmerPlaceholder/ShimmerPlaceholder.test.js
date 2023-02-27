import React from 'react';
import ShimmerPlaceholder from '.';

import { render, screen } from '@testing-library/react';

describe('ShimmerPlaceholder common Comp tested with RTL', () => {
  it('should render shimmer for mobile', () => {
    render(<ShimmerPlaceholder />);
    expect(screen.getByTestId('shimmer-mobile'));
    expect(screen.getByTestId('shimmer-addressCard'));
    expect(screen.getByTestId('shimmer-btnCard'));
    expect(screen.getByTestId('shimmer-giftCard'));
    expect(screen.getAllByTestId('shimmer-infoCard'));
    expect(screen.getByTestId('shimmer-priceContainer'));
    expect(screen.getAllByTestId('shimmer-productCard'));
  });

  it('should render shimmer for desktop', () => {
    render(<ShimmerPlaceholder mode="desktop" />);
    expect(screen.getByTestId('shimmer-desktop'));
    expect(screen.getByTestId('shimmer-addressCard'));
    expect(screen.getByTestId('shimmer-btnCard'));
    expect(screen.getByTestId('shimmer-giftCard'));
    expect(screen.getAllByTestId('shimmer-infoCard'));
    expect(screen.getByTestId('shimmer-priceContainer'));
    expect(screen.getAllByTestId('shimmer-productCard'));
  });

  it('should render shimmer for payment mobile', () => {
    render(<ShimmerPlaceholder type="payment" mode="mobile" />);
    expect(screen.getByTestId('shimmer-mobile'));
    expect(screen.getByTestId('shimmer-priceContainer'));
    expect(screen.getAllByTestId('shimmer-twoLinesWithRadio'));
  });
});
