<template>
    <g v-if="$store.showResize && showHelpElements"
      >
      <rect
          :x="n.x - parseInt(setpaddingside)" :y="n.y"
          :width="3 + Math.ceil(5-$store.scalework/100)"
          :height="n.height"
          class="resize"
          ref="HelperXL"
          v-if="HelperXL"
          @mousedown="dragMouseDownXL($event, n.id)"
      ></rect>
      <rect
          :x="n.x + n.width + parseInt(setpaddingside)" :y="n.y"
          :width="3 + Math.ceil(5-$store.scalework/100)"
          :height="n.height"
          ref="HelperXR"
          v-if="HelperXR"
          @mousedown="dragMouseDownXR($event, n.id)"
          class="resize"
      ></rect>
      <rect
          :x="n.x" :y="n.y - parseInt(setpaddingtop)"
          :width="n.width"
          :height="3 + Math.ceil(5-$store.scalework/100)"
          ref="HelperYT"
          class="resize"
          v-if="HelperYT"
          @mousedown="dragMouseDownYT($event, n.id)"
      ></rect>
      <rect
          :x="n.x" :y="n.y + n.height + parseInt(setpaddingtop)"
          :width="n.width"
          :height="3 + Math.ceil(5-$store.scalework/100)"
          ref="HelperYB"
          class="resize"
          v-if="HelperYB"
          @mousedown="dragMouseDownYB($event, n.id)"
      ></rect>
      <g
      class="resize corner"
      @mousedown="dragMouseDownResize($event, n.id)">
        <rect
            :x="n.x + n.width + parseInt(setpaddingside)"
            :y="n.y + n.height + 2"
            :width="3 + Math.ceil(5-$store.scalework/100)"
            ref="ResizeY"
            v-if="ResizeY"
            :height="getHeight() + Math.ceil(5-$store.scalework/100)"
        ></rect>
        <rect
            :x="n.x + n.width + 2"
            :y="n.y + n.height + parseInt(setpaddingtop)"
            :width="getWidth() + Math.ceil(5-$store.scalework/100)"
            :height="3 + Math.ceil(5-$store.scalework/100)"
            ref="ResizeX"
            v-if="ResizeX"
        ></rect>
      </g>
    </g>
</template>

<script>
import ElementControl from './mixin';

export default {
  props: {
    n: {
      type: Object,
    },
    setpaddingside: {
      type: Number,
    },
    setpaddingtop: {
      type: Number,
    },
    mode: {
    },
    lockEL: {
      type: Boolean,
    },
    showHelpElements: {
      default: true,
    },
  },
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
