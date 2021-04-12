import React, { useImperativeHandle, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './view.module.css'

const View = ({card, database, loadCards, userId}) => {
    const [whoClicked, setWhoClicked] = useState(card.whoClicked)
    
    const getClickStar = () => {
        if(!whoClicked){
            return false;
        } else if(whoClicked){
            if(Object.keys(whoClicked).includes(userId)){
                return true;
            } else if(!Object.keys(whoClicked).includes(userId))
                return false;
        }
    }

    const [clickStar, setClickStar] = useState(getClickStar())

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
                if(value){
                    database.setStars(card, Object.keys(value).length)
                    return Object.keys(value).length
                } else if (!value){
                    database.setStars(card, 0);
                    return 0;
                }
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
        database.loadCard(`board/${card.id}`,
            (value) => {
                history.push({
                    pathname:'/board/edit',
                    state: {
                        id: value.id,
                        userId: value.userId,
                        nickname: value.nickname,
                        title: value.title,
                        text: value.text,
                        imgName: value.imgName,
                        imgURL: value.imgURL,
                        date: value.date,
                        star: value.star,
                        whoClicked: value.whoClicked
                    }
                })
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