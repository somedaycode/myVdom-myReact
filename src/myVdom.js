const DOM = (() => {
  let _tree = null;
  return {
    setTree: (newNode) => {
      _tree = newNode;
    },
    getTree: () => _tree,
  };
})();

// function h(nodeName, attributes, ...children) {
//   return { nodeName, attributes, children };
// }

function h(nodeName, attributes, events, ...children) {
  return { nodeName, attributes, events, children };
}

function renderNode(vNode) {
  const { nodeName, attributes, events, children } = vNode;

  if (typeof vNode === 'string') return document.createTextNode(vNode);

  const $el = document.createElement(nodeName);

  for (let key in attributes) {
    $el.setAttribute(key, attributes[key]);
  }

  if (events) {
    events.forEach((event) => {
      const { key, handler } = event;
      $el.addEventListener(key, handler);
    });
  }

  (children || []).forEach((child) => $el.appendChild(renderNode(child)));

  return $el;
}

const changed = (node1, node2) =>
  typeof node1 !== typeof node2 ||
  (typeof node1 === 'string' && typeof node2 === 'string') ||
  node1.attributes !== node2.attributes ||
  node1.nodeName !== node2.nodeName;

function updateDom($parent, newNode, oldNode, index = 0, isSaved = false) {
  if (isSaved === false) {
    DOM.setTree(newNode);
    isSaved = true;
  }

  if (!newNode && oldNode) {
    return $parent.removeChild($parent.childNodes[index]);
  }

  if (newNode && !oldNode) {
    return $parent.appendChild(renderNode(newNode));
  }

  if (changed(newNode, oldNode)) {
    return $parent.replaceChild(renderNode(newNode), $parent.childNodes[index]);
  }

  updateAttributes(
    $parent.childNodes[index],
    newNode.attributes || {},
    oldNode.attributes || {}
  );

  const maxLength = Math.max(newNode.children.length, oldNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateDom(
      $parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i,
      isSaved
    );
  }
}

function updateAttributes(target, newProps, oldProps) {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    target.setAttribute(attr, value);
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    target.removeAttribute(attr);
  }
}

export { h, updateDom, DOM };
