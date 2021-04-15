import React, { useRef } from 'react';
import Styles from './writeComment.module.css'

const WriteComment = ({ card, database, loadComments, userId, displayName }) => {
    const formRef = useRef();
    const textRef= useRef();
    
    const onClickAdd = (event) => {
        event.preventDefault();
        const value = textRef.current.value;
        database.saveComment(card, userId, displayName, value)
        formRef.current.reset();
        loadComments();
    }

    return(
        <div className={Styles.container}>
            <div className={Styles.commentDivider}>
                <i className={`${Styles.commentIcon} fas fa-quote-left`}></i>
                <span>댓글</span>
            </div>

            <div className={Styles.title}>댓글 작성</div>
            <form ref={formRef} className={Styles.writeComment}>
                <textarea ref={textRef} className={Styles.text} rows="5"></textarea>
                <button type="submit" onClick={onClickAdd} className={Styles.addComment}>작성</button>
            </form>
        </div>
    )
}

export default WriteComment;