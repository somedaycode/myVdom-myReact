import App from './components/App.js';
import { updateDom } from './myVdom.js';

const $root = document.querySelector('#app');

export const eventHandler = (() => {
  const addEvent = (eventType, cb) => {
    $root.addEventListener(eventType, cb);
  };

  return {
    addEvent,
  };
})();

function init() {
  const renderd = App();
  updateDom($root, renderd);
}

init();
