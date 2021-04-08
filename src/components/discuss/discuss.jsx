import React, { useState, useEffect } from 'react';
import Styles from './discuss.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';
import AddDiscuss from './add-discuss/addDiscuss';
import DiscussCard from './discuss-card/discussCard';
import { useHistory } from 'react-router';

const Discuss = ({firebaseAuth}) => {
    const history = useHistory();
    const historyState = history.location.state.id;
    console.log(`discuss : ${historyState}`)

    const [cards, setCards] = useState({
        1 : {
            id: 1,
            userId:'a',
            text: 'hello',
            date: new Date().toLocaleString()
        },
        2 : {
            id: 1,
            userId:'b',
            text: 'nice to meet you',
            date: new Date().toLocaleString()
        },
        3 : {
            id: 3,
            userId:'c',
            text: 'bye bye',
            date: new Date().toLocaleString()
        }
    })

    const onClickAddBtn = (card) => {
        const toAdd = {...cards};
        toAdd[card.id] = card;
        setCards(toAdd);
    }

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(!user){
                history.push('/');
            }
        })
    })



    return(        
        <>
        <Header 
            firebaseAuth={firebaseAuth}
            userId={historyState}
            />
        <div className={Styles.discuss}>
            <div className={Styles.title}> 토론 </div>
                <div className={Styles.addDiscuss}>
                    <AddDiscuss 
                        onClickAddBtn={onClickAddBtn}
                    />
                </div>
                <div className={Styles.discussCards}>
                    {Object.keys(cards).map(key=> (
                        <DiscussCard 
                            key={key}
                            card={cards[key]}
                        />
                    )
                    )}
                </div>
            
        </div>
        <Footer />
        </>
    )
}

export default Discuss;