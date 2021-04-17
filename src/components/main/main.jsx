import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Footer from '../footer/footer';
import Header from '../header/header';
import Leftside from '../leftside/leftside';
import Center from './center/center';
import Styles from './main.module.css'
import SettingUserInfo from './settingUserInfo/settingUserInfo';

const Main = ({ firebaseAuth, firebasePopular }) => {
    const history = useHistory();
    const historyState = history.location.state;
    const [userId, setUserId] = useState(historyState && historyState.id)
    const [displayName, setDisplayName] = useState(historyState && historyState.displayName)

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(user){
                setUserId(historyState.id)
                setDisplayName(firebaseAuth.getUserInfo().displayName)
            }
            else if(!user){
                history.push('/');
            }
        })
    },[])

    const getMainUserId = () => {
        return userId;
    }
    const getMainDisplayName = () => {
        return displayName;
    }


    const updateUserProfile = (text) => {
        firebaseAuth.authChanged(user => {
            if(user){
                user.updateProfile({
                    displayName: text
                })
                history.push({
                    pathname:'/main',
                    state:{
                        id:historyState.id,
                        displayName:text
                    }
                })
                setDisplayName(text)
            }
        })
    }
    console.log(`main displayName :${historyState.displayName}`)
    console.log(`main user id :${userId}`) 
    console.log(`dpname ${displayName}`)

    const onClickPopularCard = (URL, card) => {
        history.push({
            pathname:`${URL}`,
            state: getState(card)
        })
    }
    
    const getState = (card) => {
        return {
            id: card.id,
            cardNum: card.cardNum,
            userId: card.userId,
            nickname: card.nickname,
            title: card.title,
            text: card.text,
            imgName: card.imgName,
            imgURL: card.imgURL,
            date: card.date,
            star: card.star,
            views: card.views,
            whoClicked: card.whoClicked,
            whoViews: card.whoViews,
            comment: card.comment,
        }
    }


    
    return(

        <main>
            {displayName === null && 
                <SettingUserInfo 
                    updateUserProfile={updateUserProfile}
                    userId = {userId}
                    displayName = {displayName}
                />
                }
            <div className={Styles.header}>
                <Header 
                    firebaseAuth={firebaseAuth}
                    userId={userId}
                    displayName={displayName}
                    getMainUserId={getMainUserId}
                    getMainDisplayName={getMainDisplayName}
                />
            </div>
            <section className={Styles.section}>
                <Leftside 
                    firebaseAuth={firebaseAuth}
                    userId = {userId}
                    displayName = {displayName}
                    updateUserProfile = {updateUserProfile}
                />
                <Center 
                    firebasePopular={firebasePopular}
                    onClickPopularCard={onClickPopularCard}
                />


            </section>
            <Footer />
        </main>
    )  
};

export default Main;