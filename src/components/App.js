import { eventHandler } from '../index.js';
import myReact from '../myReact.js';
import { h } from '../myVdom.js';

export default function App({ $target }) {
  const [todos, setTodo] = myReact.useState('todo')(['item']);
  const [value, setValue] = myReact.useState('inputValue')('');
  const { addEvent } = eventHandler;

  setTimeout(() => {
    const $input = $target.querySelector('.todo__input');
    var len = $input.value.length;
    $input.focus();
    if ($input.setSelectionRange) {
      $input.setSelectionRange(len, len);
      $input.focus();
    }
  }, 0);

  function handleClick(e) {
    if (!e.target.closest('.addBtn')) return;
    const text = value;
    setTodo([...todos, text]);
    console.log(todos);
  }

  const handleFoucs = (e) => {
    setValue(e.target.value);
  };

  addEvent('click', '.addBtn', handleClick);
  addEvent('keyup', '.todo__input', handleFoucs);

  return h(
    'h1',
    { class: 'title' },
    'TODO TEST',
    h('ul', null, ...todos.map((todo) => List(todo))),
    h('input', { class: 'todo__input', value }),
    h('button', { class: 'addBtn' }, '추가')
  );
}
