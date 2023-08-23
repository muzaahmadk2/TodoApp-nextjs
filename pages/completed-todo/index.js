import CompletedTodoList from "@/components/todos/CompletedTodoList";
import { useSelector } from "react-redux";
import { Fragment } from "react";

function CompletedTodo() {
  const todoList = useSelector((state) => state.todo.completedList);
  const length = todoList.length;

  return (
    <Fragment>
      {length === 0 ? (
        <h1>No Completed List to Show..!</h1>
      ) : (
        <CompletedTodoList todos={todoList} />
      )}
    </Fragment>
  );
}

export default CompletedTodo;
