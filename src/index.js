import App from './components/App.js';
import { updateDom } from './myVdom.js';

const $root = document.querySelector('#app');

export const eventHandler = (() => {
  let callBackState = null;
  const addEvent = (eventType, cb) => {
    $root.removeEventListener(eventType, callBackState);
    $root.addEventListener(eventType, cb);
    callBackState = cb;
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
