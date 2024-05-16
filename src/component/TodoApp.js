import React, {Component} from "react";
import "./TodoApp.css";

class TodoApp extends Component {
  state = {
    input: "",
    items: [],
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const {input} = this.state;

    this.setState({
      items: [...this.state.items, input],
      input: "",
    });
    console.log(this.state.items);
  };

  deleteData = (key)=>{
    this.setState({
      items:this.state.items.filter((data,index)=> index!== key)
    })
    console.log(this.state.items)
  }

  render() {
    const {input, items} = this.state;
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
              {data}
              <div>
                <i
                  onClick={() => this.deleteData(index)}
                  id="delete-icon"
                  className="fa-solid fa-trash-can"
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

export default TodoApp;
