import { html, render } from 'lit-html';
import '../clipboard-copy.js';

export class DemoPage {
  constructor() {
    this._valueChanged = this._valueChanged.bind(this);
    this._copyHandler = this._copyHandler.bind(this);

    this.label = 'Copy';
    this.copied = false;
    this.value = undefined;
  }

  _valueChanged(e) {
    this.value = e.target.value;
    this.render();
  }

  _copyHandler() {
    if (document.querySelector('clipboard-copy').copy()) {
      this.label = 'Done';
    } else {
      this.label = 'Error';
    }
    this.copied = true;
    this.render();
    // Resets the copy button after a second.
    setTimeout(() => this._resetButton(), 1000);
  }

  _resetButton() {
    this.label = 'Copy';
    this.copied = false;
    this.render();
  }

  render() {
    const { label, copied } = this;
    render(html`
    <div class="vertical-section-container centered">
      <h3>The "clipboard-copy"</h3>
      <label for="textInput">Text to copy</label>
      <input id="textInput" @change="${this._valueChanged}"></paper-input>
      <button @click="${this._copyHandler}" ?disabled="${copied}">${label}</button>
      <clipboard-copy .content="${this.value}"></clipboard-copy>
    </div>`, document.querySelector('#demo'));
  }
}
const instance = new DemoPage();
instance.render();
