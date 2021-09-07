import App from './components/App.js';
import { DOM, updateDom } from './myVdom.js';

const $root = document.querySelector('#app');

const render = () => {
  const prevDOM = DOM.getTree();
  const currentDOM = App($root);
  updateDom($root, currentDOM, prevDOM);
};

const myReact = (() => {
  const store = {};

  const getState = (key) => store[key];
  const useState =
    (key) =>
    (initialState = {}) => {
      if (!store[key]) store[key] = initialState;

      const setState = (key) => (newState) => {
        const prevState = store[key];
        if (prevState === newState) return;
        if (JSON.stringify(prevState) === JSON.stringify(newState)) return;

        store[key] = newState;
        render();
      };
      return [store[key], setState(key)];
    };

  return { getState, useState };
})();

export default myReact;
