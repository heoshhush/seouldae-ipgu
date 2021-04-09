import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import Styles from './write.module.css'

const Write = ({ writeCards, userId }) => {
    const titleRef = useRef();
    const textRef = useRef();
    console.log(`write: ${userId}`)

    const history = useHistory();

    const onClickAdd = () => {
        const writeCard = {
            id: Date.now(),
            userId: userId,
            nickname: 'park',
            title: titleRef.current.value,
            text: textRef.current.value,
            imgName: 'heo',
            imgURL: 'heo.heo.com'
        }        
        writeCards(writeCard)
        history.push({
            pathname: '/board',
            state: {
                id: userId
            }
        })
        
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