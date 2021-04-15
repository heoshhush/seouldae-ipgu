import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './write.module.css'

const Write = ({ writeCards, loadCards, getEndCard}) => {
    const titleRef = useRef();
    const textRef = useRef();
    const history = useHistory();
    const historyState = history.location.state;

    const onClickAdd = () => {
        const title = titleRef.current.value;
        const text = textRef.current.value;

        if(!title){
            alert("제목을 2자 이상 작성해주세요")
        } else if(!text){
            alert("내용을 2자 이상 작성해주세요")
        }

        else{
        const date = new Date();
        const writeCard = {
            id: Date.now(),
            cardNum: parseInt(historyState.cardsLength) + 1,
            userId: historyState.userId,
            nickname: historyState.nickname,
            title: titleRef.current.value,
            text: textRef.current.value,
            imgName: 'heo',
            imgURL: 'heo.heo.com',
            date: date.toLocaleString(),
            star: 0,
            views: 0,
            whoClicked: {},
            whoViews: {},
            comment: {}
        }        
        console.log(writeCard)
        writeCards(writeCard)
        history.push({
            pathname: '/board',
            state: {
                id: historyState.userId,
                displayName: historyState.nickname
            }
        })
        loadCards();
        getEndCard();
    }
        
    }

    return(
        <div>
            <div className={Styles.write}>
                <input ref={titleRef} className={Styles.titleInput} type="text" placeholder="제목"/>
                <textarea ref={textRef} className={Styles.textInput} cols="30" rows="20" placeholder="내용"></textarea>
            </div>
            <div className={Styles.btns}>
                <button onClick={onClickAdd} className={Styles.addBtn}>
                    <i className={`fas fa-pen ${Styles.addIcon}`}></i>
                    글쓰기
                </button>
            

            </div>
        </div>
    )
}

export default Write;