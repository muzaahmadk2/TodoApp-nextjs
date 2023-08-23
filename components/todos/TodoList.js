import classes from "./todoList.module.css";
import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <ul className={classes.list}>
      {props.todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          date={todo.date}
        />
      ))}
    </ul> 
  );
}
export default TodoList;