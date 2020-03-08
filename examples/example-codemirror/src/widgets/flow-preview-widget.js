import G6 from '@antv/g6';
//import './widget.css';

const data = {
  nodes: [
    {
      id: '1',
      dataType: 'alps',
      name: 'alps_file1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '2',
      dataType: 'alps',
      name: 'alps_file2',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '3',
      dataType: 'alps',
      name: 'alps_file3',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '4',
      dataType: 'sql',
      name: 'sql_file1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '5',
      dataType: 'sql',
      name: 'sql_file2',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '6',
      dataType: 'feature_etl',
      name: 'feature_etl_1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '7',
      dataType: 'feature_etl',
      name: 'feature_etl_1',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
    {
      id: '8',
      dataType: 'feature_extractor',
      name: 'feature_extractor',
      conf: [
        {
          label: 'conf',
          value: 'pai_graph.conf',
        },
        {
          label: 'dot',
          value: 'pai_graph.dot',
        },
        {
          label: 'init',
          value: 'init.rc',
        },
      ],
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
    },
    {
      source: '1',
      target: '3',
    },
    {
      source: '2',
      target: '4',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '6',
      target: '7',
    },
    {
      source: '6',
      target: '8',
    },
  ],
};

G6.registerNode(
  'sql',
  {
    drawShape(cfg, group) {
      const rect = group.addShape('rect', {
        attrs: {
          x: -75,
          y: -25,
          width: 150,
          height: 50,
          radius: 10,
          stroke: '#5B8FF9',
          fill: '#C6E5FF',
          lineWidth: 3,
        },
        name: 'rect-shape',
      });
      if (cfg.name) {
        group.addShape('text', {
          attrs: {
            text: cfg.name,
            x: 0,
            y: 0,
            fill: '#00287E',
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
            fontWeight: 'bold',
          },
          name: 'text-shape',
        });
      }
      return rect;
    },
  },
  'single-node',
);
G6.Global.nodeStateStyle.selected = {
  stroke: '#d9d9d9',
  fill: '#5394ef',
};

/* tslint:disable */ 
import 'es6-promise/auto';  // polyfill Promise on IE

import {
  Message
} from '@lumino/messaging';

import {
 Widget
} from '@lumino/widgets';

export class FlowPreviewWidget extends Widget {

  constructor() {
    super();
    this.addClass('CodeMirrorWidget');
    this.title.label = "G6 Graph";
    this.title.closable = true;
    this.title.caption = `Long description for:G6 Graph`;

    let div = document.createElement('div'); 
    div.setAttribute("style","padding:4px;background-color: #dfdfdf;");
    this.node.appendChild(div);

    this.selectElt = document.createElement('select');
    this.selectElt.setAttribute("id","flow-dagram-select");
    this.selectElt.setAttribute("class","flow-select");
    div.appendChild(this.selectElt);
    
    let opt = document.createElement('option');
    opt.value = "Option 1";
    opt.text = "Option 1";
    selectElt.add(opt);
    
    let separator = document.createElement('div');
    separator.setAttribute("class","separator");   
    this.node.appendChild(separator);

    let content = document.createElement('div');
    content.setAttribute("id","preview-pane");
    content.setAttribute("class","content-pane");
    this.node.appendChild(content);

    this.graph = new G6.Graph({
        container: content,
        width: 500,//this.node.scrollWidth ,
        height: 500,//this.node.scrollHeight,
        layout: {
            type: 'dagre',
            nodesepFunc: d => {
            if (d.id === '3') {
                return 500;
            }
            return 50;
            },
            ranksep: 70,
        },
        defaultNode: {
            type: 'sql',
        },
        defaultEdge: {
            type: 'polyline',
            style: {
            radius: 20,
            offset: 45,
            endArrow: true,
            lineWidth: 2,
            stroke: '#C2C8D5',
            },
        },
        modes: {
            default: [
            'drag-canvas',
            'zoom-canvas',
            'click-select',
            {
                type: 'tooltip',
                formatText(model) {
                const cfg = model.conf;
                const text = [];
                cfg.forEach(row => {
                    text.push(row.label + ':' + row.value + '<br>');
                });
                return text.join('\n');
                },
                shouldUpdate: e => {
                // 如果移动到节点文本上显示，不是文本上不显示
                if (e.target.type !== 'text') {
                    return false;
                }
                return true;
                },
            },
            ],
        },
        fitView: true
    });
    this.graph.data(data);
  }

  onAfterAttach(msg) {
    this.graph.changeSize(this.node.scrollWidth, this.node.scrollHeight); 
    
    this.graph.render();
    this.graph.zoom(this.node.scrollWidth/this.graph.cfg.width);
    //this.graph.fitView(10);
    this.graph.translate(this.node.scrollWidth/2, 0);
    
  }

  onResize(msg) {
    if (msg.width < 0 || msg.height < 0) {
      this.graph.refresh();
    } else {
      this.graph.changeSize(msg.width, msg.height);
    }
  }
}

