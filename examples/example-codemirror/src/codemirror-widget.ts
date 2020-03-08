/* tslint:disable */ 
import 'es6-promise/auto';  // polyfill Promise on IE

import {
  Message
} from '@lumino/messaging';

import {
  Widget
} from '@lumino/widgets';

import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/addon/display/panel.js";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/javascript-lint.js";
import "codemirror/addon/lint/lint.css";
import '../style/index.css';

//import './index.css';

//import "tslint";
//globalThis.JSHINT = JSHINT;

/**
 * A widget which hosts a CodeMirror editor.
 */
export class CodeMirrorWidget extends Widget {

  constructor(config?: CodeMirror.EditorConfiguration) {
    super();
    this.addClass('CodeMirrorWidget');

    let div = document.createElement('div');
    div.setAttribute("style","padding:4px");
    this.node.appendChild(div);

    let selectElt = document.createElement('select');
    selectElt.setAttribute("id","flow-sample-select");
    selectElt.setAttribute("class","flow-select");

    div.appendChild(selectElt);

    let opt = document.createElement('option');
    opt.value = "Option 1";
    opt.text = "Option 1";
    selectElt.add(opt);

    let separator = document.createElement('div');
    separator.setAttribute("class","separator");
    this.node.appendChild(separator);

    let content = document.createElement('div');
    content.setAttribute("id","editor-pane");
    content.setAttribute("class","content-pane");
    this.node.appendChild(content);
    
    this._editor = CodeMirror(content, config);
  }

  get editor(): CodeMirror.Editor {
    return this._editor;
  }

  loadTarget(target: string): void {
    var doc = this._editor.getDoc();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', target);
    xhr.onreadystatechange = () => doc.setValue(xhr.responseText);
    xhr.send();
  }

  protected onAfterAttach(msg: Message): void {
    this._editor.refresh();
  }

  protected onResize(msg: Widget.ResizeMessage): void {
    if (msg.width < 0 || msg.height < 0) {
      this._editor.refresh();
    } else {
      this._editor.setSize(msg.width, msg.height);
    }
  }

  private _editor: CodeMirror.Editor;
}