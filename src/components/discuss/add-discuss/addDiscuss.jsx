import React, { useRef } from 'react';
import Styles from './addDiscuss.module.css';

const AddDiscuss = ({ onClickAddBtn }) => {
    const inputRef = useRef();
    const formRef = useRef();

    const onClick = (event) => {
        event.preventDefault();
        const toAddCard = {
            id: Date.now(),
            text: inputRef.current.value,
            date: new Date().toLocaleString()
        }
        onClickAddBtn(toAddCard);
        formRef.current.reset();
        
    }

    return(
        <div>
            <form ref={formRef} className={Styles.addDiscussForm}>
                <input ref={inputRef} className={Styles.discussInput} type="text"/>
                <button onClick={onClick} className={Styles.discussAddBtn}>
                    <i className="fas fa-plus-circle"></i>
                </button>
            </form>
        </div>
    )
}

export default AddDiscuss;