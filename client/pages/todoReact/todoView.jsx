
var $ = require('jquery');
import React, { PropTypes } from 'react';  // PropTypes start with CAP 

var TodoItem = React.createClass({  // these are the properties for each todo
  propTypes: {  // lowercase propTypes; this.props accesses anything in propTypes
    data: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool
    }),
    controller: PropTypes.object
  },
  render: function(){  // React puts event handlers in with the HTML; the checked={todo.completed} helps with checkboxes
    var todo = this.props.data;

    var title = <div className="col-sm-10 title" onClick={this.titleClick}>{todo.title}</div>;
    if (todo.isEditing) {
      title = (
        <div className="col-sm-10 title-edit">
          <input type="text" className="form-control" defaultValue={todo.title} onChange={function(){}} onKeyPress={this.editKeypress}></input>
        </div>
      );
    }
    return ( // React needs one containing-div; use single curly brackets rather than double; use className instead of class
      <div>  
        <div className="col-sm-1">
          <input type="checkbox" checked={todo.completed} onChange={this.handleComplete}></input>
        </div>
        {title}
        <div className="col-sm-1"> 
          <button type="button" aria-label="Close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  },
  handleComplete: function(){
    var id = this.props.data.id;
    var newValue = !this.props.data.completed;
    this.props.controller.model.itemCompleted(id, newValue);
  },
  handleClose: function(){
    var id = this.props.data.id;
    this.props.controller.model.removeItem(id);
  },
  titleClick: function(){
    var id = this.props.data.id;
    this.props.controller.model.startEditing(id);  // this says 'hey model' and skips controller
  },
  editKeypress: function(event){
    if ( event.which === 13 ){
      var id = this.props.data.id;
      var newTitle = $('li').eq(id).find('input[type="text"]').val();
      this.props.controller.model.editTitle(newTitle, id);
    }
  }
});

module.exports = TodoItem;

// in React, usually put parens around 'return statement' == return ( return statement);
