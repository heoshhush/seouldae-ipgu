import React from 'react';
import Styles from './discussCard.module.css';

const DiscussCard = ({ card }) => {
    return(
        <div className={Styles.discussCard}>
            <div className={Styles.cardInfo}>
                <div className={Styles.userInfo}>
                    <i className={`far fa-user ${Styles.userIcon}`}></i>
                        익명
                </div>
                <div className={Styles.cardDate}>
                    {card.date}
                </div>
                
            </div>
            <div className={Styles.cardText}>
                {card.text}
            </div>
            

        </div>
    )
}

export default DiscussCard;