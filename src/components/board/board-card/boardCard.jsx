import React from 'react';
import Styles from './boardCard.module.css';

const BoardCard = ({ card, userId, cardKeys, updateViews, addViews }) => {
    
    const onClickCard = () => {
        console.log(card.whoViews)
        addViews(card, userId)
        updateViews(card)
    }

    const toCalCardNum = [...cardKeys].reverse();

    console.log(cardKeys)
    console.log(toCalCardNum)

    
    return(
        <div onClick={onClickCard} className={Styles.boardCard}>
            <div className={Styles.cardNum}>{cardKeys.indexOf(String(card.id)) +1 }</div>
            <div className={Styles.cardTitle}>{card.title}</div>
            <div className={Styles.userNickname}>{card.nickname}</div>
            <div className={Styles.cardDate}>{card.date}</div>
            <div className={Styles.viewNum}>{card.views}</div>
            <div className={Styles.stars}>{card.star}</div>
        </div>
    )
}

export default BoardCard;