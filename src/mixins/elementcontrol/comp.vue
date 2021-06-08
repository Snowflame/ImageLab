<template>
    <g>
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
import ElementControl from './mixin';

export default {
  props: ['n'],
  name: 'svgElementControl',
  mixins: [ElementControl],
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
