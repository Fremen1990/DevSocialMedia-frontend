import './style.css'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import { useSelector } from 'react-redux'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import SendVerification from '../../components/home/sendVerification'
import Post from '../../components/post'
import { useEffect, useRef, useState } from 'react'

export default function Home({ setCreatePostVisible, posts }) {
    const { user } = useSelector((state) => ({ ...state }))
    const [height, setHeight] = useState('')
    const middle = useRef(null)

    useEffect(() => {
        setHeight(middle.current.clientHeight)
    }, [])
    return (
        <div className="home" style={{ height: `${height + 200}px` }}>
            <Header page="home" />
            <LeftHome user={user} />
            <div className="home_middle" ref={middle}>
                <Stories />
                {user.verified === false && <SendVerification user={user} />}
                <CreatePost
                    user={user}
                    setCreatePostVisible={setCreatePostVisible}
                />

                {posts.map((post) => (
                    <Post key={post._id} post={post} user={user} />
                ))}
            </div>
            <RightHome user={user} />
        </div>
    )
}
