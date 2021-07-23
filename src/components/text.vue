<template>
    <g
        :transform="`rotate(${this.rotate})`"
        :transform-origin="`${n.x + (n.width/2)} ${n.y}`">
      <text
        :x="n.x"
        :y="n.y"
        :id="n.id"
        :width="n.width"
        :height="n.height"
        :ref="textref"
        :transform-origin="`${n.x} ${n.y}`"
        :transform="`
        scale(${this.sx}, ${this.sy})
        translate(${this.mirror.x ? `-${this.n.width}` : '0'},
        ${this.mirror.y ? `${this.n.height/2}` : '0'})`"
        style="font-size: 20px; font-family: 'Fira Sans'"
        @mousedown="dragMouseDown($event, n)">
        {{settings.text}}
      </text>
      <ElementControlComp
      ref="sizeHelper"
      :n="n"
      :setpaddingside="20"
      :setpaddingtop="20"
      :showHelpElements="false"/>
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementMove from '../mixins/elementmove/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'TextElement',
  components: { ElementControlComp },
  mixins: [ElementMove],
  mounted() {
    this.n.width = this.$refs[this.textref].getBBox().width;
    this.n.height = this.$refs[this.textref].getBBox().height;
  },
  data: () => ({
    textref: uuid.v1(),
    settings: {
      text: 'Beispieltext',
      fontsize: 20,
      fontfamily: 'Fira Sans',
    },
  }
  ),
  methods: {
    getSettings(ref) {
      return [{
        id: '13337',
        name: 'Text',
        type: 'text',
        value: this.settings.text,
        ref,
      }, {
        id: '13340',
        name: 'Schrift',
        type: 'option',
        options: [
          { value: 'Fira Sans', text: 'Fira Sans' },
          { value: 'Prompt', text: 'Prompt' },
        ],
        value: this.fontfamily,
        ref,
      }, {
        id: '13339',
        name: 'Größe',
        type: 'number',
        value: this.fontsize,
        ref,
      }, {
        id: '13338',
        name: 'Farbe',
        type: 'color',
        value: this.$refs[this.textref].style.fill,
        ref,
      }];
    },
    changeVal(name, value) {
      switch (name) {
        case 'Text':
          this.settings.text = value;
          this.n.width = this.$refs[this.textref].getBBox().width;
          this.n.height = this.$refs[this.textref].getBBox().height;
          break;
        case 'Farbe':
          this.$refs[this.textref].style.fill = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
          break;
        case 'Größe':
          this.fontsize = value;
          this.$refs[this.textref].style.fontSize = `${this.fontsize}px`;
          this.n.width = this.$refs[this.textref].getBBox().width;
          this.n.height = this.$refs[this.textref].getBBox().height;
          break;
        case 'Schrift':
          this.fontfamily = value;
          this.$refs[this.textref].style.fontFamily = this.fontfamily;
          this.n.width = this.$refs[this.textref].getBBox().width;
          this.n.height = this.$refs[this.textref].getBBox().height;
          break;
        default:
          break;
      }
    },
  },
};
</script>
