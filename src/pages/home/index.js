import './style.css'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import { useSelector } from 'react-redux'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import SendVerification from '../../components/home/sendVerification'
import Post from '../../components/post'
// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react'
import { HashLoader } from 'react-spinners'

// eslint-disable-next-line no-unused-vars
export default function Home({
    setVisible,
    posts,
    // eslint-disable-next-line no-unused-vars
    loading,
    getAllPosts,
    dispatch,
}) {
    const { user } = useSelector((state) => ({ ...state }))
    // eslint-disable-next-line no-unused-vars
    const [height, setHeight] = useState('')
    const middle = useRef(null)

    useEffect(() => {
        setHeight(middle.current.clientHeight)
    }, [loading, height])
    return (
        <div className="home" style={{ height: `${height + 200}px` }}>
            <Header page="home" getAllPosts={getAllPosts} dispatch={dispatch} />
            <LeftHome user={user} />
            <div className="home_middle" ref={middle}>
                <Stories />
                {user.verified === false && <SendVerification user={user} />}
                <CreatePost user={user} setVisible={setVisible} />

                {loading ? (
                    <div className="skeleton_loader_posts">
                        <HashLoader color="#0d843c" size={150} />
                    </div>
                ) : (
                    <div className="posts">
                        {posts.map((post) => (
                            <Post key={post._id} post={post} user={user} />
                        ))}
                    </div>
                )}
            </div>
            <RightHome user={user} />
        </div>
    )
}
