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
    calcRad(degree) {
      const pi = degree / 180;
      return pi * Math.PI;
    },
    deltaMouse(origin, live) {
      const deltaX = live.x - origin.x;
      const deltaY = live.y - origin.y;
      return { x: deltaX, y: deltaY };
    },
    getMousePos(event) {
      const mouseX = event.clientX * (100 / this.$store.scalework);
      const mouseY = event.clientY * (100 / this.$store.scalework);
      return { x: mouseX, y: mouseY };
    },
    elementDragXR(event) {
      const mouse = this.getMousePos(event);
      const deltaMousePostion = this.deltaMouse(this.OriginMouse, { x: mouse.x, y: mouse.y });
      const diffLengthX = (deltaMousePostion.x * Math.cos(this.calcRad(this.rotate))
      + (deltaMousePostion.y * Math.sin(this.calcRad(this.rotate))));
      const newWidth = this.OriginWidth + diffLengthX;
      const newX = this.OriginPosition.x - ((diffLengthX / 2)
      * Math.sin(this.calcRad(this.rotate)));
      this.n.x = newX;
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragXL(event) {
      const mouse = this.getMousePos(event);
      const deltaMousePostion = this.deltaMouse(this.OriginMouse, { x: mouse.x, y: mouse.y });
      const diffLengthX = (deltaMousePostion.x * Math.cos(this.calcRad(this.rotate))
      + (deltaMousePostion.y * Math.sin(this.calcRad(this.rotate))));
      const newWidth = this.OriginWidth - (diffLengthX / 2);
      const newX = this.OriginPosition.x + (diffLengthX / 2);
      this.n.x = newX;
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changePostion(this.n.x, this.n.y);
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragYB(event) {
      const mouse = this.getMousePos(event);
      const deltaMousePostion = this.deltaMouse(this.OriginMouse, { x: mouse.x, y: mouse.y });
      const diffLengthY = (deltaMousePostion.x * Math.sin(this.calcRad(this.rotate))
      - (deltaMousePostion.y * Math.cos(this.calcRad(this.rotate))));
      const newHeight = this.OriginHeight - (diffLengthY / 2);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragResize(event) {
      const mouse = this.getMousePos(event);
      const deltaMousePostion = this.deltaMouse(this.OriginMouse, { x: mouse.x, y: mouse.y });
      const diffLengthY = (deltaMousePostion.x * Math.sin(this.calcRad(this.rotate))
      - (deltaMousePostion.y * Math.cos(this.calcRad(this.rotate))));
      const newHeight = this.OriginHeight - (diffLengthY / 2);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      const diffLengthX = (deltaMousePostion.x * Math.cos(this.calcRad(this.rotate))
      + (deltaMousePostion.y * Math.sin(this.calcRad(this.rotate))));
      const newWidth = this.OriginWidth + diffLengthX;
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
      this.$actions.changeSize(this.n.width, this.n.height);
    },
    elementDragYT(event) {
      const mouse = this.getMousePos(event);
      const deltaMousePostion = this.deltaMouse(this.OriginMouse, { x: mouse.x, y: mouse.y });
      const diffLengthY = (deltaMousePostion.x * Math.sin(this.calcRad(this.rotate))
      - (deltaMousePostion.y * Math.cos(this.calcRad(this.rotate))));
      const newHeight = this.OriginHeight + (diffLengthY / 2);
      const newY = this.OriginPosition.y - (diffLengthY / 2);
      this.n.y = newY;
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
        this.OriginWidth = this.n.width;
        this.OriginHeight = this.n.height;
        this.OriginMouse = { x: event.clientX, y: event.clientY };
        this.OriginPosition = { x: this.n.x, y: this.n.y };
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
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        this.OriginWidth = this.n.width;
        this.OriginHeight = this.n.height;
        this.OriginMouse = { x: event.clientX, y: event.clientY };
        this.OriginPosition = { x: this.n.x, y: this.n.y };
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
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        this.OriginWidth = this.n.width;
        this.OriginHeight = this.n.height;
        this.OriginMouse = { x: event.clientX, y: event.clientY };
        this.OriginPosition = { x: this.n.x, y: this.n.y };
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
        this.OriginWidth = this.n.width;
        this.OriginHeight = this.n.height;
        this.OriginMouse = { x: event.clientX, y: event.clientY };
        this.OriginPosition = { x: this.n.x, y: this.n.y };
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
        this.positions.clientX = event.clientX;
        this.positions.element = id;
        this.OriginWidth = this.n.width;
        this.OriginHeight = this.n.height;
        this.OriginMouse = { x: event.clientX, y: event.clientY };
        this.OriginPosition = { x: this.n.x, y: this.n.y };
        document.onmousemove = this.elementDragResize;
        document.onmouseup = this.closeDragElement;
        document.ontouchstart = this.elementDragResize;
        document.ontouchend = this.closeDragElement;
      }
    },
    closeDragElement() {
      this.widthOrigin = this.n.width;
      this.XOrigin = this.n.x;
      this.heightOrigin = this.n.height;
      this.YOrigin = this.n.y;
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchstart = null;
      document.ontouchend = null;
    },
  },
};

export default ElementControls;
