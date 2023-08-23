import classes from './CompletedTodoItem.module.css';

function CompletedTodoItem(props){
    return <li className={classes.item}>
        <div className={classes.toggle}>
            <input type="checkbox"  disabled checked='true' onChange={()=>handleCheck(props)}/>
        </div>
        <div className={classes.content1}>
            <h3>{props.title}</h3>
            
        </div>
        <div className={classes.content2}> 
        <h3>{props.date}</h3>
        </div>
    </li>
}
export default CompletedTodoItem;