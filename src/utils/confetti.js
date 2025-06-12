import confetti from "canvas-confetti";

// export function launchConfetti() {
//   confetti({
//     particleCount: 250,
//     spread: 70,
//     origin: { y: 0.1 },
//   });
// }

var end = Date.now() + 5 * 1000;
var colors = ["#a418eae2", "#4ef578e2"];

export function launchConfetti() {
  confetti({
    particleCount: 250,
    angle: 60,
    spread: 100,
    origin: { x: 0 },
    colors: colors,
  });
  confetti({
    particleCount: 250,
    angle: 120,
    spread: 100,
    origin: { x: 1 },
    colors: colors,
  });
  //   confetti({
  //     particleCount: 250,
  //     angle: 270,
  //     spread: 100,
  //     origin: { y: 0 },
  //     colors: colors,
  //   });

  if (Date.now() < end) {
    requestAnimationFrame(launchConfetti);
  }
}
