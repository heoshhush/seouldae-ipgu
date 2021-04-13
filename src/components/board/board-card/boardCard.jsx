import React from 'react';
import Styles from './boardCard.module.css';

const BoardCard = ({ card, userId, updateViews, addViews }) => {
    
    const onClickCard = () => {
        console.log(card.whoViews)
        addViews(card, userId)
        updateViews(card)
    }
    
    return(
        <div onClick={onClickCard} className={Styles.boardCard}>
            <div className={Styles.cardNum}>{card.cardNum}</div>
            <div className={Styles.cardTitle}>{card.title}</div>
            <div className={Styles.userNickname}>{card.nickname}</div>
            <div className={Styles.cardDate}>{card.date}</div>
            <div className={Styles.viewNum}>{card.views}</div>
            <div className={Styles.stars}>{card.star}</div>
        </div>
    )
}

export default BoardCard;