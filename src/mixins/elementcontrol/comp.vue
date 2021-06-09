<template>
    <g>
      <rect
          :x="n.x - parseInt(setpaddingside)" :y="n.y"
          :width="3"
          :height="n.height"
          class="resize"
          ref="HelperXL"
          @mousedown="dragMouseDownXL($event, n.id)"
      ></rect>
      <rect
          :x="n.x + n.width + parseInt(setpaddingside)" :y="n.y"
          :width="3"
          :height="n.height"
          ref="HelperXR"
          @mousedown="dragMouseDownXR($event, n.id)"
          class="resize"
      ></rect>
      <rect
          :x="n.x" :y="n.y - parseInt(setpaddingtop)"
          :width="n.width"
          :height="3"
          ref="HelperYT"
          class="resize"
          @mousedown="dragMouseDownYT($event, n.id)"
      ></rect>
      <rect
          :x="n.x" :y="n.y + n.height + parseInt(setpaddingtop)"
          :width="n.width"
          :height="3"
          ref="HelperYB"
          class="resize"
          @mousedown="dragMouseDownYB($event, n.id)"
      ></rect>
      <g
      class="resize corner"
      @mousedown="dragMouseDownResize($event, n.id)">
        <rect
            :x="n.x + n.width + parseInt(setpaddingside)" :y="n.y + n.height + 2"
            :width="3"
            :height="getHeight()"
        ></rect>
        <rect
            :x="n.x + n.width + 2"
            :y="n.y + n.height + parseInt(setpaddingtop)"
            :width="getWidth()"
            :height="3"
        ></rect>
      </g>
    </g>
</template>

<script>
import ElementControl from './mixin';

export default {
  props: ['n', 'setpaddingside', 'setpaddingtop', 'mode'],
  name: 'svgElementControl',
  mixins: [ElementControl],
  methods: {
    getWidth() {
      if (this.$props.mode === 'c') {
        return this.$props.n.width / 2 + 10;
      }
      return parseInt(this.$props.setpaddingside, 10);
    },
    getHeight() {
      if (this.$props.mode === 'c') {
        return this.$props.n.height / 2 + 10;
      }
      return parseInt(this.$props.setpaddingtop, 10);
    },
  },
};
</script>

<style>
  .resize {
    fill: #999;
  }
  .resize.corner {
    fill: #000;
  }
  .resize:hover {
    fill: #3d0;
    cursor: nesw-resize;
  }
</style>
