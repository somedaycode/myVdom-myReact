import myReact from '../myReact.js';
import { h } from '../myVdom.js';

export default function OtherList() {
  const [todos, setTodo] = myReact.useState('todo')(['item']);
  return h('div', null, null, `${todos}`);
}
