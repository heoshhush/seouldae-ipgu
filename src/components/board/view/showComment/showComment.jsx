import React, { useEffect, useRef, useState } from 'react';
import NComment from './nComment/nComment';
import Styles from './showComment.module.css'

const ShowComment = ({ comment, database, card, loadComments, userId, displayName }) => {
    const [nowEdit,setNowEdit] = useState(false);
    const [nComment, setNComment] = useState(false);
    const [nestedComments, setNestedComments] = useState({})

    const editRef = useRef();
    const nCommentRef = useRef();
    const nCommentFormRef = useRef();

    const onClickEdit = () => {
        setNowEdit(nowEdit ? false : true)
    }

    const onClickCompleteEdit = () => {
        database.updateComment(card, comment, editRef.current.value);
        setNowEdit(nowEdit? false : true)
        loadComments();
    }

    const onClickDelete = () => {
        database.deleteComment(card, comment)
        loadComments();
    }

    const onClickNCommentBtn = () => {
        setNComment(nComment ? false : true)
    }
    
    const onClickAddNComment = (event) => {
        event.preventDefault();
        database.saveNComment(card, comment, userId, displayName, nCommentRef.current.value)
        loadNComments();
        nCommentFormRef.current.reset();
    }

    const loadNComments = () => {
        database.loadNComment(card, comment, (value) => {
                setNestedComments(value);
            }
        )
    }

    useEffect(() => {
        loadNComments()
    }, [])

    return(
        <>
        {comment.text !== ' ' && <div className={Styles.comment}>
            <div className={Styles.firstLine}>
                <div className={Styles.nickname}>
                    {comment.nickname}
                    <i className={`far fa-user ${Styles.userIcon}`}></i>
                    {card.userId === comment.id &&
                    <div className={Styles.author}>
                        <i className={`${Styles.authorIcon} fas fa-check`}></i>
                        글쓴이
                    </div> }
                </div>
 
                <div className={Styles.date}>
                    {comment.date}
                </div>
                <div className={Styles.btns}>
                    {userId === comment.id && 
                    <div className={Styles.hiddenBtns}>
                        <button className={Styles.editBtn} onClick={onClickEdit}>
                            <i className={`${Styles.editIcon} fas fa-keyboard`}></i>
                        </button>
                        <button className={Styles.deleteBtn} onClick={onClickDelete}>
                            <i className={`${Styles.deleteIcon} far fa-trash-alt`}></i>
                        </button>
                    </div>}
                    <button className={Styles.nCommentBtn} onClick={onClickNCommentBtn}>
                        <i className={`${Styles.nCommentIcon} fas fa-comments`}>
                        </i>
                    </button>
                </div>
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
            {nComment && 
                <form ref={nCommentFormRef} className={Styles.nComment}>
                    <input ref={nCommentRef} className={Styles.nCommentInput} type="text"/>
                    <button onClick={onClickAddNComment} className={Styles.nCommentAddBtn}>작성</button>
                </form>
            }
            
            {Object.keys(nestedComments).map(key => (
                <NComment 
                key={key}
                nComment={nestedComments[key]}
                comment={comment}
                card={card}
                userId={userId}
                database={database}
                loadNComments={loadNComments}
                />
            ))}

        </div>}
        </>
    )
}

export default ShowComment;