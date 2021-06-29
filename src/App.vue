<template>
  <div id="1337">
    <div>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>

          <b-nav-item-dropdown text="Test" right>
            <b-dropdown-item href="#">Test 1</b-dropdown-item>
            <b-dropdown-item href="#">Test 2</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <b-container class="workspace" fluid>
      <b-row>
        <b-col cols="8" class="text-center">
          <drop class="copy" @drop="onCopyDrop">
            <svg
              width="1000"
              height="500"
              ref="svgLayer"
              class="svg-draw"
              preserveAspectRatio="none"
            >
              <g
                v-for="n in layerElements"
                :key="n.id"
                >
                <g :n="n" :is="n.comp" @click="setSettings(n)"
                :ref="n.id">
                </g>
              </g>
            </svg>
          </drop>
        </b-col>
        <b-col cols="4">
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-1>Elemente</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible role="tabpanel">
                  <b-card-body>
                    <b-card-text>
                      <transition-group name="list" tag="div">
                        <drag
                          v-for="n in elements"
                          :key="n.id" class="drag"
                          :data="n"
                          >{{n.comp.name}}</drag>
                      </transition-group>
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-3>Eigenschaften</b-button>
                </b-card-header>
                <b-collapse id="accordion-3" visible role="tabpanel">
                  <b-card-body>
                    <div v-for="setting in settings" :key="setting.id">
                      <b-form-group v-if="setting.type == 'text'"
                        :label-for="setting.id"
                        :label="setting.name"
                      >
                        <b-form-input
                          :id="setting.id"
                          type="text"
                          :placeholder="setting.name"
                          v-model="setting.value"
                          @keyup="changeVal(setting.ref, setting.name, setting.value)"
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
                        :value="color"
                        @input="changeColor($event, setting.ref, setting.name)"
                      ></Sketch>
                      </b-form-group>
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-2>Ebenen</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" visible role="tabpanel">
                  <b-card-body>
                    <b-card-text>
                      <drop-list
                        :items="layerElements"
                        class="list"
                        @reorder="$event.apply(layerElements)"
                      >
                        <template v-slot:item="{item}">
                          <drag class="item" :key="item.id">
                            <span @click="setSettings(item)">{{item.name}}</span>
                            <span @click="deleteElement(item)" class="delete-layer">
                              <b-icon-trash></b-icon-trash>
                            </span>
                          </drag>
                        </template>
                      </drop-list>
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Drag, Drop, DropList } from 'vue-easy-dnd';
import { uuid } from 'vue-uuid';
import { Sketch } from 'vue-color';
import Rechteck from './components/rechteck.vue';
import TextEL from './components/text.vue';
import Circle from './components/circle.vue';
import ImageEL from './components/image.vue';
import Band from './components/band.vue';

export default {
  name: 'App',
  data: () => ({
    color: '#000',
    elements: [
      {
        comp: ImageEL,
        name: 'Unbenannt',
        id: uuid.v1(),
        width: 200,
        height: 300,
      },
      {
        comp: Band,
        name: 'Unbenannt',
        id: uuid.v1(),
        width: 400,
        height: 100,
      },
      {
        comp: Rechteck,
        name: 'Unbenannt',
        id: uuid.v1(),
        width: 50,
        height: 200,
      },
      {
        comp: TextEL,
        name: 'Unbenannt',
        id: uuid.v1(),
        width: 200,
        height: 25,
      },
      {
        comp: Circle,
        name: 'Unbenannt',
        id: uuid.v1(),
        width: 100,
        height: 100,
      },
    ],
    settings: [],
    layerElements: [],
    cut: [],
    positions: {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
      el: undefined,
    },
  }
  ),
  components: {
    Drag,
    Drop,
    DropList,
    Sketch,
  },
  methods: {
    onCopyDrop(e) {
      this.layerElements.push({
        id: uuid.v1(),
        comp: e.data.comp,
        width: e.data.width,
        height: e.data.height,
        name: e.data.name,
        svg: this.$refs.svgLayer,
        x: this.$refs.svgLayer.width.baseVal.value / 2 - e.data.width / 2,
        y: this.$refs.svgLayer.height.baseVal.value / 2 - e.data.height / 2,
      });
    },
    setSettings(element) {
      this.settings = this.$refs[element.id][0].getSettings(element.id);
    },
    changeVal(ref, name, val) {
      this.$refs[ref][0].changeVal(name, val);
    },
    changeFile(ref, name, value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$refs[ref][0].changeVal(name, e.target.result);
      };
      reader.readAsDataURL(value);
    },
    changeColor(val, ref, name) {
      this.$refs[ref][0].changeVal(name, val);
    },
    deleteElement(element) {
      const pos = this.layerElements.map((object) => (object.id)).indexOf(element.id);
      this.layerElements.splice(pos, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.add-element {
  width:100px;
  height:100px;
  border: 1px solid #000;
}
.svg-draw {
  width:1000px;
  height: 500px;
  border: 1px solid #000;
}
.delete-layer {
  color: #ff0000;
}
.delete-layer:hover {
  cursor: pointer;
}
</style>
