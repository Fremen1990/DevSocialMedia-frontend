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
import { postsReducer } from './functions/reducers'
import { getAllPosts } from './apiCalls'

function App() {
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    // eslint-disable-next-line no-unused-vars
    const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
        loading: false,
        posts: [],
        error: '',
    })

    useEffect(() => {
        getAllPosts(user, dispatch)
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
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                setCreatePostVisible={setCreatePostVisible}
                            />
                        }
                        exact
                    />
                    <Route
                        path="/profile/:username"
                        element={<Profile />}
                        exact
                    />
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
