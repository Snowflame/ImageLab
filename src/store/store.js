import Vue from 'vue';

export const store = Vue.observable({
  showResize: true,
  scalework: 100,
  aktiveElement: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
});

export const actions = {
  toggleResize() {
    store.showResize = !store.showResize;
  },
  changeScale(value) {
    store.scalework = value;
  },
  changePostion(x, y) {
    store.aktiveElement.x = x;
    store.aktiveElement.y = y;
  },
  changeSize(width, height) {
    store.aktiveElement.width = width;
    store.aktiveElement.height = height;
  },
};
