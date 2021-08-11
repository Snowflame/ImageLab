<template>
    <g
        :transform="`rotate(${this.rotate})`"
        :transform-origin="`${n.x + (n.width/2)} ${n.y + (n.height/2)}`">
    <ellipse
        :id="n.id"
        :ref="circleref"
        :cx="n.x + n.width / 2" :cy="n.y + n.height / 2"
        :rx="n.width"
        :ry="n.height"
        style="fill:#000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        :transform-origin="`${n.x} ${n.y}`"
        :transform="`
        scale(${this.sx}, ${this.sy})
        translate(${this.mirror.x ? `-${this.n.width}` : '0'},
        ${this.mirror.y ? `-${this.n.height}` : '0'})`"
    ></ellipse>
    <ElementControlComp
      ref="sizeHelper"
      mode="c"
      :rotate="rotate"
      :n="n" :setpaddingside="n.width / 2 + 10"
      :setpaddingtop="n.height / 2 + 10"
    />
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementMove from '../mixins/elementmove/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Kreis',
  components: { ElementControlComp },
  mixins: [ElementMove],
  data: () => ({
    circleref: uuid.v1(),
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
        value: this.$refs[this.circleref].style.fill,
        ref,
      }];
    },
    changeVal(name, value) {
      this.$refs[this.circleref].style.fill = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
    },
  },
};
</script>
