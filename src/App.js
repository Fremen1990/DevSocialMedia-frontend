import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import LoggedInRoutes from './routes/LoggedInRoutes'
import NotLoggedInRoutes from './routes/NotLoggedInRoutes'
import Activate from './pages/home/activate'
import Reset from './pages/reset'
import CreatePostPopup from './components/createPostPopup'
import { useSelector } from 'react-redux'
import { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

function reducer(state, action) {
    switch (action.type) {
        case 'POSTS_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'POSTS_SUCCESS':
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: '',
            }
        case 'POSTS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

function App() {
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    // eslint-disable-next-line no-unused-vars
    const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
        loading: false,
        posts: [],
        error: '',
    })

    const getAllPosts = async () => {
        try {
            dispatch({ type: 'POSTS_REQUEST' })
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
                {
                    header: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            dispatch({
                type: 'POSTS_SUCCESS',
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: 'POSTS_ERROR',
                payload: error.data.response.message,
            })
        }
    }
    useEffect(() => {
        getAllPosts()
    }, [])

    return (
        <>
            {createPostVisible && (
                <CreatePostPopup
                    user={user}
                    setCreatePostVisible={setCreatePostVisible}
                />
            )}
            <Routes>
                <Route element={<LoggedInRoutes />}>
                    <Route
                        path="/"
                        element={
                            <Home
                                setCreatePostVisible={setCreatePostVisible}
                                posts={posts}
                            />
                        }
                        exact
                    />
                    <Route path="/profile" element={<Profile />} exact />
                    <Route
                        path="/activate/:token"
                        element={<Activate />}
                        exact
                    />
                </Route>
                <Route element={<NotLoggedInRoutes />}>
                    <Route path="/login" element={<Login />} exact />
                </Route>
                <Route path="/reset" element={<Reset />} exact />
            </Routes>
        </>
    )
}

export default App
