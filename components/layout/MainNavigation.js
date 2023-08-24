import classes from './MainNavigation.module.css';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Todo App</div>
      <div className={classes.input}><SearchIcon  /><TextField size="small" id="outlined-basic" label="Search" variant="outlined" /></div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Todo List</Link>
          </li>
          <li>
            <Link href='/new-todo'>Add New Todo List</Link>
          </li>
          <li>
            <Link href='/completed-todo'>Completed Todo List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
