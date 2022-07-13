import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { themeReducer } from './themeReducer'
import {
    friendspage,
    postsReducer,
    profileReducer,
} from '../functions/reducers'

const rootReducer = combineReducers({
    user: userReducer,
    darkTheme: themeReducer,
    posts: postsReducer,
    profile: profileReducer,
    friends: friendspage,
})

export default rootReducer
