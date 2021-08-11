import domtoimage from 'dom-to-image';
import Vue from 'vue';

const convert = {
  convertSVG() {
    this.$actions.toggleResize();
    Vue.nextTick(() => {
      const s = new XMLSerializer().serializeToString(this.$refs.svgLayer);
      const encodedData = window.btoa(s);
      this.svgexport = `data:image/svg+xml;base64,${encodedData}`;
      this.$actions.toggleResize();
    });
  },
  convertPNG() {
    this.$actions.toggleResize();
    domtoimage.toPng(this.$refs.svgLayer)
      .then((dataUrl) => {
        this.pngexport = dataUrl;
        this.$actions.toggleResize();
      })
      .catch(() => {
        alert('oops, something went wrong!');
        this.$actions.toggleResize();
      });
  },
  convertJSON() {
    const jsonsave = [];
    for (let index = 0; index < this.layerElements.length; index += 1) {
      const element = this.layerElements[index];
      element.settings = this.$refs[element.id][0].getSettings(element.id);
      jsonsave.push(element);
    }
    this.json = btoa(JSON.stringify(jsonsave));
  },
};

export default convert;
