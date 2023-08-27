import TodoForm from "@/components/todos/TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "@/components/store/ui-slice";
import { Fragment } from "react";
import Notification from "@/components/ui/Notification";

function NewTodo() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

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

    console.log(data);

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
      <TodoForm onAddTodo={addTodoHandler} />
    </Fragment>
  );
}
export default NewTodo;
