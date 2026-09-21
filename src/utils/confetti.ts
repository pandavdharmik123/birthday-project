import confetti from 'canvas-confetti';

export const triggerHeartConfetti = () => {
  const count = 40;
  const defaults = {
    origin: { y: 0.75 },
    zIndex: 9999,
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.7),
    spread: 70,
    colors: ['#DE8E9D', '#C96076', '#E6C594', '#FFFDF9', '#851A3F'],
    shapes: ['circle'],
    scalar: 1.2,
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#D4AF37', '#DE8E9D', '#FBECEE'],
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.5),
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#D4AF37', '#DE8E9D', '#FBECEE'],
  });
};

export const triggerBirthdayFirework = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: ['#D4AF37', '#EED688', '#DE8E9D', '#C96076', '#FDFBF7'],
      zIndex: 9999
    });
  }, 250);
};
