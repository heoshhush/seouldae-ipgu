import React, { useState } from 'react';
import Styles from './viewImgSlider.module.css';

const ViewImgSlider = ({ viewCard }) => {
    const [nowImg, setNowImg] = useState(viewCard.imgURL ? viewCard.imgURL : []);
    const [imgKeys, setImgKeys] = useState(0);

    console.log(viewCard.imgURL)

    const onClickLeft = () => {
        if(imgKeys > 0){
            setImgKeys(imgKeys - 1);
        } else {
            return
        }
    }

    const onClickRight = () => {
        if(viewCard.imgURL){
            if(imgKeys < Object.keys(viewCard.imgURL).length - 1){
                setImgKeys(imgKeys + 1);
            } else {
                return
            }
        } else {
            return 
        }
    }

    return (
        <div className={Styles.container}>
            <button onClick={onClickLeft} className={Styles.leftBtn}>
                <i className={`fas fa-chevron-left ${Styles.leftIcon}`}></i>
            </button>
            <div className={Styles.imgSection}>
                <div className={Styles.imgContainer}>
                    <img className={Styles.img} src={nowImg[Object.keys(nowImg)[imgKeys]]} alt=""/>
                </div>
            </div>
            <button onClick={onClickRight} className={Styles.rightBtn}>
                <i className={`fas fa-chevron-right ${Styles.rightIcon}`}></i>
            </button>
        </div>
    )
}

export default ViewImgSlider;