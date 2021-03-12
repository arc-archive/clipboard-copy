/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/

/**
 * An element that copies a text to clipboard.
 *
 * ### Example
 *
 * ```html
 * <clipboard-copy content="test"></clipboard-copy>
 * <script>
 * const elm = document.querySelector('clipboard-copy');
 * if(elm.copy()) {
 *  console.info('Content has been copied to the clipboard');
 * } else {
 *  console.error('Content copy error. This browser is ancient!');
 * }
 * < /script>
 * ```
 * 
 * @fires content-copied Fired when the content has been copied to the clipboard.
 * @fires content-copy-error Fired when there was an error copying content to clipboard.
 * @fires content-copy Fired when executing copy function.
 */
export declare class ClipboardCopyElement extends HTMLElement {
  static get observedAttributes(): string[];

  /**
   * A content to be copied to the clipboard.
   * It must be set before calling the `copy` function.
   *
   * @attribute
   */
  content: string;

  /**
   * Execute content copy.
   *
   * @returns True when the content has been copied to the clipboard
   * and false when there was an error.
   */
  copy(): boolean;

  /**
   * Sends the `content-copy` event.
   * When the event is canceled then the logic from this element won't be
   * executed. Useful when current platform doesn't support `execCommand('copy')`
   * and has other way to manage clipboard.
   *
   * @returns True when handler executed copy function.
   */
  _beforeCopy(): boolean;

  /**
   * Sends the `content-copied` event that is not bubbling.
   */
  _notifyCopied(): boolean;
}
