<template>
    <g>
    <image
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        xlink:href="https://picsum.photos/1000/500"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        @dblclick="toggleHelp()"
    ></image>
    <ElementControlComp ref="sizeHelper" :n="n" :setpaddingside="10" :setpaddingtop="10"/>
  </g>
</template>

<script>
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Bild',
  components: { ElementControlComp },
  mixins: [ElementControl],
  methods: {
    toggleHelp() {
      this.$refs.sizeHelper.showHelp();
    },
  },
};
</script>
