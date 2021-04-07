import { firebaseAuth, githubProvider, googleProvider } from './firebase'

class FirebaseAuth {

    login = (provider) => {
        firebaseAuth.signInWithPopup(provider);
    }

    logout = () => {
        firebaseAuth.signOut();
    }

    getProvider = (provider) => {
        switch(provider){
            case "Google":
                return googleProvider;
            case "Github":
                return githubProvider;
            default:
                throw new Error(`Unknown Provider: ${provider}`)
        }
    }

    authChanged = (myFunction) => {
        firebaseAuth.onAuthStateChanged(user => {
            myFunction(user);
        })
    }

}

export default FirebaseAuth ;