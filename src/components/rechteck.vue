<template>
    <g
        :transform="`rotate(${this.rotate})`"
        :transform-origin="`${n.x + (n.width/2)} ${n.y + (n.height/2)}`">
    <rect
        :id="n.id"
        :ref="recref"
        :width="n.width"
        :height="n.height"
        :x="n.x" :y="n.y"
        style="fill:#000000"
        :transform-origin="`${n.x} ${n.y}`"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        :transform="`
        scale(${this.sx}, ${this.sy})
        translate(${this.mirror.x ? `-${this.n.width}` : '0'},
        ${this.mirror.y ? `-${this.n.height}` : '0'})`"
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
