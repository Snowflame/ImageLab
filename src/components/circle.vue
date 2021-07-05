<template>
    <g>
    <ellipse
        :id="n.id"
        :ref="circleref"
        :cx="n.x + n.width / 2" :cy="n.y + n.height / 2"
        :rx="n.width"
        :ry="n.height"
        style="fill:#000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
    ></ellipse>
    <ElementControlComp
      ref="sizeHelper"
      mode="c"
      :n="n" :setpaddingside="n.width / 2 + 10"
      :setpaddingtop="n.height / 2 + 10"
    />
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Kreis',
  components: { ElementControlComp },
  mixins: [ElementControl],
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
