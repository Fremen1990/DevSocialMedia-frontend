import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { profileReducer } from '../../functions/reducers'
import { useEffect, useReducer, useRef, useState } from 'react'
import { getProfile } from '../../apiCalls'
import Header from '../../components/header'
import Cover from './Cover'
import ProfilePictureInfos from './ProfilePictureInfos'
import ProfileMenu from './ProfileMenu'
import PplYouMayKnow from './PplYouMayKnow'
import CreatePost from '../../components/createPost'
import GridPosts from './GridPosts'
import Post from '../../components/post'
import Photos from './Photos'
import Friends from './Friends'
import Intro from '../../components/intro'
import { useMediaQuery } from 'react-responsive'

export default function Profile({ setCreatePostVisible }) {
    const navigate = useNavigate()
    //username from http query
    const { username } = useParams()
    //user from redux global store
    const { user } = useSelector((state) => ({ ...state }))
    //check which user is available
    const userName = username === undefined ? user.username : username
    //check if the current displayed profile is logged in profile or visitor
    const visitor = userName === user.username ? false : true
    const [othername, setOthername] = useState('')
    const [photos, setPhotos] = useState({})

    // eslint-disable-next-line no-unused-vars
    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: '',
    })

    useEffect(() => {
        getProfile(userName, user, dispatch, navigate, user.token, setPhotos)
    }, [userName])

    useEffect(() => {
        setOthername(profile?.details?.otherName)
    }, [profile])

    const profileTop = useRef(null)
    const [height, setHeight] = useState('')
    const leftSide = useRef(null)
    const [leftHeight, setLeftHeight] = useState('')
    const [scrollHeight, setScrollHeight] = useState('')
    useEffect(() => {
        setHeight(profileTop.current.clientHeight + 300)
        setLeftHeight(leftSide.current.clientHeight)
        window.addEventListener('scroll', getScroll, { passive: true })
        return () => {
            window.addEventListener('scroll', getScroll, { passive: true })
        }
    }, [loading, scrollHeight])
    // eslint-disable-next-line no-unused-vars
    const check = useMediaQuery({
        query: '(min-width:901px)',
    })
    const getScroll = () => {
        setScrollHeight(window.pageYOffset)
    }

    return (
        <div>
            <Header page="profile" />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">
                    <Cover
                        cover={profile.cover}
                        visitor={visitor}
                        photos={photos.resources}
                    />
                    <ProfilePictureInfos
                        profile={profile}
                        visitor={visitor}
                        photos={photos.resources}
                        othername={othername}
                    />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PplYouMayKnow />
                        <div
                            className={`profile_grid ${
                                check &&
                                scrollHeight >= height &&
                                leftHeight > 1000
                                    ? 'scrollFixed showLess'
                                    : check &&
                                      scrollHeight >= height &&
                                      leftHeight < 1000 &&
                                      'scrollFixed showMore'
                            }`}
                        >
                            <div className="profile_left" ref={leftSide}>
                                <Intro
                                    detailss={profile.details}
                                    visitor={visitor}
                                    setOthername={setOthername}
                                />
                                <Photos photos={photos} />
                                <Friends friends={profile.friends} />
                            </div>
                            <div className="profile_right">
                                {!visitor && (
                                    <CreatePost
                                        user={user}
                                        profile
                                        setCreatePostVisible={
                                            setCreatePostVisible
                                        }
                                    />
                                )}
                                <GridPosts />
                                <div className="posts">
                                    {profile.posts && profile.posts.length ? (
                                        profile.posts.map((post) => (
                                            <Post
                                                key={post._id}
                                                post={post}
                                                user={user}
                                                profile
                                            />
                                        ))
                                    ) : (
                                        <div className="no_posts">
                                            No posts available
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
