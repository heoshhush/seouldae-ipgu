import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import Styles from './edit.module.css';

const Edit = ({writeCards, userId, displayName}) => {
    const titleRef = useRef();
    const textRef = useRef();
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
            views: historyState.views,
            whoViews: historyState.whoViews,
            whoClicked: historyState.whoClicked,
            comment: historyState.comment
        }        
            writeCards(editCard)
            history.push({
                pathname: '/board',
                state: {
                    id: historyState.userId,
                    displayName: historyState.nickname
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
                <button onClick={onClickEdit} className={Styles.editBtn}>
                    <i className={`${Styles.editIcon} fas fa-check`}></i>
                    수정 완료
                </button>
            </div>
        </div>
    )
    };

export default Edit;