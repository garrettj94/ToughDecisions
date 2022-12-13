// used to decode tokens and retrieve user data
import decode from 'jwt-decode';

// create new authentication class
class Auth {
    // get user data
    getUserAccount() {
        return decode(this.getToken());
    }

    // check if user is logged in and if token is still valid
    isLoggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
    }

    // check if token is expired
    isTokenExpired(token) {
        try{
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    // retrieve a user's token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // saves token to local storage when user logs in
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // delete token from local storage when user logs out and refresh the page
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new Auth()

