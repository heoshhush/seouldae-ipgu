import React from 'react';
import { useHistory } from 'react-router';
import Styles from './boardCard.module.css';

const BoardCard = ({ card, userId, updateViews, addViews, onClickCard }) => {
    const history = useHistory();
    const URL = `/board/view&id=${card.id}`
    const onClick = () => {
        console.log(card.whoViews)
        addViews(card, userId)
        updateViews(card)
        onClickCard(URL, history, card)
    }
    
    const commentNum = card.comment ? Object.keys(card.comment).length : 0;
    
    return(
        <div onClick={onClick} className={Styles.boardCard}>
            <div className={Styles.cardNum}>{card.cardNum}</div>
            <div className={Styles.cardTitle}>{card.title}
                <span className={Styles.commentNum}>[{commentNum}]</span>
            </div>
            <div className={Styles.userNickname}>{card.nickname}</div>
            <div className={Styles.cardDate}>{card.date}</div>
            <div className={Styles.viewNum}>{card.views}</div>
            <div className={Styles.stars}>{card.star}</div>
        </div>
    )
}

export default BoardCard;