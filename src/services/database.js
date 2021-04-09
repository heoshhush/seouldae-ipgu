import { firebaseDatabase } from './firebase';

class Database {
    saveCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).set(
            card
        )
    }

    loadCard = (path, myFunction) => {
        firebaseDatabase.ref(`${path}`).once('value', snapshot => {
            const value = snapshot.val();
            myFunction(value);
        })
        }

    deleteCard = (path, card) => {
        firebaseDatabase.ref(`${path}/${card.id}`).remove();
    }
}

export default Database;