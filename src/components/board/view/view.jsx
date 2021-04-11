import React, { useImperativeHandle, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './view.module.css'

const View = ({card, database, loadCards, userId}) => {
    const [whoClicked, setWhoClicked] = useState(card.whoClicked)
    const [clickStar, setClickStar] = useState(Object.keys(whoClicked).includes(userId) === true ? true : false)
    const [star, setStar] = useState(card.star)
    
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

    

    const onClickStar = () => {
        if(!clickStar){
            addWhoClicked();
            updateStars();
            setClickStar(true);
        } else if (clickStar){
            removeWhoClicked();
            updateStars();
            setClickStar(false)
        }
    }

    const addWhoClicked = () => {
        setWhoClicked(whoClicked => {
            const nowClicked = {...whoClicked};
            nowClicked[userId] = userId;
            return nowClicked;
        })
        database.whoClickedStars(card, userId)
    }


    const updateStars = () => {
        setStar(star => {
            database.loadCard(`board/${card.id}/whoClicked`, 
            (value) => {
                database.setStars(card, Object.keys(value).length)
                return Object.keys(value).length
                
            })
        }) 
    }

    const removeWhoClicked = () => {
        setWhoClicked(whoClicked => {
            const nowClicked = {...whoClicked};
            delete nowClicked[userId];
            return(nowClicked);
        })
        database.removeWhoClickedStars(card, userId);
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
                date: card.date,
                star: card.star
            }
        })
    }

    const nowStar = clickStar === true ? Styles.starClicked : '';


    return(
                <div className={Styles.view}>
                    <div className={Styles.title}>{card.title}</div>
                    <div className={Styles.nickname}>{card.nickname}</div>
                    <div className={Styles.date}>{card.date}</div>
                    <div className={Styles.text}>{card.text}</div>
                    
                    <div >
                        <button
                        onClick={onClickStar}
                        className={`${Styles.star} ${nowStar}`}
                        >추천</button>
                    </div>
                    {userId === card.userId && 
                    <div className={Styles.btns}>
                        <button onClick={onClickEditBtn} className={Styles.editBtn}>수정</button>
                        <button onClick={onClickDelete} className={Styles.deleteBtn}>삭제</button>
                    </div>}
                </div>
                
                
    )
}

export default View;