<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" role="tab">
      <b-button block v-b-toggle.accordion-3>Eigenschaften</b-button>
    </b-card-header>
    <b-collapse id="accordion-3" visible role="tabpanel">
      <b-card-body>
        <b-form-group
          label-for="posx"
          label="Postion X"
        >
          <b-form-input
            id="posx"
            type="text"
            v-model="$store.aktiveElement.x"
            @keyup="changeBasic('x', $store.aktiveElement.x)"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="posy"
          label="Postion Y"
        >
          <b-form-input
            id="posy"
            type="text"
            v-model="$store.aktiveElement.y"
            @keyup="changeBasic('y', $store.aktiveElement.y)"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="awidth"
          label="Breite"
        >
          <b-form-input
            id="awidth"
            type="text"
            v-model="$store.aktiveElement.width"
            @keyup="changeBasic('width', $store.aktiveElement.width)"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="aheight"
          label="Höhe"
        >
          <b-form-input
            id="aheight"
            type="text"
            v-model="$store.aktiveElement.height"
            @keyup="changeBasic('height', $store.aktiveElement.height)"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label-for="rotate"
          label="drehen"
        >
          <b-form-input
            id="rotate"
            type="number"
            v-model="rotate"
            @keyup="changeRotate()"
          ></b-form-input>
            <input type="range" min="0" max="360"
            v-model="rotate"
            style="width:100%"
            @input="changeRotate()">
        </b-form-group>
        <b-button @click="mirror('x')"
        :variant="this.activeElement.mirror.x ? 'primary':''"
        >spiegeln x</b-button>
        <b-button @click="mirror('y')"
        :variant="this.activeElement.mirror.y ? 'primary':''"
        >spiegeln y</b-button>
        <b-button @click="lockEL()"
        :variant="this.activeElement.lockEL ? 'primary':''"
        >lock
        </b-button>
        <div v-for="setting in settings" :key="setting.id">
          <b-form-group v-if="setting.type == 'text'"
            :label-for="setting.id"
            :label="setting.name"
          >
            <b-form-input
              :id="setting.id"
              type="text"
              v-model="setting.value"
              @keyup="changeVal(setting.ref, setting.name, setting.value)"
            ></b-form-input>
          </b-form-group>
          <b-form-group v-if="setting.type == 'option'"
            :label-for="setting.id"
            :label="setting.name"
          >
            <b-form-select
              :id="setting.id"
              v-model="setting.value"
              :options="setting.options"
              @change="changeVal(setting.ref, setting.name, setting.value)">
            </b-form-select>
          </b-form-group>
          <b-form-group v-if="setting.type == 'number'"
            :label-for="setting.id"
            :label="setting.name"
          >
            <b-form-input
              :id="setting.id"
              type="number"
              v-model="setting.value"
              @change="changeVal(setting.ref, setting.name, setting.value)"
            ></b-form-input>
          </b-form-group>
          <b-form-group v-if="setting.type == 'file'"
            :label-for="setting.id"
            :label="setting.name"
          >
            <input type="file"
              @change="changeFile(setting.ref, setting.name, $event.target.files[0])"/>
          </b-form-group>
          <b-form-group v-if="setting.type == 'color'"
            :label-for="setting.id"
            :label="setting.name"
          >
          <Sketch
            :value="setting.value"
            @input="changeColor($event, setting.ref, setting.name)"
          ></Sketch>
          </b-form-group>
        </div>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>
<script>
import { Sketch } from 'vue-color';

export default {
  name: 'App',
  props: ['activeElement'],
  data: () => ({
    color: '#000',
    settingsTab: false,
    rotate: 0,
    settings: null,
  }
  ),
  components: {
    Sketch,
  },
  mounted() {
    this.settings = this.activeElement.getSettings(this.activeElement);
    this.rotate = this.activeElement.rotate;
  },
  methods: {
    changeBasic(name, val) {
      this.activeElement.n[name] = parseInt(val, 10);
    },
    changeRotate() {
      this.activeElement.rotate = parseInt(this.rotate, 10);
    },
    mirror(direction) {
      if (direction === 'x') {
        this.activeElement.mirrorX();
      } else {
        this.activeElement.mirrorY();
      }
    },
    lockEL() {
      this.activeElement.lockElement();
    },
    changeVal(ref, name, val) {
      this.activeElement.changeVal(name, val);
    },
    changeFile(ref, name, value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.activeElement.changeVal(name, e.target.result);
      };
      reader.readAsDataURL(value);
    },
    changeColor(val, ref, name) {
      this.activeElement.changeVal(name, val);
    },
  },
};
</script>
