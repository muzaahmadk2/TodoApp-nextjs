import TodoForm from "@/components/todos/TodoForm";

function NewTodo() {

  async function addTodoHandler(newTodoData) {
    const response = await fetch("api/new-todo", {
      method: "POST",
      body: JSON.stringify(newTodoData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("newtodopage",data);
  }

  return <TodoForm onAddTodo={addTodoHandler}/>;
}
export default NewTodo;
