<template>
    <g>
      <text
        :x="n.x"
        :y="n.y"
        :id="n.id"
        :width="n.width"
        :height="n.height"
        :ref="textref"
        style="font-size: 20px; font-family: 'Fira Sans'"
        @mousedown="dragMouseDown($event, n)">
        {{settings.text}}
      </text>
  </g>
</template>

<script>
import { uuid } from 'vue-uuid';
import ElementControl from '../mixins/elementcontrol/mixin';

export default {
  props: ['n'],
  name: 'TextElement',
  mixins: [ElementControl],
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
          break;
        case 'Farbe':
          this.$refs[this.textref].style.fill = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${value.rgba.a})`;
          break;
        case 'Größe':
          this.fontsize = value;
          this.$refs[this.textref].style.fontSize = `${this.fontsize}px`;
          break;
        case 'Schrift':
          this.fontfamily = value;
          this.$refs[this.textref].style.fontFamily = this.fontfamily;
          break;
        default:
          break;
      }
    },
  },
};
</script>
