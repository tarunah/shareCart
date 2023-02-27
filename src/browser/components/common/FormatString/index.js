import React from 'react';

const HighlightedText = ({ text, className }) => (
  <span className={className}>{text}</span>
);

const FormatString = ({ messageString, highlightedText, className }) => {
  if (messageString === '{highlightedText}') {
    return <HighlightedText text={highlightedText} className={className} />;
  } else {
    return <span>{messageString}</span>;
  }
};

export default FormatString;
