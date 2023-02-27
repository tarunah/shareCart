import React, { useState, useEffect } from 'react';
import DrawSvg from 'iconComp/DrawSvg.jsx';
import Styles from './scratchSvg.css';

function ScratchSVG() {
  const [shouldDraw, draw] = useState(false);

  useEffect(() => {
    setTimeout(() => draw(true), 500);
  }, []);

  return (
    <div className={`${Styles.svgWrapper} ${shouldDraw ? Styles.active : ''}`}>
      <DrawSvg />
    </div>
  );
}

export default ScratchSVG;
