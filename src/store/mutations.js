import {USER_SIGNIN, USER_SIGNOUT} from './types'

export default {
    [USER_SIGNIN](state, data) {
        localStorage.setItem('jwt', data.token);
        state.token = data.token;
    }, [USER_SIGNOUT](state) {
        localStorage.removeItem('jwt');
        state.token = '';
    }
}
