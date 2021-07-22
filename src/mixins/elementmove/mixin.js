const ElementControls = {
  data: () => ({
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
      el: undefined,
    },
    mirror: { x: false, y: false },
    sx: 1,
    sy: 1,
    lockEL: false,
    rotate: 0,
  }
  ),
  methods: {
    showHelp() {
      this.$refs.sizeHelper.showHelp();
    },
    hideHelp() {
      this.$refs.sizeHelper.hideHelp();
    },
    mirrorX() {
      this.mirror.x = !this.mirror.x;
      this.sx = this.mirror.x ? '-1' : '1';
      this.sy = this.mirror.y ? '-1' : '1';
    },
    mirrorY() {
      this.mirror.y = !this.mirror.y;
      this.sx = this.mirror.x ? '-1' : '1';
      this.sy = this.mirror.y ? '-1' : '1';
    },
    lockElement() {
      this.lockEL = !this.lockEL;
    },
    elementDragMove(event) {
      event.preventDefault();
      const mouseX = event.clientX * (100 / this.$store.scalework);
      const mouseY = event.clientY * (100 / this.$store.scalework);
      this.n.y = mouseY + this.positions.clientY;
      this.n.x = mouseX + this.positions.clientX;
      this.$actions.changePostion(this.n.x, this.n.y);
    },
    dragMouseDown(event, element) {
      event.preventDefault();
      if (!this.lockEL) {
        const mouseX = event.clientX * (100 / this.$store.scalework);
        const mouseY = event.clientY * (100 / this.$store.scalework);
        this.positions.clientX = this.n.x - mouseX;
        this.positions.clientY = this.n.y - mouseY;
        this.positions.element = element;
        this.$actions.changePostion(this.n.x, this.n.y);
        document.onmousemove = this.elementDragMove;
        document.onmouseup = this.closeDragElement;
      }
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchstart = null;
      document.ontouchend = null;
    },
  },
};

export default ElementControls;
