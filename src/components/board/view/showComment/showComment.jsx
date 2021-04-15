import React, { useRef, useState } from 'react';
import Styles from './showComment.module.css'

const ShowComment = ({ comment, database, card, loadComments }) => {
    const [nowEdit,setNowEdit] = useState(false);
    const editRef = useRef();
    console.log(comment)
    const onClickEdit = () => {
        setNowEdit(nowEdit ? false : true)
    }
    const onClickCompleteEdit = () => {
        database.updateComment(card, comment, editRef.current.value);
        setNowEdit(nowEdit? false : true)
        loadComments();
        
    }
    console.log(nowEdit)
    const onClickDelete = () => {

    }


    return(
        <>
        {comment.text !== ' ' && <div className={Styles.comment}>
            <div className={Styles.firstLine}>
                <div className={Styles.nickname}>
                    {comment.nickname}
                    <i className={`far fa-user ${Styles.userIcon}`}></i>
                </div>
                <div className={Styles.date}>
                    {comment.date}
                </div>
                <button className={Styles.editBtn} onClick={onClickEdit}>
                    <i className={`${Styles.editIcon} fas fa-keyboard`}></i>
                </button>
                <button className={Styles.deleteBtn}>
                     <i className={`${Styles.deleteIcon} far fa-trash-alt`}></i>
                </button>
            </div>
            <div className={Styles.secondLine}>
                {nowEdit && 
                <div className={Styles.edit}>
                    <input
                        ref={editRef}
                        className={Styles.editInput}
                        defaultValue={comment.text}
                        type="text"/>
                    <button 
                        onClick={onClickCompleteEdit}
                        className={Styles.editCompleteBtn}>
                        수정
                    </button>
                </div>
                }
                {!nowEdit && 
                    <div className={Styles.text}>
                    {comment.text}
                    </div>
                }   
            </div>
        </div>}
        </>
    )
}

export default ShowComment;