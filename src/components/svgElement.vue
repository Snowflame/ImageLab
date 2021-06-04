<template>
    <g>
    <rect
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        style="fill:#000"
        v-on:dblclick="showHelp"
        @mousedown="dragMouseDown($event, n)"
    ></rect>
    <rect
        :x="n.x-10" :y="n.y"
        :width="3"
        :height="n.height"
        class="resize"
        ref="HelperXL"
        @mousedown="dragMouseDownXL($event, n.id)"
    ></rect>
    <rect
        :x="n.x + n.width + 10" :y="n.y"
        :width="3"
        :height="n.height"
        ref="HelperXR"
        @mousedown="dragMouseDownXR($event, n.id)"
        class="resize"
    ></rect>
    <rect
        :x="n.x" :y="n.y - 10"
        :width="n.width"
        :height="3"
        ref="HelperYT"
        class="resize"
        @mousedown="dragMouseDownYT($event, n.id)"
    ></rect>
    <rect
        :x="n.x" :y="n.y + n.height + 10"
        :width="n.width"
        :height="3"
        ref="HelperYB"
        class="resize"
        @mousedown="dragMouseDownYB($event, n.id)"
    ></rect>
  </g>
</template>

<script>
export default {
  props: ['n'],
  name: 'svgElement',
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
</script>

<style>
  .resize {
    fill: #999;
  }
  .resize:hover {
    fill: #3d0;
    cursor: nesw-resize;
  }
</style>
