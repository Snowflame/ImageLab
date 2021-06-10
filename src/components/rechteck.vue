<template>
    <g>
    <rect
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        style="fill:#000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        @dblclick="toggleHelp()"
    ></rect>
    <ElementControlComp ref="sizeHelper" :n="n" :setpaddingside="10" :setpaddingtop="10"/>
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
  methods: {
    toggleHelp() {
      this.$refs.sizeHelper.showHelp();
    },
  },
};
</script>
