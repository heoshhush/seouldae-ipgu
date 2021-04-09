import React from 'react';
import Styles from './view.module.css'
import { Route } from 'react-router';

const View = ({card}) => {
    return(
                <div className={Styles.view}>
                    <div className={Styles.title}>{card.title}</div>
                    <div className={Styles.nickname}>{card.nickname}</div>
                    <div className={Styles.text}>{card.text}</div>
                    
                        
                </div>      
    )
}

export default View;