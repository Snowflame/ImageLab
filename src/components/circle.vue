<template>
    <g>
    <ellipse
        :id="n.id"
        :ref="n.id"
        :cx="n.x + n.width / 2" :cy="n.y + n.height / 2"
        :rx="n.width"
        :ry="n.height"
        style="fill:#000"
        class="drag"
        @mousedown="dragMouseDown($event, n)"
    ></ellipse>
    <ElementControlComp
      mode="c"
      :n="n" :setpaddingside="n.width / 2 + 10"
      :setpaddingtop="n.height / 2 + 10"
    />
  </g>
</template>

<script>
import ElementControl from '../mixins/elementcontrol/mixin';
import ElementControlComp from '../mixins/elementcontrol/comp.vue';

export default {
  props: ['n'],
  name: 'Kreis',
  components: { ElementControlComp },
  mixins: [ElementControl],
};
</script>
