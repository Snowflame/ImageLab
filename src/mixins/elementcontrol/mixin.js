const ElementControls = {
  data: () => ({
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
      el: undefined,
    },
  }
  ),
  methods: {
    toggleHelp(helper) {
      if (helper.getAttribute('display') === 'none') {
        helper.setAttribute('display', 'block');
      } else {
        helper.setAttribute('display', 'none');
      }
    },
    showHelp() {
      this.toggleHelp(this.$refs.HelperYB);
      this.toggleHelp(this.$refs.HelperYT);
      this.toggleHelp(this.$refs.HelperXL);
      this.toggleHelp(this.$refs.HelperXR);
      this.toggleHelp(this.$refs.ResizeX);
      this.toggleHelp(this.$refs.ResizeY);
    },
    dragMouseDownXR(event, id) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.element = id;
      document.onmousemove = this.elementDragXR;
      document.onmouseup = this.closeDragElement;
    },
    dragMouseDownXL(event, id) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.element = id;
      document.onmousemove = this.elementDragXL;
      document.onmouseup = this.closeDragElement;
    },
    dragMouseDownYT(event, id) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.element = id;
      document.onmousemove = this.elementDragYT;
      document.onmouseup = this.closeDragElement;
    },
    dragMouseDownYB(event, id) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.element = id;
      document.onmousemove = this.elementDragYB;
      document.onmouseup = this.closeDragElement;
    },
    dragMouseDownResize(event, id) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.element = id;
      document.onmousemove = this.elementDragResize;
      document.onmouseup = this.closeDragElement;
    },
    elementDragXR(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = ((event.clientX - offsetX) - this.n.x);
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
    },
    elementDragXL(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = (this.n.x - (event.clientX - offsetX)) + this.n.width;
      this.n.x = event.clientX - offsetX;
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
    },
    elementDragYB(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const newHeight = ((event.clientY - offsetY) - this.n.y);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
    },
    elementDragResize(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const newHeight = ((event.clientY - offsetY) - this.n.y);
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = ((event.clientX - offsetX) - this.n.x);
      if (newWidth > 0) {
        this.n.width = newWidth;
      } else {
        this.n.width = 1;
      }
    },
    elementDragYT(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const newHeight = (this.n.y - (event.clientY - offsetY)) + this.n.height;
      this.n.y = event.clientY - offsetY;
      this.n.height = newHeight;
      if (newHeight > 0) {
        this.n.height = newHeight;
      } else {
        this.n.height = 1;
      }
    },
    elementDragMove(event) {
      event.preventDefault();
      this.n.x = (event.clientX + this.positions.clientX);
      this.n.y = (event.clientY + this.positions.clientY);
    },
    dragMouseDown(event, element) {
      event.preventDefault();
      this.positions.clientX = this.n.x - event.clientX;
      this.positions.clientY = this.n.y - event.clientY;
      this.positions.element = element;
      document.onmousemove = this.elementDragMove;
      document.onmouseup = this.closeDragElement;
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};

export default ElementControls;
