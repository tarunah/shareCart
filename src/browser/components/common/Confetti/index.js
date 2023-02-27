import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Styles from './confetti.css';

function Piece(x, y) {
  this.x = x;
  this.y = y;
  this.size = (Math.random() * 0.5 + 0.75) * 8;
  this.gravity = (Math.random() * 0.5 + 0.75) * 0.3;
  this.rotation = Math.PI * 2 * Math.random();
  this.rotationSpeed = Math.PI * 2 * (Math.random() - 0.5) * 0.001;
  this.color = randomColor();
}

function randomColor() {
  let colors = ['#F1872D', '#00BDBC', '#F64F72', '#AFD964', '#EFDC7E'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Confetti(props) {
  let elm = null,
    ctx = null,
    pieces = [],
    no = 100,
    lastUpdateTime = Date.now(),
    height = 480,
    width = 600,
    rId = null;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    let now = Date.now(),
      dt = now - lastUpdateTime;

    pieces.forEach((p, i) => {
      if (p.y > height) {
        pieces.splice(i, 1);
      }
      p.y += p.gravity * dt;
      p.rotation += p.rotationSpeed * dt;

      ctx.save();

      ctx.fillStyle = p.color;

      ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
      ctx.rotate(p.rotation);

      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

      ctx.restore();
    });
    lastUpdateTime = now;
    rId = requestAnimationFrame(draw);
  };

  useEffect(() => {
    let canvas = elm;
    ctx = canvas.getContext('2d');
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    while (pieces.length < no) {
      pieces.push(new Piece(Math.random() * width, Math.random() * height));
    }
    draw();

    // clear animation on unmount
    return () => {
      rId && cancelAnimationFrame(rId);
    };
  }, []);

  useEffect(() => {
    if (!props.showConfetti) {
      cancelAnimationFrame(rId);
    }
  }, [props.showConfetti]);

  return (
    <div className={`${Styles.confettiWrapper} ${props.className || ''}`}>
      <canvas ref={c => (elm = c)}></canvas>
    </div>
  );
}
export default Confetti;
