
import React, { PropTypes } from 'react';  // PropTypes start with CAP 

var TodoItem = React.createClass({  // these are the properties for each todo
  propTypes: {  // lowercase propTypes; this.props accesses anything in propTypes
    data: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool
    })  
  },
  render: function(){  // React puts event handlers in with the HTML; the checked={todo.completed} helps with checkboxes
    var todo = this.props.data;
    return ( // React needs one containing-div; use single curly brackets rather than double; use className instead of class
      <div>  
        <div className="col-sm-1">
          <input className="completed-checkbox" type="checkbox" checked={todo.completed} onChange={this.handleComplete}></input>
        </div>
        <div className="col-sm-10 title" onClick={this.titleClick}>{todo.title}</div>
        <div className="col-sm-10 title-edit hidden">
          <input type="text" className="form-control title-edit-input" value="{todo.title}" onKeypress={this.editKeypress}></input>
        </div>
        <div className="col-sm-1"> 
          <button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  },
  handleComplete: function(){},
  handleClose: function(){},
  titleClick: function(){},
  editKeypress: function(){}
});





module.exports = TodoItem;


// in React, usually put parens around 'return statement' == return ( return statement);

