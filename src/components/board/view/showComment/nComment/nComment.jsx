import React, { useRef, useState } from 'react';
import Styles from './nComment.module.css'

const NComment = ({ comment, nComment, card, userId, database, loadNComments }) => {
    const [nowEdit,setNowEdit] = useState(false);

    const editRef = useRef();

    const onClickEdit = () => {
        setNowEdit(nowEdit ? false : true)
    }

    const onClickDelete = () => {
        database.deleteNComment(card, comment, nComment)
        loadNComments();
    }

    const onClickCompleteEdit = () => {
        database.updateNComment(card, comment, nComment, editRef.current.value);
        setNowEdit(nowEdit ? false : true)
        loadNComments();
    }
    
    return(
        <div className={Styles.nComment}>
            <div className={Styles.firstLine}>
                <div className={Styles.nickname}>
                    {nComment.nickname}
                    <i className={`far fa-user ${Styles.userIcon}`}></i>
                    {card.userId === nComment.id &&
                    <div className={Styles.author}>
                        <i className={`${Styles.authorIcon} fas fa-check`}></i>
                        글쓴이
                    </div> }
                </div>
 
                <div className={Styles.date}>
                    {nComment.date}
                </div>
                <div className={Styles.btns}>
                    {userId === nComment.id && 
                    <div className={Styles.hiddenBtns}>
                        <button className={Styles.editBtn} onClick={onClickEdit}>
                            <i className={`${Styles.editIcon} fas fa-keyboard`}></i>
                        </button>
                        <button className={Styles.deleteBtn} onClick={onClickDelete}>
                            <i className={`${Styles.deleteIcon} far fa-trash-alt`}></i>
                        </button>
                    </div>}
                </div>
            </div>
            <div className={Styles.secondLine}>
                {nowEdit && 
                <div className={Styles.edit}>
                    <input
                        ref={editRef}
                        className={Styles.editInput}
                        defaultValue={nComment.text}
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
                        {nComment.text}
                    </div>
                }   
            </div>
        </div>
        
    )
}

export default NComment;