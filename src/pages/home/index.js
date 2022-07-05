import './style.css'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import { useSelector } from 'react-redux'
import RightHome from '../../components/home/right'
import Stories from '../../components/stories'

function Home() {
    const { user } = useSelector((user) => ({ ...user }))
    return (
        <div className="home">
            <Header />
            <LeftHome user={user} />
            <div className="home_middle">
                <Stories />
            </div>
            <RightHome user={user} />
        </div>
    )
}

export default Home
