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

    getUserInfo = () => {
        const user = firebaseAuth.currentUser;
        if(user) {
            return user
        }
    }

    // 가입 -----
    
    signUp = (email, password) => {
        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential;
            console.log(user)
        })
    }

}

export default FirebaseAuth ;