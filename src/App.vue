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
            <svg width="1000" height="500" ref="svgLayer" class="svg-draw">
              <g
                v-for="n in layerElements"
                :key="n.id"
                >
                <rect :n="n" :is="n.comp">
                </rect>
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
                          :key="n" class="drag"
                          :data="n"
                          >{{n.name}}</drag>
                      </transition-group>
                    </b-card-text>
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
                            {{item.name}}
                            <span @click="deleteElement(item)">delete</span>
                          </drag>
                        </template>
                        <template v-slot:feedback="{data}">
                          <div class="item feedback" :key="data">{{data}}</div>
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
import svgElement from './components/svgElement.vue';
import svgElement2 from './components/svgElement2.vue';

export default {
  name: 'App',
  data: () => ({
    elements: [
      {
        comp: svgElement,
        name: 'schwarz',
        width: 50,
        height: 200,
      },
      {
        comp: svgElement2,
        name: 'grau',
        width: 100,
        height: 150,
      },
    ],
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
        x: 100,
        y: 100,
      });
    },
    deleteElement(element) {
      const pos = this.layerElements.map((object) => (object.id)).indexOf(element.id);
      this.layerElements.splice(pos, 1);
    },
  },
};
</script>

<style lang="scss">
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
</style>
