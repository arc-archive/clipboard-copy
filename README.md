# clipboard-copy

An element that copies a text to clipboard.

[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/clipboard-copy.svg)](https://www.npmjs.com/package/@advanced-rest-client/clipboard-copy)

[![Tests and publishing](https://github.com/advanced-rest-client/clipboard-copy/actions/workflows/deployment.yml/badge.svg)](https://github.com/advanced-rest-client/clipboard-copy/actions/workflows/deployment.yml)

## Usage

### Installation

```sh
npm install --save @advanced-rest-client/clipboard-copy
```

### In an html file

```html
<script type="module" src="/node_modules/@advanced-rest-client/clipboard-copy/clipboard-copy.js"></script>
<clipboard-copy content="test"></clipboard-copy>
<script>
const elm = document.querySelector('clipboard-copy');
if(elm.copy()) {
 console.info('Content has been copied to the clipboard');
} else {
 console.error('Content copy error. This browser is ancient!');
}
</script>
```

### In a LitElement

```js
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/clipboard-copy/clipboard-copy.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <clipboard-copy .content="${this.copyContent}"></clipboard-copy>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/clipboard-copy
cd clipboard-copy
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
