import React from 'react';
import {useSelector} from 'react-redux';
import styles from './Navbar.module.css';
import {Link} from 'react-router-dom'

export default function Navbar() {
  const userData = useSelector((state) => state.userData);
  return (
    <header className={styles.navbar}>
       <Link to="/">
           <span className={styles.navbarTitle}>Edvora</span>
        </Link>
        <div className={styles.navbarUser}>
            <div className={styles.navbarUserName}>
                {userData.name}
            </div>
            <img src="https://picsum.photos/200" alt="" />
        </div>
    </header>
  )
}
