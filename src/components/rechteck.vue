<template>
    <g>
    <rect
        :id="n.id"
        :ref="recref"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        style="fill:#000000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
    ></rect>
    <ElementControlComp ref="sizeHelper" :n="n" :setpaddingside="10" :setpaddingtop="10"/>
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Rechteck',
  components: { ElementControlComp },
  mixins: [ElementControl],
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
      this.$refs[this.recref].style.fill = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
    },
  },
};
</script>
