import { firebaseDatabase } from './firebase';

class Database {
    saveCard = (card) => {
        firebaseDatabase.ref(`anonymous`).set(
            card
        )
    }

    syncCard = () => {

    }

    deleteCard = () => {
        
    }
}

export default Database;