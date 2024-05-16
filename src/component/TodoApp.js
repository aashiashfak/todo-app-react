import React, {Component} from "react";
import "./TodoApp.css";

class TodoApp extends Component {
  state = {
    input: "",
    items: [],
    editingIndex: null, // Index of the item being edited
    editedValue: "", // Value of the item being edited
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const {input} = this.state;

    if (input.trim() !== "") {
      this.setState({
        items: [...this.state.items, input],
        input: "",
      });
    }

    console.log(this.state.items);
  };

  deleteData = (key) => {
    this.setState({
      items: this.state.items.filter((data, index) => index !== key),
    });
    console.log(this.state.items);
  };

  editItem = (index) => {
    const {items} = this.state;
    const edited = items[index]; // Get the value of the item being edited

    this.setState({
      editingIndex: index,
      editedValue:edited,
    });
  };

  cancelEdit = () => {
    this.setState({
      editingIndex: null, // Reset editing state
      editedValue: "", // Reset edited value
    });
  };

  updateItem = () => {
    const {items, editingIndex, editedValue} = this.state;

    // Replace the old value with the edited value
    items[editingIndex] = editedValue;

    this.setState({
      items,
      editingIndex: null, // Reset editing state
      editedValue: "", // Reset edited value
    });
  };

  render() {
    const {input, items, editingIndex, editedValue} = this.state;
    return (
      <form>
        <div className="todo-container">
          <h1>Todo App</h1>
          <div className="input-section">
            <input
              type="text"
              value={input}
              onChange={this.handleChange}
              placeholder="Enter Items..."
            />
            <button onClick={this.storeItems}>Add</button>
          </div>
        </div>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editingIndex === index ? ( // Render input field if editing
                <>
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) =>
                      this.setState({editedValue: e.target.value})
                    }
                  />
                  <div>
                    <button onClick={this.cancelEdit}>Cancel</button>
                    <button onClick={this.updateItem}>Update</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{data}</span>
                  <div>
                    <i
                      onClick={() => this.deleteData(index)}
                      id="delete-icon"
                      className="fa-solid fa-trash-can"
                    ></i>
                    <i
                      onClick={() => this.editItem(index)}
                      id="edit-icon"
                      className="fa-solid fa-pen-to-square"
                    ></i>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default TodoApp;
