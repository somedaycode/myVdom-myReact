import myReact from '../myReact.js';
import { h } from '../myVdom.js';
import List from './List.js';
import OtherList from './OtherList.js';

export default function App({ $target }) {
  const [todos, setTodo] = myReact.useState('todo')(['item']);
  const [value, setValue] = myReact.useState('inputValue')('');

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
  }

  const handleFoucs = (e) => {
    setValue(e.target.value);
  };

  return h(
    'h1',
    { class: 'title' },
    null,
    'TODO TEST',
    h('ul', null, null, ...todos.map((todo) => List(todo))),
    h('input', { class: 'todo__input', value }, [
      { key: 'keyup', handler: (e) => handleFoucs(e) },
    ]),
    h(
      'button',
      { class: 'addBtn' },
      [{ key: 'click', handler: (e) => handleClick(e) }],
      '추가'
    ),
    h('div', null, null, OtherList())
  );
}
