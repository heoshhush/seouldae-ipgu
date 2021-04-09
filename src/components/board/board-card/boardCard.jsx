import React from 'react';
import Styles from './boardCard.module.css';

const BoardCard = ({ card, cardKeys }) => {
    return(
        <div className={Styles.boardCard}>
            <div className={Styles.cardNum}>{cardKeys.indexOf(String(card.id)) +1 }</div>
            <div className={Styles.cardTitle}>{card.title}</div>
            <div className={Styles.userNickname}>{card.nickname}</div>
            <div className={Styles.viewNum}>1</div>
            <div className={Styles.stars}>1</div>
        </div>
    )
}

export default BoardCard;