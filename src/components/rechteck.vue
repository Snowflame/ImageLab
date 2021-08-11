<template>
    <g
      :transform="`rotate(${this.rotate})`"
      :transform-origin="`${n.x + (n.width/2)}
      ${n.y + (n.height/2)}`">
    <rect
        :id="n.id"
        :ref="recref"
        :width="n.width"
        :height="n.height"
        :x="n.x" :y="n.y"
        style="fill:#000000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        :transform-origin="`${n.x} ${n.y}`"
        :transform="`
        scale(${this.sx}, ${this.sy})
        translate(${this.mirror.x ? `-${this.n.width}` : '0'},
        ${this.mirror.y ? `-${this.n.height}` : '0'})`"
    ></rect>
    <ElementControlComp ref="sizeHelper" :setpaddingside="10" :setpaddingtop="10"
    :rotate="rotate" :n="n" :changeTransform="changeTransformAngle"/>
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
    transformAngle: 'center',
    transformAngleStatus: true,
    angle: {
      width: 50,
      height: 200,
    },
  }
  ),
  mounted() {
    this.changeTransformAngle(true);
  },
  methods: {
    showHelp() {
      this.$refs.sizeHelper.showHelp();
    },
    hideHelp() {
      this.$refs.sizeHelper.hideHelp();
    },
    changeTransformAngle(status) {
      if (status) {
        this.transformAngle = `${this.n.x + (this.n.width / 2)} ${this.n.y + (this.n.height / 2)}`;
      } else {
        this.transformAngle = 'center';
      }
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
