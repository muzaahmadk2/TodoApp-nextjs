import classes from './MainNavigation.module.css';
import Link from 'next/link';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Todo App</div>
      <div className={classes.input}><input type='text' placeholder='Search'></input></div>
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
