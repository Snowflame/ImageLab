<template>
    <rect
        :id="n.id"
        :ref="n.id"
        :x="n.x" :y="n.y"
        :width="n.width"
        :height="n.height"
        style="fill:#000"
    ></rect>
</template>

<script>
export default {
  props: ['n'],
  name: 'svgElement',
};
</script>
