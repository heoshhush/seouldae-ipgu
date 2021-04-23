import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './write.module.css'

const Write = ({ writeCards, loadCards, getEndCard, imageUploader}) => {
    const titleRef = useRef();
    const textRef = useRef();
    const inputRef = useRef();
    const history = useHistory();
    const historyState = history.location.state;

    const [url, setURL] = useState({});

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
                imgURL: url,
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

    const imgRef = useRef();

    const onFileUpload = async (event) => {
        const files = event.target.files;
        const temp = {...url};
        for(let i = 0; i < files.length ; i ++){
            temp[i] = (await imageUploader.upload(files[i])).url;
            const img = new Image();
            img.src = temp[i];
            imgRef.current.append(img);
        }
        setURL(temp);
    }

    const onClickImgUpload = () => {
        inputRef.current.click();
    }

    // 이미지 미리보기하면서 작업할 수 있게 하기
    // 글 중간에 이미지 위치할 수 있게 하기 (div contenteditable='true')

    return(
        <div>
            <div className={Styles.write}>
                <input ref={titleRef} className={Styles.titleInput} type="text" placeholder="제목"/>
                <div ref={imgRef}></div>
                <textarea ref={textRef} className={Styles.textInput} cols="30" rows="20" placeholder="내용"></textarea>
            </div>
            <div className={Styles.btns}>
                <button onClick={onClickAdd} className={Styles.addBtn}>
                    <i className={`fas fa-pen ${Styles.addIcon}`}></i>
                    글쓰기
                </button>
                <button 
                onClick={onClickImgUpload}
                className={Styles.imgUploadBtn}>
                    <i className={`fas fa-images ${Styles.imgUploadIcon}`}></i>
                    이미지 업로드
                    <input
                    ref={inputRef} 
                    className={Styles.imgUpload}
                    type="file" onChange={onFileUpload} multiple
                    />
                </button>
            </div>
        </div>
    )
}

export default Write;