import React from "react";
import { Button } from "antd";
import Hello from "../Hello/Hello";
import styles from "./Layout.module.css";
import Routes from '../../routes';
import { Link } from 'react-router-dom';


export default function Layout(props) {
  return (
    <div className={styles.wrapper}>
      <Hello name="TRAVELER" />
      {!props.isLoggedIn && (
        <>
        <div className={styles.logInWrapper}>   
          <Link to='/login'><Button className={styles.logInButton}>Log in</Button></Link>
          <Link to='/signup'><Button className={styles.logInButton}>Sign up</Button></Link>
        </div>
        <Routes />
        </>
      )}
      {props.isLoggedIn && (
        <>
        <div className={styles.logInWrapper}>
          <Link to='/'><Button onClick={() => { localStorage.clear(); window.location.reload() }} className={styles.logInButton}>Log out</Button></Link>
        </div>
        <Routes />
        </>
      )}
      {props.children}
    </div>
  );
}
