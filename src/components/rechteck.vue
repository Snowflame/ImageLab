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
    <ElementControlComp :n="n"/>
  </g>
</template>

<script>
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Rechteck',
  components: { ElementControlComp },
  mixins: [ElementControl],
};
</script>
