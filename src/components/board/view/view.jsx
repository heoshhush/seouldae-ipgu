import React, { useImperativeHandle, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Styles from './view.module.css'

const View = ({card, database, loadCards, userId}) => {
    const [clickStar, setClickStar] = useState(false)
    const [star, setStar] = useState(card.star)
    console.log(`first Star:${star}`)
    
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

    const nowStar = clickStar === true ? Styles.starClicked : '';

    const onClickStar = () => {
        if(!clickStar){
            setClickStar(true)
            console.log(`${clickStar} +1 to ${star}`)
            setStar(star + 1)
            database.setStars(card, star);
        }
        else if (clickStar){
            setClickStar(false)
            console.log(`${clickStar} -1 to ${star}`)
            setStar(star - 1)
            database.setStars(card,star);
        }
        setClickStar(!clickStar)
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