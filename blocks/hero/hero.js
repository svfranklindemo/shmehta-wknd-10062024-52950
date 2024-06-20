import { getPrice } from '../../scripts/nissan-services.js';

// Function to replace {price} with the actual price
function replacePricePlaceholder(block, price) {
  const placeholderPattern = /\{price\}/g; // Regex pattern to find {price}

  // Traverse all child nodes of the block element
  function traverseNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // If the node is a text node, replace the placeholder
      node.textContent = node.textContent.replace(placeholderPattern, price);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // If the node is an element node, traverse its children
      node.childNodes.forEach(traverseNodes);
    }
  }

  // Start traversing from the block element
  traverseNodes(block);
}

/**
 * loads and decorates the hero
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const imageEl = block.querySelector('img');
  imageEl.removeAttribute('loading'); // Lighthouse recommendation: remove lazy-loading
  imageEl.setAttribute('loading', 'eager');

  // eslint-disable-next-line no-shadow
  getPrice().then((response) => {
    replacePricePlaceholder(block, response?.price || 'null');
  }).catch(() => {
    // error handling
  });

  // Target the second child div
  const secondChildDiv = block.children[0];
  [...secondChildDiv.children].forEach((child) => {
    const pictureElement = child.querySelector('picture');

    if (pictureElement) {
      child.className = 'hero-image';
    } else {
      child.className = 'hero-desc-wrapper';
      const buttonLink = child.querySelector('.button-container a');
      buttonLink?.classList.remove('button', 'button-primary');
      buttonLink?.classList.add('button-primary');
    }
  });
}
