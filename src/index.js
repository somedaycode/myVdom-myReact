import App from './components/App.js';
import { updateDom } from './myVdom.js';

const $root = document.querySelector('#app');

export const eventHandler = (() => {
  let callBackState = [];
  let key = 0;

  const addEvent = (eventType, selector, cb) => {
    key = 0;
    setTimeout(() => {
      const $target = $root.querySelector(selector);

      $target.removeEventListener(eventType, callBackState[key]);
      $target.addEventListener(eventType, cb);
      callBackState[key] = cb;
      key++;
    }, 0);
  };

  return {
    addEvent,
  };
})();

function init() {
  const renderd = App({ $target: $root });
  updateDom($root, renderd);
}

init();
