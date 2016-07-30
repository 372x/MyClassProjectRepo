
import todoModel from 'pages/todoReact/todoModel';  // 'todoModel' is the folder name

var dispatcher = {  // has no render function because it's only a dispatcher
	// init: function(){},
  clickComplete: function(id){ // informs model to update something
    todoModel.itemCompleted(id);
  },
  addTodo: function(title){
    if (
      title !== ''
      && typeof title === 'string'
    ) {
    todoModel.addItem(title);
    }
    // new starting here:
    if (   
      event.which === 13
      && typeof title === 'string'
      && title.length > 0
    ) {
    todoModel.addItem(title);
    }  // end of new stuff

    if (
      title !== ''
      && typeof title === 'string'
      || event.which === 13
    ) {
    todoModel.addItem(title);
    } 
  },
  removeTodo: function(id){
    todoModel.removeItem(id);
  },
  editTodoTitle: function(id, title, event){
    if ( 
      event.which === 13
      && typeof title === 'string'
      && title.length > 0
    ) {
      todoModel.editTitle(id, title);
    } else if (
      event.which === 27
      )
      return false;
    }  
  },
  startEditMode: function(id){
    todoModel.startEditing(id);
  }
};

module.exports = dispatcher;
