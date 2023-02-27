import COLORS from 'commonResources/colors';

const randomRange = (min, max) => Math.random() * (max - min) + min;

const randomColor = colors => colors[Math.floor(randomRange(0, colors.length))];

/*
	Different states that the Confetti can be in. This can be configured using animState prop.
*/

const ANIM_STATES = {
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop'
};

/*
	Default function that is called to get config for each confetto. This can be replaced
	by passing in getConfettoConfig prop. Note how each property can be randomized
	and customized for each confetto.
	Helpful Tip: checkout how each property is used and updated in Confetti for more.
*/
const getDefaultConfettoConfig = ({
  id,
  canvasH,
  canvasW,
  confettiConfig
}) => ({
  id: id,
  color: randomColor(confettiConfig.colors),
  position: {
    x: canvasW / 2,
    y: canvasH / 2
  },
  // Position is where the confetto shows up at first.
  dimensions: {
    width: randomRange(3, 6),
    height: randomRange(6, 12)
  },
  rotation: randomRange(0, 2 * Math.PI),
  /*
		Confetto is just a rectangle. Rotation defines how tilted this rectangle is initially.
    This can even be changed dynamically with each animation frame by passing in a custom
    updateConfetto prop.
	*/
  scale: {
    x: 1,
    y: 1
  },
  // Scale is used to add swivel to each confetto in the confetti animation.
  velocity: {
    x: randomRange(-9, 9),
    y: randomRange(-6, -11)
  },
  randomModifier: randomRange(0, 99)
  /* 
		Used to add some randomness to swivel animation of each confetto. Check out how this is 
		used in updateConfetto for more.
	*/
});

/*
	Default config for confetti animation. This can be replaced by passing in confettiConfig prop.
	Helpful Tip: checkout how each property is used and updated in Confetti for more.
*/
const defaultConfettiConfig = {
  totalCount: 30,
  // number of pieces (confetto) that show up
  gravity: 0.35,
  // downward acceleration, used to update y-velocity of each confetto
  drag: 0.067,
  // air drag, used to update x-velocity of each confetto
  maxVelocity: 1.8,
  // max y-velocity for each confetto
  colors: [COLORS.watermelon, COLORS.blue, COLORS.yellow_50]
};

export {
  randomRange,
  ANIM_STATES,
  defaultConfettiConfig,
  getDefaultConfettoConfig,
  randomColor
};
