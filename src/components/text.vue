<template>
    <g>
      <text
        :x="n.x"
        :y="n.y"
        :id="n.id"
        :width="n.width"
        :height="n.height"
        :ref="n.id"
        @mousedown="dragMouseDown($event, n)">
        Lorem Ipsum
      </text>
  </g>
</template>

<script>
import ElementControl from '../mixins/elementcontrol/mixin';

export default {
  props: ['n'],
  name: 'Text',
  mixins: [ElementControl],
};
</script>
