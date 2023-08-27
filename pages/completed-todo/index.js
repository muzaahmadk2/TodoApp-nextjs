import CompletedTodoList from "@/components/todos/CompletedTodoList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";

function CompletedTodo(props) {
  const todoList = props.todos;
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

export async function getStaticProps() {
  //fetching data from api

  const client = await MongoClient.connect(
    "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/todos?retryWrites=true&w=majority"
  );
  const db = client.db();

  const completedTodosCollection = db.collection("todos");

  const todos = await completedTodosCollection.find({status:'completed'}).toArray();
  
  
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
export default CompletedTodo;
