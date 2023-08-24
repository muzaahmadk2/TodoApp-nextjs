import TodoList from "@/components/todos/todoList";
import { Fragment } from "react";
import { MongoClient } from "mongodb";
import { useSelector,useDispatch } from "react-redux";
import { TodoAction } from "@/components/store/Todo-Slice";


function HomePage(props) {
  
  const todoList = props.todos;
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

export async function getStaticProps() {
  //fetching data from api

  const client = await MongoClient.connect(
    "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();
  
  
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
