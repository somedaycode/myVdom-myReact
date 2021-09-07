import { eventHandler } from '../index.js';
import myReact from '../myReact.js';
import { h } from '../myVdom.js';

let count = 0;

export default function App() {
  const [todos, setTodo] = myReact.useState('todo')(['item']);
  const { addEvent } = eventHandler;

  function handleClick(e) {
    if (!e.target.closest('.addBtn')) return;
    setTodo([...todos, `itme${todos.length + 1}`]);
  }

  addEvent('click', handleClick);

  return h(
    'h1',
    { class: 'title' },
    'TODO TEST',
    h('ul', null, ...todos.map((todo) => h('li', null, todo))),
    h('button', { class: 'addBtn' }, '추가')
  );
}
