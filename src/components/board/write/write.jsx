import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './write.module.css'

const Write = ({ writeCards, userId, displayName, cardsLength, loadCards}) => {
    const titleRef = useRef();
    const textRef = useRef();
    const history = useHistory();
    const historyState = history.location.state;

    const onClickAdd = () => {
        const date = new Date();
        const writeCard = {
            id: Date.now(),
            cardNum: parseInt(cardsLength) + 1,
            userId: userId ? userId : historyState.id,
            nickname: displayName,
            title: titleRef.current.value,
            text: textRef.current.value,
            imgName: 'heo',
            imgURL: 'heo.heo.com',
            date: date.toLocaleString(),
            star: 0,
            views: 0,
            whoClicked: {},
            whoViews: {}
        }        
        writeCards(writeCard)
        history.push({
            pathname: '/board',
            state: {
                id: userId,
                displayName: displayName
            }
        })
        loadCards();
        
    }

    return(
        <div>
            <div className={Styles.write}>
                <input ref={titleRef} className={Styles.titleInput} type="text" placeholder="제목"/>
                <textarea ref={textRef} className={Styles.textInput} cols="30" rows="20" placeholder="내용"></textarea>
            </div>
            <div className={Styles.btns}>
                <button onClick={onClickAdd} className={Styles.addBtn}>글쓰기</button>
            </div>
        </div>
    )
}

export default Write;