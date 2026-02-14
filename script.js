let highestZ = 1;
let activePaper = null;

document.addEventListener("mousemove", move);
document.addEventListener("touchmove", move, { passive: false });

window.addEventListener("mouseup", stopDrag);
window.addEventListener("touchend", stopDrag);

function move(e) {
  if (!activePaper) return;

  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  const dx = x - activePaper.prevX;
  const dy = y - activePaper.prevY;

  activePaper.currentX += dx;
  activePaper.currentY += dy;

  activePaper.prevX = x;
  activePaper.prevY = y;

  activePaper.el.style.transform =
    `translate(${activePaper.currentX}px, ${activePaper.currentY}px) rotate(${activePaper.rotation}deg)`;
}

function stopDrag() {
  activePaper = null;
}

class Paper {
  constructor(el) {
    this.el = el;
    this.prevX = 0;
    this.prevY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = Math.random() * 30 - 15;

    this.el.style.transform = `rotate(${this.rotation}deg)`;

    this.init();
  }

  init() {
    this.el.addEventListener("mousedown", (e) => {
      activePaper = this;
      this.el.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    this.el.addEventListener("touchstart", (e) => {
      activePaper = this;
      this.el.style.zIndex = highestZ++;
      this.prevX = e.touches[0].clientX;
      this.prevY = e.touches[0].clientY;
    });
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper(paper);
});
