const SET_USER = 'SET_USER';

export const setUser = (user) => ({ type: SET_USER, user });

const reducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USER:
            return action.user;
            break;
    }
    return state;
}

export default reducer;