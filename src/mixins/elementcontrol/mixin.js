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
    elementDragXR(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = ((event.clientX - offsetX) - this.n.x);
      this.n.width = newWidth;
    },
    elementDragXL(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const newWidth = (this.n.x - (event.clientX - offsetX)) + this.n.width;
      this.n.x = event.clientX - offsetX;
      this.n.width = newWidth;
    },
    elementDragYB(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const newHeight = ((event.clientY - offsetY) - this.n.y);
      this.n.height = newHeight;
    },
    elementDragYT(event) {
      event.preventDefault();
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetY = elemRect.top - bodyRect.top;
      const newHeight = (this.n.y - (event.clientY - offsetY)) + this.n.height;
      this.n.y = event.clientY - offsetY;
      this.n.height = newHeight;
    },
    elementDragMove(event) {
      event.preventDefault();
      const { width, height } = this.positions.element;
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.n.svg.getBoundingClientRect();
      const offsetX = elemRect.left - bodyRect.left;
      const offsetY = elemRect.top - bodyRect.top;
      this.n.x = event.clientX - (width / 2) - offsetX;
      this.n.y = event.clientY - (height / 2) - offsetY;
    },
    dragMouseDown(event, element) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
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
