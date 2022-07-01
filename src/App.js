import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'

function App() {
    return (
        <>
            <Routes>{<Route path="/" element={<Home />} exact />}</Routes>
            <Routes>{<Route path="login" element={<Login />} exact />}</Routes>
            <Routes>{<Route path="profile" element={<Profile />} />}</Routes>
        </>
    )
}

export default App
