import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import Styles from './edit.module.css';

const Edit = ({writeCards, userId, displayName}) => {
    const titleRef = useRef();
    const textRef = useRef();
    console.log(`edit: ${userId}`)

    const history = useHistory();
    const historyState = history.location.state;

    const onClickEdit = () => {
        const editCard = {
            id: historyState.id,
            cardNum: historyState.cardNum,
            userId: historyState.userId,
            nickname: historyState.nickname,
            title: titleRef.current.value,
            text: textRef.current.value,
            imgName: historyState.imgName,
            imgURL: historyState.imgURL,
            date: historyState.date,
            star: historyState.star,
            whoClicked: historyState.whoClicked
        }        
        writeCards(editCard)
        history.push({
            pathname: '/board',
            state: {
                id: userId,
                displayName: displayName
            }
        })
        
    }

    return(
        <div>
            <div className={Styles.write}>
                <input ref={titleRef} className={Styles.titleInput} 
                    type="text" 
                    placeholder="제목"
                    defaultValue={historyState.title}
                    />
                    
                <textarea ref={textRef} 
                    className={Styles.textInput} 
                    cols="30" rows="20" 
                    placeholder="내용">
                    {historyState.text}
                </textarea>
            </div>
            <div className={Styles.btns}>
                <button onClick={onClickEdit} className={Styles.editBtn}>수정</button>
            </div>
        </div>
    )
    };

export default Edit;