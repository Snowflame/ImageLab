import Vue from 'vue';

/* Create a reactive store */
export const store = Vue.observable({ showResize: true });

/* Create centralized actions for updating the store */
export const actions = {
  toggleResize() {
    store.showResize = !store.showResize;
  },
};
