import React, { useState, useEffect, Fragment, useRef } from 'react';
import Loader from 'commonComp/Loader';
import LoaderStyles from './loader.css';
import Styles from './scratchCard.css';
import ScratchSVG from '../ScratchSVG';
import ScratchResponseCard from './Components/ScratchResponseCard';
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { CARD_STATES } = scratchCardRetentionConfig;

const HEIGHT = 300;
const WIDTH = 300;

function ScratchCard(props) {
  const {
    scratchImage,
    onScratched,
    isCouponPage,
    status,
    isCouponEmpty,
    isLoading,
    isAlreadyScratched,
    cardRef,
    hideInfo,
    isError
  } = props;

  const [isScratched, setScratched] = useState(false);
  const [borderColor, setBorder] = useState(null);
  const [shouldAnimate, setAnimate] = useState(false);
  const [showSVG, drawSVG] = useState(false);

  const SCRATCHED = status === CARD_STATES.SCRATCHED;
  const SCRATCHED_EXPIRED = status === CARD_STATES.SCRATCHED_EXPIRED;
  const USED = status === CARD_STATES.USED;
  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  const canvasRef = useRef(null);

  const getRandomBorder = () => {
    if (USED) return Styles.border4;
    if (SCRATCHED_EXPIRED) return Styles.border5;
    if (isCouponEmpty) return Styles.border6;
    const borders = [Styles.border1, Styles.border2, Styles.border3];
    const n = borders.length;
    return borders[parseInt(Math.random() * 10) % n];
  };

  const scratchedMinimum = (stride = 1) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let scratchedPixels = 0;
    if (!context) return;
    const imageData = context.getImageData(0, 0, WIDTH, HEIGHT);
    const pixels = imageData.data;
    const pixelLength = pixels.length;
    let count = 0;

    // Iterate over the `pixels` data buffer
    for (let i = 0; i < pixelLength; i += stride) {
      // rgba +3 is alpha
      if (parseInt(pixels[i], 10) === 0) {
        count++;
      }
    }
    scratchedPixels = Math.ceil((count / (pixelLength / stride)) * 100);
    return scratchedPixels >= 20;
  };

  const getCursorPosition = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
      cursorX: evt.clientX - rect.left,
      cursorY: evt.clientY - rect.top
    };
  };
  const scratchStart = e => {
    hideInfo(true);
    const { cursorX, cursorY } = getCursorPosition(canvasRef.current, e);
    isDrawing = true;
    startX = cursorX;
    startY = cursorY;
  };

  const scratch = e => {
    const context = canvasRef.current && canvasRef.current.getContext('2d');
    if (!context) return;
    const { cursorX, cursorY } = getCursorPosition(
      canvasRef.current,
      (e.touches && e.touches[0]) || e
    );
    if (!isDrawing) {
      return;
    }

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(cursorX, cursorY);
    context.closePath();
    context.stroke();

    startX = cursorX;
    startY = cursorY;

    if (scratchedMinimum()) {
      setScratched(true);
      onScratched();
    }
  };

  const scratchEnd = e => {
    isDrawing = false;
  };
  useEffect(() => {
    if (isAlreadyScratched) setScratched(true);
  }, [isAlreadyScratched]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.addEventListener('mousedown', scratchStart);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', scratchEnd);
    canvas.addEventListener('touchstart', scratchStart);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', scratchEnd);

    if (scratchImage) {
      const background = new Image();
      background.crossOrigin = 'anonymous';
      background.src = scratchImage;
      background.onload = function() {
        context.drawImage(background, 0, 0, WIDTH, HEIGHT);
      };
    }
    context.lineWidth = 60;
    context.lineJoin = 'round';
    if (isCouponPage || SCRATCHED || USED || SCRATCHED_EXPIRED)
      setScratched(true);
    setBorder(getRandomBorder());

    setAnimate(true);

    setTimeout(() => {
      drawSVG(true);
      setTimeout(() => drawSVG(false), 2500);
    }, 3200);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${Styles.scratchWrapper}
        ${isScratched ? (isCouponEmpty ? Styles.border6 : borderColor) : {}}
        ${shouldAnimate ? Styles.animateScratchCard : ''}
        ${!isLoading && !isError && !isCouponEmpty ? Styles.addAnimations : ''}
        ${
          isScratched && !isLoading && !isError && !isCouponEmpty
            ? Styles.spinCard
            : ''
        }
      }`}
    >
      {isLoading ? (
        <Loader
          className={LoaderStyles.loaderContainer}
          containerClassName={LoaderStyles.spinnerContainer}
          show={true}
        />
      ) : (
        <Fragment>
          <div className={` ${Styles.svgElm}`}>
            {!isAlreadyScratched && showSVG ? <ScratchSVG /> : ''}
          </div>
          {!isScratched ? (
            <canvas
              ref={canvasRef}
              id={Styles.canvas}
              width={WIDTH}
              height={HEIGHT}
            />
          ) : null}
          {isScratched ? <ScratchResponseCard {...props} /> : null}
        </Fragment>
      )}
    </div>
  );
}

export default ScratchCard;
