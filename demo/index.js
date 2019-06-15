import { html, render } from 'lit-html';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-input.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '../clipboard-copy.js';

export class DemoPage {
  constructor() {
    this._valueChanged = this._valueChanged.bind(this);
    this._copyHandler = this._copyHandler.bind(this);

    this.icon = this.defaultIcon;
  }

  get defaultIcon() {
    return 'arc:content-copy';
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._setObservableProperty('value', value);
  }

  get icon() {
    return this._icon;
  }

  set icon(value) {
    this._setObservableProperty('icon', value);
  }

  _setObservableProperty(prop, value) {
    const key = '_' + prop;
    if (this[key] === value) {
      return;
    }
    this[key] = value;
    this.render();
  }

  _valueChanged(e) {
    this.value = e.target.value;
  }

  _copyHandler() {
    if (document.querySelector('clipboard-copy').copy()) {
      this.icon = 'arc:done';
    } else {
      this.icon = 'arc:error';
    }
    // Resets the copy button after a second.
    setTimeout(() => this._resetButton(), 1000);
  }

  _resetButton() {
    this.icon = this.defaultIcon;
  }

  render() {
    render(html`
    <div class="vertical-section-container centered">
      <h3>The "clipboard-copy"</h3>
      <paper-input label="Text to copy" @change="${this._valueChanged}"></paper-input>
      <paper-icon-button .icon="${this.icon}" @click="${this._copyHandler}"></paper-icon-button>
      <clipboard-copy .content="${this.value}"></clipboard-copy>
    </div>`, document.querySelector('#demo'));
  }
}
const instance = new DemoPage();
instance.render();
window._demo = instance;
