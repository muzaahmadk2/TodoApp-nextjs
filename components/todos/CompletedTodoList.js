import CompletedTodoItem from './CompletedTodoItem';
import classes from './CompletedTodoList.module.css';

function CompletedTodoList(props){
    return (
        <ul className={classes.list}>
          {props.todos.map((todo) => (
            <CompletedTodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              date={todo.date}
            />
          ))}
        </ul>
)}

export default CompletedTodoList;