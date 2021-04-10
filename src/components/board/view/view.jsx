import React, { useImperativeHandle } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Styles from './view.module.css'

const View = ({card, database, loadCards, userId}) => {
    const history = useHistory();
    const onClickDelete = () => {
        database.deleteCard('board', card);
        history.push({
            pathname: '/board',
            state: {
                id: card.userId,
                displayName: card.nickname
            }
        })
        loadCards();
    }

    const onClickEditBtn = () => {
        history.push({
            pathname:'/board/edit',
            state: {
                id: card.id,
                userId: card.userId,
                nickname: card.nickname,
                title: card.title,
                text: card.text,
                imgName: card.imgName,
                imgURL: card.imgURL,
                date: card.date
            }
        })
    }

    return(
                <div className={Styles.view}>
                    <div className={Styles.title}>{card.title}</div>
                    <div className={Styles.nickname}>{card.nickname}</div>
                    <div className={Styles.date}>{card.date}</div>
                    <div className={Styles.text}>{card.text}</div>
                    
                    {userId === card.userId && 
                    <div className={Styles.btns}>
                        <button onClick={onClickEditBtn} className={Styles.editBtn}>수정</button>
                        <button onClick={onClickDelete} className={Styles.deleteBtn}>삭제</button>
                    </div>}
                </div>
                
                
    )
}

export default View;