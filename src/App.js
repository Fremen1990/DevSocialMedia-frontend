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
import { useState } from 'react'
function App() {
    const [createPostVisible, setCreatePostVisible] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
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
                            <Home setCreatePostVisible={setCreatePostVisible} />
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
