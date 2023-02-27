/*
	Confetti is a component that shows a confetti animation by drawing over a canvas.
 	Usage: Just add <Confetti /> to any component to play the confetti animation on mount.
	Props :-
		1. animState: Use this prop to switch b/w different animation states:
			 play (default), pause and stop (loop to be added later)
 		2. className: One important usecase can be to add the confetti animation as an overlay
			 over a component. This can be done by setting z-index CSS property.
 		3. getConfettoConfig: A function that is called to get initial config for each confetto.
 			 Config includes properties like position, color, velocity, etc. Check out
 			 getDefaultConfettoConfig in .utils/js for more.
 		4. confettiConfig: An object that contains config for the whole confetti animation.
 			 Stuff like number of pieces, gravity, colors, etc. can be configured here.
 		5. updateConfetto: A function that is called to re-paint or update a confetto on each
			 animation frame. The animation can be customized by passing in a function here.
			 Check out updateConfetto below for more.
		6. onAnimationEnd: A callback that is called when the confetti animation ends.
*/

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  randomRange,
  ANIM_STATES,
  defaultConfettiConfig,
  getDefaultConfettoConfig
} from './utils';

/*
	Confetto is a piece in confetti. Here, it is essentially just an object that
	contains its config.
*/
const Confetto = ({ getConfettoConfig, ...props }) => ({
  ...getDefaultConfettoConfig(props),
  ...(getConfettoConfig && getConfettoConfig(props))
});

const Confetti = props => {
  const { animState = ANIM_STATES.PLAY, className = '' } = props;

  const confettiRef = useRef([]),
    reqIdRef = useRef(null),
    canvasRef = useRef(null);

  const confettiConfig = {
    ...defaultConfettiConfig,
    ...props.confettiConfig
  };

  const populateConfetti = () => {
    const confetti = confettiRef.current,
      canvas = canvasRef.current;
    while (confetti.length < confettiConfig.totalCount) {
      confetti.push(
        Confetto({
          id: confetti.length,
          canvasH: canvas.height,
          canvasW: canvas.width,
          ...props,
          confettiConfig
        })
      );
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  const reset = () => {
    clearCanvas();
    confettiRef.current = [];
    populateConfetti();
  };

  useEffect(() => {
    setCanvasSize();
    reset();
    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  useEffect(() => {
    switch (animState) {
      case ANIM_STATES.PLAY:
        draw();
        break;
      case ANIM_STATES.STOP:
        reset();
    }
    return () =>
      reqIdRef.current && window.cancelAnimationFrame(reqIdRef.current);
  }, [animState]);

  const draw = () => {
    clearCanvas();
    if (!confettiRef.current.length) {
      props.onAnimationEnd && props.onAnimationEnd();
      return;
    }
    updateConfetti();
    reqIdRef.current = window.requestAnimationFrame(draw);
  };

  const updateConfetti = () => {
    const confetti = confettiRef.current,
      canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    confetti.forEach(confetto => {
      ctx.save();
      // save the current drawing state containing previously drawn confetti

      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);
      // translate and rotate whole canvas before painting the confetto

      props.updateConfetto
        ? props.updateConfetto({
            confetto,
            ...props,
            canvasH: canvas.height,
            canvasW: canvas.width,
            confettiConfig
          })
        : updateConfetto(confetto);

      ctx.fillStyle = confetto.color;
      const scaledHeight = confetto.dimensions.height * confetto.scale.y;
      const scaledWidth = confetto.dimensions.width * confetto.scale.x;
      ctx.fillRect(
        -scaledWidth / 2,
        -scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );

      ctx.restore();
      // restore the previously saved state
    });
    confetti.forEach(
      (confetto, i) =>
        confetto.position.y >= canvas.height && confetti.splice(i, 1)
    );
    // remove confetti that went beyond the canvas boundary
  };

  const updateConfetto = confetto => {
    const { gravity, maxVelocity, drag } = confettiConfig;

    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, maxVelocity);
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.x += randomRange(-1, 1); // just to add some randomness

    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    confetto.scale.y = Math.cos(
      (confetto.position.y + confetto.randomModifier) * 0.09
    );
    // This part is responsible to add swivel animation to each confetto.
    // randomModifier is to add some randomness and 0.09 is to slow down the animation.
  };

  return (
    <div className={className}>
      <canvas id="confetti" ref={canvasRef} />
    </div>
  );
};

Confetti.propTypes = {
  animState: PropTypes.string,
  className: PropTypes.string,
  getConfettoConfig: PropTypes.func,
  confettiConfig: PropTypes.object,
  updateConfetto: PropTypes.func,
  onAnimationEnd: PropTypes.func
};

export default Confetti;
export { ANIM_STATES };
