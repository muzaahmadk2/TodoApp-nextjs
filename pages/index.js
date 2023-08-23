import TodoList from "@/components/todos/todoList";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const todoList = useSelector((state) => state.todo.todoList);
  const length = todoList.length;

  return (
    <Fragment>
      {length === 0 ? (
        <h1>No Todo List to Show..!</h1>
      ) : (
        <TodoList todos={todoList} />
      )}
    </Fragment>
  );
}

export default HomePage;
