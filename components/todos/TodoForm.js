import Card from "../ui/Card";
import classes from "./TodoForm.module.css";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch,useSelector } from "react-redux";
import { TodoAction } from "../store/Todo-Slice";
import { parse } from 'date-fns';

function TodoForm(props) {
  const isEditMode = useSelector(state => state.todo.editMode);
  const editList = useSelector(state => state.todo.editList);
  const titleInputRef = useRef();
  const dateFormat = 'EEE, MMM d, yyyy';
  const [selectedDate, setSelectedDate] = useState(isEditMode === true ? parse(editList.date, dateFormat, new Date()) : null);
  const dispatch = useDispatch();
  
  

  function handleDateHandler(date) {
    setSelectedDate(date);
  }
  function handleDateToday() {
    setSelectedDate(new Date());
  }
  function handleDateTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;

    const todoData = {
      title: enteredTitle,
      status:'incomplete',
      date: selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    props.onAddTodo(todoData);
    titleInputRef.current.value = '';
    setSelectedDate(null);
    dispatch(TodoAction.editModeChange());
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Todo Title</label>
          <input type="text" required id="title" ref={titleInputRef} defaultValue={isEditMode ===true ? editList.title : ''} />
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Date</label>
          <button type="button" onClick={handleDateToday}>
            Today
          </button>
          <button type="button" onClick={handleDateTomorrow}>
            Tomorrow
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateHandler}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
        </div>
        <div className={classes.actions}>
          <button>Add Todo List</button>
        </div>
      </form>
    </Card>
  );
}
export default TodoForm;
