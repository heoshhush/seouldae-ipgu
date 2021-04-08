import React from 'react';
import Styles from './user.module.css'

const User = ({firebaseAuth}) => {
    const logout = () => {
        firebaseAuth.logout();
    }

    return(
        <section>
            <button className={`${Styles.logoutBtn}`} onClick={logout}>로그아웃</button>
            <button className={`${Styles.btn1}`}>Button1</button>
            <button className={`${Styles.btn2}`}>Button2</button>
        </section>
    )

}

export default User;