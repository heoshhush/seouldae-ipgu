import React, { useState, useEffect } from 'react';
import Styles from './discuss.module.css'
import Footer from '../footer/footer';
import Header from '../header/header';
import AddDiscuss from './add-discuss/addDiscuss';
import DiscussCard from './discuss-card/discussCard';
import { useHistory } from 'react-router';

const Discuss = ({firebaseAuth, database}) => {
    const history = useHistory();
    const historyState = history.location.state;
    console.log(`discuss ID : ${historyState.id}`)
    console.log(`discuss displayName: ${historyState.displayName}`)

    const [cards, setCards] = useState({
    })

    const onClickAddBtn = (card) => {
        const toAdd = {...cards};
        toAdd[card.id] = card;
        setCards(toAdd);
    }

    const loadCard = () => {
        database.loadCard('anonymous', 
            (value) => {
                value && setCards(value);
            }
        )
        
    }

    useEffect(() => {
        loadCard();
    }, [])

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
            userId={historyState.id}
            displayName={historyState.displayName}
            />
        <div className={Styles.discuss}>
            <div className={Styles.title}> 토론 </div>
                <div className={Styles.addDiscuss}>
                    <AddDiscuss 
                        onClickAddBtn={onClickAddBtn}
                        userId={historyState.id}
                        database={database}
                    />
                </div>
                <div className={Styles.discussCards}>
                    {Object.keys(cards).map(key=> (
                        <DiscussCard 
                            key={key}
                            card={cards[key]}
                            database={database}
                            loadCard={loadCard}
                            userId={historyState.id}
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