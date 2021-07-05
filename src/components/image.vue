<template>
    <g>
    <image
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        :xlink:href="settings.value"
        type="text/png"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
    ></image>
    <ElementControlComp ref="sizeHelper" :n="n" :setpaddingside="10" :setpaddingtop="10"/>
  </g>
</template>

<script>
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Bild',
  components: { ElementControlComp },
  mixins: [ElementControl],
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
