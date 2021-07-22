<template>
    <g>
    <rect
        :id="n.id"
        :ref="recref"
        :width="n.width"
        :height="n.height"
        style="fill:#000000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        :transform="`translate(${n.x}, ${n.y}) rotate(${this.rotate})`"
    ></rect>
    <ElementControlComp ref="sizeHelper" :n="n" :setpaddingside="10" :setpaddingtop="10"/>
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementMove from '../mixins/elementmove/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Rechteck',
  components: { ElementControlComp },
  mixins: [ElementMove],
  data: () => ({
    settings: {
      value: 'Banderole',
    },
    recref: uuid.v1(),
  }
  ),
  methods: {
    showHelp() {
      this.$refs.sizeHelper.showHelp();
    },
    hideHelp() {
      this.$refs.sizeHelper.hideHelp();
    },
    getSettings(ref) {
      return [{
        id: '13337',
        name: 'Farbe',
        type: 'color',
        value: this.$refs[this.recref].style.fill,
        ref,
      }];
    },
    changeVal(name, value) {
      this.$refs[this.recref].style.fill = `rgb(${value.rgba.r},${value.rgba.g},${value.rgba.b})`;
      this.$refs[this.recref].setAttribute('fill-opacity', value.rgba.a);
    },
  },
};
</script>
