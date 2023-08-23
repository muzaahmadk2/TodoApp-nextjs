import { useState } from 'react';
import classes from './TodoItem.module.css';
import { useDispatch } from 'react-redux';
import { TodoAction } from '../store/Todo-Slice';

function TodoItem(props){
    const dispatch = useDispatch();

    const handleCheck = (item) => {
        console.log(item)
        dispatch(TodoAction.completeList(item));
    }
    
    return <li className={classes.item}>
        <div className={classes.toggle}>
            <input type="checkbox"  onChange={()=>handleCheck(props)}/>
        </div>
        <div className={classes.content1}>
            <h3>{props.title}</h3>
            
        </div>
        <div className={classes.content2}> 
        <h3>{props.date}</h3>
        </div>
        <div className={classes.action}>
            <button className={classes.delete}  onClick={()=> dispatch(TodoAction.removeList(props.id))}>Delete</button>
            <button className={classes.edit}>Edit</button>
        </div>
    </li>
}
export default TodoItem;