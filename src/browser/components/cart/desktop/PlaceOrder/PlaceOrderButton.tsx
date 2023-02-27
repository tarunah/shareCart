import React from 'react';
import Button from 'vision/components/Button';

const PlaceOrderButton = ({ onClick, text = ''}) => {
  return (
    <Button
      variant="contained"
      width="100%"
      letterSpacing="1px"
      onClick={onClick}
    >
      {text.toUpperCase()}
    </Button>
  );
}

export default PlaceOrderButton;