<template>
    <g
        :transform="`rotate(${this.rotate})`"
        :transform-origin="`${n.x + (n.width/2)} ${n.y + (n.height/2)}`">
    <image
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :transform-origin="`${n.x} ${n.y}`"
        :width="n.width"
        :height="n.height"
        :xlink:href="settings.value"
        type="text/png"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
        :transform="`
        scale(${this.sx}, ${this.sy})
        translate(${this.mirror.x ? `-${this.n.width}` : '0'},
        ${this.mirror.y ? `-${this.n.height}` : '0'})`"
    ></image>
    <ElementControlComp ref="sizeHelper" :n="n"
    :setpaddingside="10" :setpaddingtop="10" :lockEL="lockEL"/>
  </g>
</template>

<script>
import ElementMove from '../mixins/elementmove/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Bild',
  components: { ElementControlComp },
  mixins: [ElementMove],
  data: () => ({
    settings: {
      value: 'Banderole',
    },
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
        name: 'Datei',
        type: 'file',
        value: '',
        ref,
      }];
    },
    changeVal(name, value) {
      this.settings.value = value;
    },
  },
};
</script>
