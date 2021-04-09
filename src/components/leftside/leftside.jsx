import React from 'react';
import Styles from './leftside.module.css'

const Leftside = ({firebaseAuth, userId, displayName}) =>{
    return(
        <div className={Styles.leftSide}>
            <div className={Styles.titleAndBtn}>
                <div className={Styles.title}>hello ! {displayName}</div>
                <button className={Styles.cancelBtn}>
                    <i className={`fas fa-times ${Styles.cancelIcon}`}></i>
                </button>
            </div>
            <div className={Styles.profileImg}>profileImg</div>
            <div className={Styles.nickName}>nickName</div>
            <div className={Styles.weather}>weather</div>

        </div>
    )
}
export default Leftside;