import './style.css'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import { useSelector } from 'react-redux'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import SendVerification from '../../components/home/sendVerification'

export default function Home({ setCreatePostVisible }) {
    const { user } = useSelector((state) => ({ ...state }))
    return (
        <div className="home">
            <Header />
            <LeftHome user={user} />
            <div className="home_middle">
                <Stories />
                {user.verified === false && <SendVerification user={user} />}
                <CreatePost
                    user={user}
                    setCreatePostVisible={setCreatePostVisible}
                />
            </div>
            <RightHome user={user} />
        </div>
    )
}
