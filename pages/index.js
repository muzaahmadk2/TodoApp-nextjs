import TodoList from "@/components/todos/todoList";
import { Fragment, useState } from "react";
import { MongoClient } from "mongodb";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TodoForm from "@/components/todos/TodoForm";
import { useSelector, useDispatch } from "react-redux";
import { TodoAction } from "@/components/store/Todo-Slice";
import Notification from "@/components/ui/Notification";
import { uiAction } from "@/components/store/ui-slice";

function HomePage(props) {
  const [todoList, setTodoList] = useState(props.todos);
  const isMode = useSelector((state) => state.todo.newTodoMode);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  function changeModeHandler() {
    dispatch(TodoAction.changeMode());
  }

  async function addTodoHandler(newTodoData) {
    dispatch(
      uiAction.showNotification({
        status: "adding",
        title: "Adding....!",
        message: "Adding Todo Data..!",
      })
    );
    const response = await fetch("api/new-todo", {
      method: "POST",
      body: JSON.stringify(newTodoData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Update the state with the new todo data
      setTodoList((prevTodoList) => [...prevTodoList, data.data]);
    }

    console.log(data.message);

    dispatch(
      uiAction.showNotification({
        status: "success",
        title: "Success....!",
        message: "Todo data addedd Successfully..!",
      })
    );

    setTimeout(() => {
      dispatch(uiAction.disbleNotification());
    }, 2000);

    dispatch(TodoAction.changeMode());
    
  }

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {todoList.length === 0 ? (
        <h1>No Todo List to Show..!</h1>
      ) : (
        <TodoList todos={todoList} />
      )}
      {isMode === false ? (
        <Button
          size="small"
          startIcon={<AddIcon />}
          style={{ color: "#c43a28" }}
          onClick={changeModeHandler}
        >
          New Todo
        </Button>
      ) : (
        <div>
          <TodoForm onAddTodo={addTodoHandler}/>{" "}
          <Button
            onClick={changeModeHandler}
            startIcon={<CloseIcon fontSize="small" />}
            style={{ color: "#c43a28", marginLeft: "34.5rem" }}
          >
            Close
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export async function getStaticProps() {
  //fetching data from api

  const client = await MongoClient.connect(
    "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find({status: 'incomplete'}).toArray();

  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        title: todo.title,
        date: todo.date,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
