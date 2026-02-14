let highestZ = 1;

class Paper {
  holding = false;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {

    const move = (x, y) => {
      if (!this.holding) return;

      const dx = x - this.prevX;
      const dy = y - this.prevY;

      this.currentX += dx;
      this.currentY += dy;

      this.prevX = x;
      this.prevY = y;

      paper.style.transform =
        `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
    };

    // Mouse Move
    document.addEventListener("mousemove", (e) => {
      move(e.clientX, e.clientY);
    });

    // Touch Move
    document.addEventListener("touchmove", (e) => {
      move(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    // Mouse Down
    paper.addEventListener("mousedown", (e) => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    // Touch Start
    paper.addEventListener("touchstart", (e) => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.prevX = e.touches[0].clientX;
      this.prevY = e.touches[0].clientY;
    });

    window.addEventListener("mouseup", () => {
      this.holding = false;
    });

    window.addEventListener("touchend", () => {
      this.holding = false;
    });
  }
}

document.querySelectorAll(".paper").forEach(paper => {
  new Paper().init(paper);
});
