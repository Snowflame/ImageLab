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
        @dblclick="toggleHelp()"
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
    toggleHelp() {
      this.$refs.sizeHelper.showHelp();
    },
    getSettings(ref) {
      return [{
        id: '13337',
        name: 'Farbe',
        type: 'color',
        value: '',
        ref,
      }];
    },
    changeVal(name, value) {
      this.$refs[this.recref].style.fill = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
    },
  },
};
</script>
