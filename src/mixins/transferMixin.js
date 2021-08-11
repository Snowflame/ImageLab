import axios from 'axios';
import Vue from 'vue';
import { uuid } from 'vue-uuid';

const Transfer = {
  methods: {
    parseJSON(file) {
      const importJSON = JSON.parse(atob(file));
      for (let index = 0; index < importJSON.length; index += 1) {
        const element = importJSON[index];
        const el = this.elements.filter((item) => item.name === element.name);
        this.layerElements.push({
          id: uuid.v1(),
          comp: el[0].comp,
          width: element.width,
          height: element.height,
          name: element.name,
          base: el[0].base,
          svg: this.$refs.svgLayer,
          x: element.x,
          y: element.y,
        });
        Vue.nextTick(() => {
          for (
            let settingsIndex = 0;
            settingsIndex < element.settings.length;
            settingsIndex += 1
          ) {
            this.$refs[this.layerElements[this.layerElements.length - 1].id][0].changeVal(
              element.settings[settingsIndex].name,
              element.settings[settingsIndex].value,
            );
          }
        });
      }
    },
    uploadJSON() {
      this.uploaded = false;
      axios.post('http://localhost:3000/save', {
        json: this.json,
        name: this.savename,
      }).then((response) => {
        if (response.data.error) alert('error');
        if (response.data.success) this.uploaded = true;
      });
    },
    loadFileList() {
      this.fileList = [];
      axios.get('http://localhost:3000/list')
        .then((response) => {
          if (response.data.error) alert('error');
          if (response.data.list) this.fileList = response.data.list;
        });
    },
    loadFile(name) {
      this.fileList = [];
      axios.get('http://localhost:3000/load', {
        params: { name },
      })
        .then((response) => {
          if (response.data.error) alert('error');
          if (response.data.file) this.parseJSON(response.data.file);
        });
    },
    loadJSON(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseJSON(e.target.result);
      };
      reader.readAsText(file);
    },
  },
};

export default Transfer;
