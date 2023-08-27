import classes from "./TodoItem.module.css";
import { useDispatch } from "react-redux";
import { TodoAction } from "../store/Todo-Slice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment,useState } from "react";

function TodoItem(props) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function deleteTodoHandler(todoId) {
    const response = await fetch("api/new-todo", {
      method: "DELETE",
      body: JSON.stringify(todoId),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    setDeleted(true);
  }

  const handleCheck = async (item) => {
    const updateTodoData = {
      id: item.id, // The unique identifier of the document you want to update
      status: "completed", // The new title you want to set
        // Add other fields you want to update here
      
    };
    
    const response = await fetch('/api/new-todo', {
      method: "PUT",
      body: JSON.stringify(updateTodoData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    console.log(data);
    
    setIsCompleted(true);
  };

  return (
    <Fragment>
      {isCompleted || deleted ? null : (
        <li className={classes.item}>
          <div className={classes.toggle}>
            <input type="checkbox" onChange={() => handleCheck(props)} />
          </div>
          <div className={classes.content1}>
            <h3>{props.title}</h3>
          </div>
          <div className={classes.content2}>
            <h3>{props.date}</h3>
          </div>
          <div className={classes.action}>
            <button
              className={classes.delete}
              onClick={() => deleteTodoHandler(props.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>
            <button className={classes.edit}>
              <EditIcon fontSize="small" />
            </button>
          </div>
        </li>
      )}
    </Fragment>
  );
}
export default TodoItem;
