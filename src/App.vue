<template>
  <div id="1337">
    <div>
      <b-navbar>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>

          <b-nav-item-dropdown text="Datei" right>
            <b-dropdown-item v-on:click="shownew = !shownew">Neu</b-dropdown-item>
            <b-dropdown-item v-on:click="showsave = !showsave">speichern / laden</b-dropdown-item>
            <b-dropdown-item v-on:click="showexport = !showexport">exportieren</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <b-overlay v-if="shownew">
      <b-card title="Neue Datei">
        <div>
          <b-form>
            <b-form-group
              id="input-group-size"
              label="Breite"
              label-for="input-x"
            >
              <b-form-input
                id="input-x"
                v-model="newFile.x"
                type="number"
                placeholder="1200"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-size"
              label="Höhe"
              label-for="input-y"
            >
              <b-form-input
                id="input-y"
                v-model="newFile.y"
                type="number"
                placeholder="1200"
                required
              ></b-form-input>
            </b-form-group>
            <b-button @click="createNew" variant="primary">erstellen</b-button>
            <b-button @click="shownew = !shownew">abbrechen</b-button>
          </b-form>
        </div>
      </b-card>
    </b-overlay>
    <b-overlay v-if="showexport">
      <b-card title="Datei exportieren">
        <b-row>
          <b-col>
            <b-col lg="1" class="pb-1">
              <b-button v-on:click="convertSVG()" variant="primary">SVG</b-button>
              <b-button v-on:click="convertPNG()" variant="primary">PNG</b-button>
              <b-button @click="showexport = !showexport">schließen</b-button>
            </b-col>
          </b-col>
          <b-col>
            <img v-if="svgexport" :src="svgexport" height="150" style="max-width:300px"/>
            <img v-if="pngexport" :src="pngexport" height="150" style="max-width:300px"/>
          </b-col>
          <b-col>
            <a :href="svgexport" v-if="svgexport" download="imagelab.svg" class="button">
              download SVG
            </a>
            <a :href="pngexport" v-if="pngexport" download="imagelab.png" class="button">
              download PNG
            </a>
          </b-col>
        </b-row>
      </b-card>
    </b-overlay>
    <b-overlay v-if="showsave">
      <b-card title="Datei speichern / laden">
        <b-row>
          <b-col>
            <b-col lg="1" class="pb-1">
              <b-button v-on:click="convertJSON()" variant="primary">speichern</b-button>
              <input type="file" @change="loadJSON($event.target.files[0])"/>
              <b-button @click="showsave = !showsave">schließen</b-button>
            </b-col>
            <b-col>
              <a :href="json" v-if="json" download="file.json" class="button">download Datei</a>
            </b-col>
          </b-col>
        </b-row>
      </b-card>
    </b-overlay>
    <b-container fluid>
      <b-row>
        <b-col cols="8" class="workspace">
          <drop class="copy" @drop="onCopyDrop">
            <svg
              :width="svg.x"
              :height="svg.y"
              ref="svgLayer"
              class="svg-draw"
              preserveAspectRatio="none"
              id="svg"
              :style="{
                scale: $store.scalework/100,
                borderWidth: `${Math.ceil(3-$store.scalework/100)}px`
              }"
            >
              <rect
                  :width="svg.x"
                  :height="svg.y"
                  x="0"
                  y="0"
                  style="fill:transparent"
                  @mousedown="deactiveElement()"
              ></rect>
              <g
                v-for="n in layerElements.slice().reverse()"
                :key="n.id"
                @click="setSettings(n)"
                >
                <g :n="n" :is="n.comp"
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
                  <b-button block v-b-toggle.accordion-1>Arbeitsbereich</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible role="tabpanel">
                  <b-card-body>
                    <b-card-text>
                        <input type="range" min="25" max="200"
                          :value="$store.scalework"
                          @input="changeScale($event)">
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

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

              <b-card no-body class="mb-1" v-if="settingsTab">
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

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" role="tab">
                  <b-button block v-b-toggle.accordion-2>Ebenen</b-button>
                </b-card-header>
                <b-collapse id="accordion-2" visible role="tabpanel">
                  <b-card-body>
                    <b-card-text>
                      <drop-list
                        :items="layerElements"
                        class="layerlist"
                        @reorder="$event.apply(layerElements)"
                      >
                        <template v-slot:item="{item}">
                          <drag class="item" :key="item.id">
                            <div @click="setSettings(item)">
                              <div class="preview-image"
                                :style="{ backgroundImage: 'url(' + item.base + ')' }"
                              ></div>
                              <span>{{item.name}}</span>
                              <span @click="deleteElement(item)" class="delete-layer">
                                <b-icon-trash></b-icon-trash>
                              </span>
                            </div>
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
import Vue from 'vue';
import { Drag, Drop, DropList } from 'vue-easy-dnd';
import { uuid } from 'vue-uuid';
import { Sketch } from 'vue-color';
import domtoimage from 'dom-to-image';
import Rechteck from './components/rechteck.vue';
import TextEL from './components/text.vue';
import Circle from './components/circle.vue';
import ImageEL from './components/image.vue';
import Band from './components/band.vue';

export default {
  name: 'App',
  data: () => ({
    color: '#000',
    showexport: false,
    shownew: false,
    showsave: false,
    settingsTab: false,
    newFile: { x: 1200, y: 1200 },
    svg: { x: 1200, y: 1200 },
    pngexport: '',
    svgexport: '',
    json: null,
    elements: [
      {
        comp: ImageEL,
        name: 'Bild',
        id: uuid.v1(),
        width: 200,
        height: 300,
        base: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zNmEzZmIwYz0iIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIGlkPSJzdmciIGNsYXNzPSJzdmctZHJhdyI+PGcgZGF0YS12LTM2YTNmYjBjPSIiPjxnIGRhdGEtdi0zNmEzZmIwYz0iIj48aW1hZ2UgaWQ9IjA4YzgwYzEwLWRkYjEtMTFlYi05Yjk0LTM3N2E3MmM5NGVjYSIgeD0iNDAwIiB5PSIxMDAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiB4bGluazpocmVmPSJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSGRwWkhSb1BTSXhOaUlnYUdWcFoyaDBQU0l4TmlJZ1ptbHNiRDBpWTNWeWNtVnVkRU52Ykc5eUlpQmpiR0Z6Y3owaVlta2dZbWt0YVcxaFoyVWlJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUkrQ2lBZ1BIQmhkR2dnWkQwaVRUWXVNREF5SURVdU5XRXhMalVnTVM0MUlEQWdNU0F4TFRNZ01DQXhMalVnTVM0MUlEQWdNQ0F4SURNZ01Ib2lMejRLSUNBOGNHRjBhQ0JrUFNKTk1pNHdNRElnTVdFeUlESWdNQ0F3SURBdE1pQXlkakV3WVRJZ01pQXdJREFnTUNBeUlESm9NVEpoTWlBeUlEQWdNQ0F3SURJdE1sWXpZVElnTWlBd0lEQWdNQzB5TFRKb0xURXllbTB4TWlBeFlURWdNU0F3SURBZ01TQXhJREYyTmk0MWJDMHpMamMzTnkweExqazBOMkV1TlM0MUlEQWdNQ0F3TFM0MU56Y3VNRGt6YkMwekxqY3hJRE11TnpFdE1pNDJOaTB4TGpjM01tRXVOUzQxSURBZ01DQXdMUzQyTXk0d05qSk1NUzR3TURJZ01USldNMkV4SURFZ01DQXdJREVnTVMweGFERXllaUl2UGdvOEwzTjJaejQ9IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdHlwZT0idGV4dC9wbmciIGNsYXNzPSJkcmFnIi8+PCEtLS0tPjwvZz48L2c+PC9zdmc+',
      },
      {
        comp: Band,
        name: 'Banderole',
        id: uuid.v1(),
        width: 400,
        height: 140,
        base: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zNmEzZmIwYz0iIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIGlkPSJzdmciIGNsYXNzPSJzdmctZHJhdyI+PGcgZGF0YS12LTM2YTNmYjBjPSIiPjxnIGRhdGEtdi0zNmEzZmIwYz0iIj48ZyBpZD0iYjRkZDAxMTAtZGRhZi0xMWViLTliOTQtMzc3YTcyYzk0ZWNhIiB4PSIzMDAiIHk9IjE4MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiIGNsYXNzPSJkcmFnIiBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyI+PHN2ZyBpZD0iZ3JvdXAxIiB4PSIzMDAiIHk9IjE4MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxNDAiPjxyZWN0IHg9IjYwIiB5PSIzMCIgd2lkdGg9IjM0MCIgaGVpZ2h0PSI5MCIvPjxyZWN0IHg9IjQwIiB5PSIyMCIgd2lkdGg9IjM1MCIgaGVpZ2h0PSI5MCIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDNweDsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyIvPjxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNi4yODU3MTMsLTEyNC45NDA2MikiPjxwYXRoIGlkPSJwYXRoMTM5NyIgZD0iTTEwNC42LDEzMS4zYy0zNC4yLDAtNjIsMjcuOC02Miw2MmMwLDAsMCwwLDAsMGMwLDM0LjIsMjcuOCw2Miw2Miw2MmMzNC4yLDAsNjItMjcuOCw2Mi02MiYjeEE7ICAgICAgICAgICAgICBjMC0yLjItMC4xLTQuMy0wLjQtNi41bC0wLjMsMC4xbC00LjItNC44bC0yLjUsMC43bDEuNCw1LjVsLTQuNSwxLjJsLTQuNi0xNy43bDcuOS0yLjFjMC44LTAuMiwxLjYtMC4zLDIuMy0wLjMmI3hBOyAgICAgICAgICAgICAgQzE1Mi4xLDE0Ni4zLDEyOS42LDEzMS4zLDEwNC42LDEzMS4zeiBNMTQ5LjIsMTcyLjNsNC42LDE3LjdsLTQuNSwxLjJsLTEuOC03LjFsLTYuOSwxLjhsMS44LDcuMWwtNC41LDEuMmwtNC42LTE3LjdsNC41LTEuMiYjeEE7ICAgICAgICAgICAgICBsMS44LDYuOGw2LjktMS44bC0xLjgtNi44TDE0OS4yLDE3Mi4zeiBNMTYwLjksMTczLjRjLTAuNCwwLTAuOCwwLjEtMS4yLDAuMmwtMi43LDAuN2wxLjIsNC42bDIuNy0wLjdjMC45LTAuMiwxLjUtMC42LDEuOS0xJiN4QTsgICAgICAgICAgICAgIGMwLjQtMC41LDAuNS0xLjEsMC4zLTJjLTAuMi0wLjktMC42LTEuNC0xLjItMS42QzE2MS42LDE3My41LDE2MS4zLDE3My40LDE2MC45LDE3My40TDE2MC45LDE3My40eiBNMTI0LjYsMTc4LjYmI3hBOyAgICAgICAgICAgICAgYzAuOSwwLDEuNywwLjEsMi41LDAuM2MxLjcsMC40LDMuMSwxLjIsNC4zLDIuNHMyLDIuNywyLjUsNC41YzAuNSwxLjgsMC41LDMuNSwwLDUuMWMtMC41LDEuNi0xLjMsMy0yLjYsNC4xJiN4QTsgICAgICAgICAgICAgIGMtMS4yLDEuMS0yLjcsMS45LTQuNSwyLjRjLTEuOCwwLjUtMy41LDAuNS01LjIsMC4xYy0xLjYtMC40LTMuMS0xLjItNC4zLTIuNGMtMS4yLTEuMi0yLTIuNy0yLjUtNC41Yy0wLjUtMS44LTAuNS0zLjUsMC01LjEmI3hBOyAgICAgICAgICAgICAgYzAuNS0xLjYsMS4zLTMsMi42LTQuMWMxLjItMS4yLDIuOC0yLDQuNi0yLjRDMTIyLjksMTc4LjcsMTIzLjgsMTc4LjYsMTI0LjYsMTc4LjZMMTI0LjYsMTc4LjZ6IE0xMjQuNSwxODMmI3hBOyAgICAgICAgICAgICAgYy0wLjQsMC0wLjksMC4xLTEuMywwLjJjLTAuOSwwLjItMS43LDAuNy0yLjMsMS4zYy0wLjYsMC42LTEuMSwxLjMtMS4zLDIuMmMtMC4yLDAuOS0wLjIsMS44LDAsMi44YzAuMywxLDAuNywxLjgsMS4zLDIuNSYjeEE7ICAgICAgICAgICAgICBjMC42LDAuNiwxLjQsMS4xLDIuMiwxLjNjMC45LDAuMiwxLjcsMC4yLDIuNywwYzAuOS0wLjIsMS43LTAuNiwyLjMtMS4yYzAuNi0wLjYsMS4xLTEuMywxLjMtMi4yYzAuMi0wLjksMC4yLTEuOCwwLTIuOCYjeEE7ICAgICAgICAgICAgICBjLTAuMy0xLTAuNy0xLjgtMS4zLTIuNWMtMC42LTAuNi0xLjMtMS4xLTIuMi0xLjNDMTI1LjMsMTgzLDEyNC45LDE4MywxMjQuNSwxODNMMTI0LjUsMTgzeiBNMTA1LjEsMTgzLjhsMy42LDEzLjlsNy43LTJsMSwzLjgmI3hBOyAgICAgICAgICAgICAgbC0xMi4yLDMuMmwtNC42LTE3LjdMMTA1LjEsMTgzLjh6IiBzdHlsZT0iZmlsbDogcmdiKDI0MywgMTQ2LCAyNCk7Ii8+PHBhdGggaWQ9InBhdGgxNDAzIiBkPSJNMTA0LjYsMTI0LjljLTM3LjcsMC02OC4zLDMwLjYtNjguMyw2OC4zczMwLjYsNjguMyw2OC4zLDY4LjNzNjguMy0zMC42LDY4LjMtNjguMyYjeEE7ICAgICAgICAgICAgICBjMC0xLDAtMi0wLjEtMy4xbDEwLjctMi44YzcuNS0xLjksMTItOS42LDEwLjEtMTcuMWMtMS45LTcuNS05LjUtMTItMTctMTAuMWwtMTAuOCwyLjhDMTU0LjcsMTQwLjUsMTMxLjUsMTI0LjksMTA0LjYsMTI0LjkmI3hBOyAgICAgICAgICAgICAgTDEwNC42LDEyNC45eiBNMTA0LjYsMTMxLjNjMjMuOSwwLDQ0LjcsMTMuNSw1NSwzMy40bC01OC4zLDE1LjFjLTcuNSwxLjktMTIsOS42LTEwLjEsMTcuMWMxLjksNy41LDkuNSwxMiwxNywxMC4xbDU4LjMtMTUuMSYjeEE7ICAgICAgICAgICAgICBjMCwwLjUsMCwwLjksMCwxLjRjMCwzNC4yLTI3LjcsNjEuOS02MS45LDYxLjlzLTYxLjktMjcuNy02MS45LTYxLjlTNzAuNCwxMzEuMywxMDQuNiwxMzEuM0wxMDQuNiwxMzEuM3ogTTE3OSwxNjQuNSYjeEE7ICAgICAgICAgICAgICBjMC45LDAsMS43LDAuMSwyLjUsMC4zYzEuNywwLjQsMy4xLDEuMiw0LjMsMi40YzEuMiwxLjIsMiwyLjcsMi41LDQuNWMwLjUsMS44LDAuNSwzLjUsMCw1LjFjLTAuNSwxLjYtMS4zLDMtMi42LDQuMSYjeEE7ICAgICAgICAgICAgICBjLTEuMiwxLjEtMi43LDEuOS00LjUsMi40Yy0xLjgsMC41LTMuNSwwLjUtNS4yLDAuMWMtMS42LTAuNC0zLTEuMi00LjMtMi40Yy0xLjItMS4yLTItMi43LTIuNS00LjVjLTAuNS0xLjgtMC41LTMuNSwwLTUuMSYjeEE7ICAgICAgICAgICAgICBjMC41LTEuNiwxLjMtMywyLjYtNC4xYzEuMi0xLjIsMi44LTIsNC42LTIuNEMxNzcuMywxNjQuNiwxNzguMSwxNjQuNSwxNzksMTY0LjVMMTc5LDE2NC41eiBNMTc4LjgsMTY4LjljLTAuNCwwLTAuOSwwLjEtMS4zLDAuMiYjeEE7ICAgICAgICAgICAgICBjLTAuOSwwLjItMS43LDAuNy0yLjMsMS4zYy0wLjYsMC42LTEuMSwxLjMtMS4zLDIuMmMtMC4yLDAuOS0wLjIsMS44LDAsMi44YzAuMywxLDAuNywxLjgsMS4zLDIuNWMwLjYsMC42LDEuNCwxLjEsMi4yLDEuMyYjeEE7ICAgICAgICAgICAgICBjMC45LDAuMiwxLjcsMC4yLDIuNywwYzAuOS0wLjIsMS43LTAuNiwyLjMtMS4yYzAuNi0wLjYsMS4xLTEuMywxLjMtMi4yYzAuMi0wLjksMC4yLTEuOCwwLTIuOGMtMC4zLTEtMC43LTEuOC0xLjMtMi41JiN4QTsgICAgICAgICAgICAgIGMtMC42LTAuNi0xLjMtMS4xLTIuMi0xLjNDMTc5LjcsMTY5LDE3OS4zLDE2OC45LDE3OC44LDE2OC45TDE3OC44LDE2OC45eiBNMTYyLDE2OS4zYzEsMCwxLjksMC4yLDIuNywwLjZjMS41LDAuNywyLjQsMi4xLDIuOSw0JiN4QTsgICAgICAgICAgICAgIGMwLjMsMS4zLDAuMywyLjUsMCwzLjZjLTAuMywxLjEtMSwyLTEuOSwyLjdsNC43LDUuNGwtNC42LDEuMmwtNC4yLTQuOGwtMi41LDAuN2wxLjQsNS41bC00LjUsMS4ybC00LjYtMTcuN2w3LjktMi4xJiN4QTsgICAgICAgICAgICAgIEMxNjAuNCwxNjkuNCwxNjEuMiwxNjkuMywxNjIsMTY5LjNMMTYyLDE2OS4zeiBNMTQ5LjIsMTcyLjNsNC42LDE3LjdsLTQuNSwxLjJsLTEuOC03LjFsLTYuOSwxLjhsMS44LDcuMWwtNC41LDEuMmwtNC42LTE3LjcmI3hBOyAgICAgICAgICAgICAgbDQuNS0xLjJsMS44LDYuOGw2LjktMS44bC0xLjgtNi44TDE0OS4yLDE3Mi4zeiBNMTYwLjksMTczLjRjLTAuNCwwLTAuOCwwLjEtMS4yLDAuMmwtMi43LDAuN2wxLjIsNC42bDIuNy0wLjcmI3hBOyAgICAgICAgICAgICAgYzAuOS0wLjIsMS41LTAuNiwxLjktMWMwLjQtMC41LDAuNS0xLjEsMC4zLTJjLTAuMi0wLjktMC42LTEuNC0xLjItMS42QzE2MS42LDE3My41LDE2MS4zLDE3My40LDE2MC45LDE3My40TDE2MC45LDE3My40eiYjeEE7ICAgICAgICAgICAgICBNMTI0LjYsMTc4LjZjMC45LDAsMS43LDAuMSwyLjUsMC4zYzEuNywwLjQsMy4xLDEuMiw0LjMsMi40czIsMi43LDIuNSw0LjVjMC41LDEuOCwwLjUsMy41LDAsNS4xYy0wLjUsMS42LTEuMywzLTIuNiw0LjEmI3hBOyAgICAgICAgICAgICAgYy0xLjIsMS4xLTIuNywxLjktNC41LDIuNGMtMS44LDAuNS0zLjUsMC41LTUuMiwwLjFjLTEuNi0wLjQtMy0xLjItNC4zLTIuNGMtMS4yLTEuMi0yLTIuNy0yLjUtNC41Yy0wLjUtMS44LTAuNS0zLjUsMC01LjEmI3hBOyAgICAgICAgICAgICAgYzAuNS0xLjYsMS4zLTMsMi42LTQuMWMxLjItMS4yLDIuOC0yLDQuNi0yLjRDMTIyLjksMTc4LjcsMTIzLjgsMTc4LjYsMTI0LjYsMTc4LjZMMTI0LjYsMTc4LjZ6IE0xMjQuNSwxODMmI3hBOyAgICAgICAgICAgICAgYy0wLjQsMC0wLjksMC4xLTEuMywwLjJjLTAuOSwwLjItMS43LDAuNy0yLjMsMS4zYy0wLjYsMC42LTEuMSwxLjMtMS4zLDIuMmMtMC4yLDAuOS0wLjIsMS44LDAsMi44YzAuMywxLDAuNywxLjgsMS4zLDIuNSYjeEE7ICAgICAgICAgICAgICBjMC42LDAuNiwxLjQsMS4xLDIuMiwxLjNjMC45LDAuMiwxLjcsMC4yLDIuNywwYzAuOS0wLjIsMS43LTAuNiwyLjMtMS4yYzAuNi0wLjYsMS4xLTEuMywxLjMtMi4yczAuMi0xLjgsMC0yLjgmI3hBOyAgICAgICAgICAgICAgYy0wLjMtMS0wLjctMS44LTEuMy0yLjVjLTAuNi0wLjYtMS4zLTEuMS0yLjItMS4zQzEyNS4zLDE4MywxMjQuOSwxODMsMTI0LjUsMTgzTDEyNC41LDE4M3ogTTEwNS4xLDE4My44bDMuNiwxMy45bDcuNy0ybDEsMy44JiN4QTsgICAgICAgICAgICAgIGwtMTIuMiwzLjJsLTQuNi0xNy43TDEwNS4xLDE4My44eiIgc3R5bGU9ImZpbGw6IHJnYigyLCAyLCAzKTsiLz48cGF0aCBpZD0icGF0aDEzNjUiIGQ9Ik0xNzksMTY0LjVjLTAuOSwwLTEuNywwLjEtMi42LDAuNGMtMS44LDAuNS0zLjMsMS4zLTQuNiwyLjRjLTEuMiwxLjEtMi4xLDIuNS0yLjYsNC4xJiN4QTsgICAgICAgICAgICAgIGMtMC41LDEuNi0wLjUsMy4zLDAsNS4xYzAuNSwxLjgsMS4zLDMuMywyLjUsNC41YzEuMiwxLjIsMi42LDEuOSw0LjMsMi40YzEuNywwLjQsMy40LDAuNCw1LjItMC4xYzEuOC0wLjUsMy4zLTEuMyw0LjUtMi40JiN4QTsgICAgICAgICAgICAgIGMxLjItMS4yLDIuMS0yLjUsMi42LTQuMWMwLjUtMS42LDAuNS0zLjMsMC01LjFjLTAuNS0xLjgtMS4zLTMuMy0yLjUtNC41Yy0xLjItMS4yLTIuNi0yLTQuMy0yLjQmI3hBOyAgICAgICAgICAgICAgQzE4MC43LDE2NC42LDE3OS44LDE2NC41LDE3OSwxNjQuNUwxNzksMTY0LjV6IE0xNzguOCwxNjguOWMwLjQsMCwwLjksMC4xLDEuMywwLjJjMC44LDAuMiwxLjYsMC42LDIuMiwxLjMmI3hBOyAgICAgICAgICAgICAgYzAuNiwwLjYsMS4xLDEuNCwxLjMsMi41YzAuMywxLDAuMywyLDAsMi44Yy0wLjIsMC45LTAuNywxLjYtMS4zLDIuMmMtMC42LDAuNi0xLjQsMS0yLjMsMS4yYy0wLjksMC4yLTEuOCwwLjItMi43LDAmI3hBOyAgICAgICAgICAgICAgYy0wLjgtMC4yLTEuNi0wLjYtMi4yLTEuM2MtMC42LTAuNi0xLjEtMS41LTEuMy0yLjVjLTAuMy0xLTAuMy0xLjksMC0yLjhjMC4yLTAuOSwwLjctMS42LDEuMy0yLjJjMC42LTAuNiwxLjQtMSwyLjMtMS4zJiN4QTsgICAgICAgICAgICAgIEMxNzcuOSwxNjksMTc4LjQsMTY4LjksMTc4LjgsMTY4LjlMMTc4LjgsMTY4Ljl6IE0xNjIsMTY5LjNjLTAuOCwwLTEuNiwwLjEtMi41LDAuM2wtNy45LDIuMWw0LjYsMTcuN2w0LjUtMS4ybC0xLjQtNS41bDIuNS0wLjcmI3hBOyAgICAgICAgICAgICAgbDQuMiw0LjhsNC42LTEuMmwtNC43LTUuNGMwLjktMC43LDEuNi0xLjYsMS45LTIuN2MwLjMtMS4xLDAuMy0yLjMsMC0zLjZjLTAuNS0yLTEuNS0zLjMtMi45LTRDMTYzLjksMTY5LjUsMTYzLDE2OS4zLDE2MiwxNjkuMyYjeEE7ICAgICAgICAgICAgICBMMTYyLDE2OS4zeiBNMTQ5LjIsMTcyLjNsLTQuNSwxLjJsMS44LDYuOGwtNi45LDEuOGwtMS44LTYuOGwtNC41LDEuMmw0LjYsMTcuN2w0LjUtMS4ybC0xLjgtNy4xbDYuOS0xLjhsMS44LDcuMWw0LjUtMS4yJiN4QTsgICAgICAgICAgICAgIEwxNDkuMiwxNzIuM3ogTTE2MC45LDE3My40YzAuNCwwLDAuNywwLDEsMC4yYzAuNiwwLjIsMSwwLjcsMS4yLDEuNmMwLjIsMC44LDAuMSwxLjUtMC4zLDJjLTAuNCwwLjUtMSwwLjgtMS45LDFsLTIuNywwLjcmI3hBOyAgICAgICAgICAgICAgbC0xLjItNC42bDIuNy0wLjdDMTYwLjEsMTczLjUsMTYwLjUsMTczLjQsMTYwLjksMTczLjRMMTYwLjksMTczLjR6IE0xMjQuNiwxNzguNmMtMC45LDAtMS43LDAuMS0yLjYsMC40JiN4QTsgICAgICAgICAgICAgIGMtMS44LDAuNS0zLjMsMS4zLTQuNiwyLjRjLTEuMiwxLjEtMi4xLDIuNS0yLjYsNC4xYy0wLjUsMS42LTAuNSwzLjMsMCw1LjFjMC41LDEuOCwxLjMsMy4zLDIuNSw0LjVjMS4yLDEuMiwyLjYsMS45LDQuMywyLjQmI3hBOyAgICAgICAgICAgICAgYzEuNywwLjQsMy40LDAuNCw1LjItMC4xYzEuOC0wLjUsMy4zLTEuMyw0LjUtMi40YzEuMi0xLjIsMi4xLTIuNSwyLjYtNC4xYzAuNS0xLjYsMC41LTMuMywwLTUuMWMtMC41LTEuOC0xLjMtMy4zLTIuNS00LjUmI3hBOyAgICAgICAgICAgICAgYy0xLjItMS4yLTIuNi0yLTQuMy0yLjRDMTI2LjMsMTc4LjcsMTI1LjUsMTc4LjYsMTI0LjYsMTc4LjZMMTI0LjYsMTc4LjZ6IE0xMjQuNSwxODNjMC40LDAsMC45LDAuMSwxLjMsMC4yJiN4QTsgICAgICAgICAgICAgIGMwLjgsMC4yLDEuNiwwLjYsMi4yLDEuM2MwLjYsMC42LDEuMSwxLjQsMS4zLDIuNWMwLjMsMSwwLjMsMiwwLDIuOGMtMC4yLDAuOS0wLjcsMS42LTEuMywyLjJjLTAuNiwwLjYtMS40LDEtMi4zLDEuMiYjeEE7ICAgICAgICAgICAgICBjLTAuOSwwLjItMS44LDAuMi0yLjcsMGMtMC44LTAuMi0xLjYtMC42LTIuMi0xLjNjLTAuNi0wLjYtMS4xLTEuNS0xLjMtMi41Yy0wLjMtMS0wLjMtMS45LDAtMi44YzAuMi0wLjksMC43LTEuNiwxLjMtMi4yJiN4QTsgICAgICAgICAgICAgIGMwLjYtMC42LDEuNC0xLDIuMy0xLjNDMTIzLjYsMTgzLjEsMTI0LDE4MywxMjQuNSwxODNMMTI0LjUsMTgzeiBNMTA1LjEsMTgzLjhsLTQuNSwxLjJsNC42LDE3LjdsMTIuMi0zLjJsLTEtMy44bC03LjcsMiYjeEE7ICAgICAgICAgICAgICBMMTA1LjEsMTgzLjh6IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyIvPjwvZz48dGV4dCB4PSIxODAiIHk9IjgwIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyBmb250LWZhbWlseTogJnF1b3Q7UHJvbXB0JnF1b3Q7OyBmb250LXdlaWdodDogNjAwOyBmb250LXNpemU6IDI1cHg7Ij5CYW5kZXJvbGU8L3RleHQ+PC9zdmc+PC9nPjwhLS0tLT48L2c+PC9nPjwvc3ZnPg==',
      },
      {
        comp: Rechteck,
        name: 'Rechteck',
        id: uuid.v1(),
        width: 50,
        height: 200,
        base: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zNmEzZmIwYz0iIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIGlkPSJzdmciIGNsYXNzPSJzdmctZHJhdyI+PGcgZGF0YS12LTM2YTNmYjBjPSIiPjxnIGRhdGEtdi0zNmEzZmIwYz0iIj48cmVjdCBpZD0iNmUzYzFhMjAtZGRhZi0xMWViLTliOTQtMzc3YTcyYzk0ZWNhIiB4PSIyOTMiIHk9IjEwNSIgd2lkdGg9IjQxNyIgaGVpZ2h0PSIyOTIiIGNsYXNzPSJkcmFnIiBzdHlsZT0iZmlsbDogcmdiKDAsIDAsIDApOyIvPjwhLS0tLT48L2c+PC9nPjwvc3ZnPg==',
      },
      {
        comp: TextEL,
        name: 'Text',
        id: uuid.v1(),
        width: 200,
        height: 25,
        base: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zNmEzZmIwYz0iIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIGlkPSJzdmciIGNsYXNzPSJzdmctZHJhdyI+PGcgZGF0YS12LTM2YTNmYjBjPSIiPjxnIGRhdGEtdi0zNmEzZmIwYz0iIj48dGV4dCB4PSIzMzIiIHk9IjI1Mi41IiBpZD0iZjZiYTc3MTAtZGRiMC0xMWViLTliOTQtMzc3YTcyYzk0ZWNhIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1IiBzdHlsZT0iZm9udC1zaXplOiA1MHB4OyBmb250LWZhbWlseTogUHJvbXB0OyI+IEJlaXNwaWVsdGV4dCA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=',
      },
      {
        comp: Circle,
        name: 'Kreis',
        id: uuid.v1(),
        width: 100,
        height: 100,
        base: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtdi0zNmEzZmIwYz0iIiB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIGlkPSJzdmciIGNsYXNzPSJzdmctZHJhdyI+PGcgZGF0YS12LTM2YTNmYjBjPSIiPjxnIGRhdGEtdi0zNmEzZmIwYz0iIj48ZWxsaXBzZSBpZD0iMDlkZDQyMTAtZGRiMC0xMWViLTliOTQtMzc3YTcyYzk0ZWNhIiBjeD0iNTAwIiBjeT0iMjUwIiByeD0iMTAwIiByeT0iMTAwIiBjbGFzcz0iZHJhZyIgc3R5bGU9ImZpbGw6IHJnYigwLCAwLCAwKTsiLz48IS0tLS0+PC9nPjwvZz48L3N2Zz4=',
      },
    ],
    settings: [],
    layerElements: [],
    activeElement: null,
    cut: [],
  }
  ),
  components: {
    Drag,
    Drop,
    DropList,
    Sketch,
  },
  methods: {
    changeScale(e) {
      this.$actions.changeScale(e.target.value);
    },
    createNew() {
      this.layerElements = [];
      this.svg = this.newFile;
      this.shownew = false;
    },
    onCopyDrop(e) {
      this.layerElements.unshift({
        id: uuid.v1(),
        comp: e.data.comp,
        width: e.data.width,
        height: e.data.height,
        name: e.data.name,
        base: e.data.base,
        svg: this.$refs.svgLayer,
        x: this.$refs.svgLayer.width.baseVal.value / 2 - e.data.width / 2,
        y: this.$refs.svgLayer.height.baseVal.value / 2 - e.data.height / 2,
      });
      const element = this.layerElements[0];
      Vue.nextTick(() => {
        this.setSettings(element);
      });
    },
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
      this.json = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonsave))}`;
    },
    loadJSON(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importJSON = JSON.parse(e.target.result);
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
        }
      };
      reader.readAsText(file);
    },
    setSettings(element) {
      for (let i = 0; i < this.layerElements.length; i += 1) {
        this.$refs[this.layerElements[i].id][0].hideHelp();
      }
      this.$refs[element.id][0].showHelp();
      this.activeElement = element.id;
      this.settings = this.$refs[element.id][0].getSettings(element.id);
      this.$actions.changePostion(element.x, element.y);
      this.$actions.changeSize(element.width, element.height);
      this.settingsTab = true;
    },
    deactiveElement() {
      for (let i = 0; i < this.layerElements.length; i += 1) {
        this.$refs[this.layerElements[i].id][0].hideHelp();
      }
      this.settingsTab = false;
    },
    changeBasic(name, val) {
      this.$refs[this.activeElement][0].n[name] = parseInt(val, 10);
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
  border: 1px solid #000;
  transform-origin: top left;
}
.delete-layer {
  color: #ff0000;
}
.delete-layer:hover {
  cursor: pointer;
}
.layerlist .item >div{
  margin: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.preview-image {
  width: 100px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border: 1px solid #000;
  margin-right: 15px;
}
.workspace {
  overflow: scroll;
}
</style>
