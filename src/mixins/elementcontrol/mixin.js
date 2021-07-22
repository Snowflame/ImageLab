const ElementControls = {
  data: () => ({
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
      el: undefined,
    },
    HelperXL: false,
    HelperYB: false,
    HelperYT: false,
    HelperXR: false,
    ResizeX: false,
    ResizeY: false,
  }
  ),
  methods: {
    showHelp() {
      this.HelperXL = true;
      this.HelperYB = true;
      this.HelperYT = true;
      this.HelperXR = true;
      this.ResizeX = true;
      this.ResizeY = true;
    },
    hideHelp() {
      this.HelperXL = false;
      this.HelperYB = false;
      this.HelperYT = false;
      this.HelperXR = false;
      this.ResizeX = false;
      this.ResizeY = false;
    },
    elementDragXR(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const mouseX = event.clientX * (100 / this.$store.scalework);
      const newWidth = ((mouseX - offsetX) - this.n.x);
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragXL(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const mouseX = event.clientX * (100 / this.$store.scalework);
      const newWidth = (this.n.x - (mouseX - offsetX)) + this.n.width;
      this.n.x = mouseX - offsetX;
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changePostion(this.n.x, this.n.y);
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragYB(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const mouseY = event.clientY * (100 / this.$store.scalework);
      const newHeight = ((mouseY - offsetY) - this.n.y);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragResize(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const mouseY = event.clientY * (100 / this.$store.scalework);
      const newHeight = ((mouseY - offsetY) - this.n.y);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      const mouseX = event.clientX * (100 / this.$store.scalework);
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = ((mouseX - offsetX) - this.n.x);
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragYT(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const mouseY = event.clientY * (100 / this.$store.scalework);
      const newHeight = (this.n.y - (mouseY - offsetY)) + this.n.height;
      this.n.y = mouseY - offsetY;
      this.n.height = newHeight;
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      this.$actions.changePostion(this.n.x, this.n.y);
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    dragMouseDownXR(event, id) {
      event.preventDefault();
      if (!this.lockEL) {
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        document.onmousemove = this.elementDragXR;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragXR;
        document.ontouchend = this.closeDragElement;
      }
    },
    dragMouseDownXL(event, id) {
      event.preventDefault();
      if (!this.lockEL) {
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        document.onmousemove = this.elementDragXL;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragXL;
        document.ontouchend = this.closeDragElement;
      }
    },
    dragMouseDownYT(event, id) {
      event.preventDefault();
      if (!this.lockEL) {
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        document.onmousemove = this.elementDragYT;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragYT;
        document.ontouchend = this.closeDragElement;
      }
    },
    dragMouseDownYB(event, id) {
      event.preventDefault();
      if (!this.lockEL) {
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        document.onmousemove = this.elementDragYB;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragYB;
        document.ontouchend = this.closeDragElement;
      }
    },
    dragMouseDownResize(event, id) {
      event.preventDefault();
      if (!this.lockEL) {
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        document.onmousemove = this.elementDragResize;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragResize;
        document.ontouchend = this.closeDragElement;
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
