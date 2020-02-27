import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import NestedTable from './NestedTable'
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      headerConfig : [
        { name:'Row' },
        { name:'repo_name', field:"name" },
        { name:'languages_name', field:"languageName" },
        { name:'languages_bytes', field:"languageByte" }
      ],
      tableData :[
        {name:"repo1",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
        {name:"repo2",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
         {name:"repo3",
          languages: [
            { name:"Batchfile", byte:"1071" }
          ]
        },
        {name:"repo4",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
        {name:"repo5",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
         {name:"repo6",
          languages: [
            { name:"Batchfile", byte:"1071" }
          ]
        },
        {name:"repo7",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
        {name:"repo8",
          languages: [
            { name:"Batchfile", byte:"1071" },
            { name:"Protocol buffer", byte:"4990" },
            { name:"Python", byte:"43245" }
          ]
        },
         {name:"repo9",
          languages: [
            { name:"Batchfile", byte:"1071" }
          ]
        }
      ]
    };
  }

  render() {
    return (
      <NestedTable headerConfig={this.state.headerConfig} tableData={this.state.tableData}
       pagination={true} recordCount={2} sort={true}></NestedTable>
    );
  }
}

render(<App />, document.getElementById('root'));
