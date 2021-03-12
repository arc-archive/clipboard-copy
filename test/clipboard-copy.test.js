import { fixture, assert, html } from '@open-wc/testing';
import '../clipboard-copy.js';

/** @typedef {import('../').ClipboardCopyElement} ClipboardCopyElement */

describe('ClipboardCopyElement', () => {
  /**
   * @returns {Promise<ClipboardCopyElement>}
   */
  async function basicFixture() {
    return fixture(html`<clipboard-copy></clipboard-copy>`);
  }

  /**
   * @returns {Promise<ClipboardCopyElement>}
   */
  async function attrFixture() {
    return fixture(html`<clipboard-copy content="test-attribute"></clipboard-copy>`);
  }

  describe('Property based content', () => {
    const content = 'test-123';
    let element = /** @type ClipboardCopyElement */ (null);
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('content-copy custom event is dispatched', (done) => {
      element.content = content;
      element.addEventListener('content-copy', function clb(e) {
        element.removeEventListener('content-copy', clb);
        assert.isTrue(e.cancelable, 'event is cancelable');
        // @ts-ignore
        assert.equal(e.detail.value, content, 'Contains the value');
        done();
      });
      element.copy();
    });

    it('content-copied custom event is dispatched', (done) => {
      element.content = content;
      element.addEventListener('content-copied', function clb(e) {
        element.removeEventListener('content-copied', clb);
        assert.isFalse(e.cancelable, 'event is not cancelable');
        assert.isFalse(e.bubbles, 'event does not bubbles');
        done();
      });
      element.copy();
    });

    it('content-copied is dispatched when content-copy is canceled', (done) => {
      let canceled = false;
      element.content = content;
      element.addEventListener('content-copy', function clb(e) {
        element.removeEventListener('content-copy', clb);
        e.preventDefault();
        canceled = true;
      });
      element.addEventListener('content-copied', function clb() {
        element.removeEventListener('content-copied', clb);
        assert.isTrue(canceled);
        done();
      });
      element.copy();
    });
  });

  describe('Attribute based', () => {
    let element = /** @type ClipboardCopyElement */ (null);
    const contentValue = 'test-attribute';
    beforeEach(async () => {
      element = await attrFixture();
    });

    it('Sets "content" property', () => {
      assert.equal(element.content, contentValue);
    });

    it('content-copy custom event is dispatched', (done) => {
      element.addEventListener('content-copy', function clb(e) {
        element.removeEventListener('content-copy', clb);
        // @ts-ignore
        assert.equal(e.detail.value, contentValue, 'Contains the value');
        done();
      });
      element.copy();
    });
  });
});
