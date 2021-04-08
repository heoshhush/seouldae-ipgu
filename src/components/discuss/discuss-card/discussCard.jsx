import React from 'react';
import Styles from './discussCard.module.css';

const DiscussCard = ({ card, loadCard, discussDatabase, userId }) => {
    const deleteCard = () => {
        discussDatabase.deleteCard(card);
        loadCard()
    }


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
                {userId === card.userId && <button onClick={deleteCard} className={Styles.deleteBtn}>
                    <i className={`far fa-trash-alt ${Styles.deleteIcon}`}></i>
                </button>}
                
            </div>
            <div className={Styles.cardText}>
                {card.text}
            </div>
            

        </div>
    )
}

export default DiscussCard;