import { fixture, assert } from '@open-wc/testing';
import '../clipboard-copy.js';

describe('<clipboard-copy>', () => {
  async function basicFixture() {
    return (await fixture(`<clipboard-copy></clipboard-copy>`));
  }

  async function attrFixture() {
    return (await fixture(`<clipboard-copy content="test-attribute"></clipboard-copy>`));
  }

  describe('Property based content', () => {
    const content = 'test-123';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('content-copy custom event is dispatched', function(done) {
      element.content = content;
      element.addEventListener('content-copy', function clb(e) {
        element.removeEventListener('content-copy', clb);
        assert.isTrue(e.cancelable, 'event is cancelable');
        assert.equal(e.detail.value, content, 'Contains the value');
        done();
      });
      element.copy();
    });

    it('content-copied custom event is dispatched', function(done) {
      element.content = content;
      element.addEventListener('content-copied', function clb(e) {
        element.removeEventListener('content-copied', clb);
        assert.isFalse(e.cancelable, 'event is not cancelable');
        assert.isFalse(e.bubbles, 'event does not bubbles');
        done();
      });
      element.copy();
    });

    it('content-copied is dispatched when content-copy is canceled', function(done) {
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
    let element;
    const contentValue = 'test-attribute';
    beforeEach(async () => {
      element = await attrFixture();
    });

    it('Sets "content" property', () => {
      assert.equal(element.content, contentValue);
    });

    it('content-copy custom event is dispatched', function(done) {
      element.addEventListener('content-copy', function clb(e) {
        element.removeEventListener('content-copy', clb);
        assert.equal(e.detail.value, contentValue, 'Contains the value');
        done();
      });
      element.copy();
    });
  });
});
