<template>
    <rect
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        style="fill:#ddd"
    ></rect>
</template>

<script>
export default {
  props: ['n'],
  name: 'svgElement',
};
</script>
