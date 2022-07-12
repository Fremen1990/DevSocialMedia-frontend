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
import CreatePostPopup from '../../components/createPostPopup'
// eslint-disable-next-line no-unused-vars
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// eslint-disable-next-line no-unused-vars
import { HashLoader } from 'react-spinners'

export default function Profile({ getAllPosts }) {
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [visible, setVisible] = useState(false)
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

    const SkeletonLoader = () => (
        <>
            <div className="profile_cover">
                <Skeleton
                    height="347px"
                    containerClassName="avatar-skeleton"
                    style={{ borderRadius: '8px' }}
                />
            </div>
            <div
                className="profile_img_wrap"
                style={{
                    marginBottom: '-3rem',
                    transform: 'translateY(-8px)',
                }}
            >
                <div className="profile_w_left">
                    <Skeleton
                        circle
                        height="180px"
                        width="180px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: 'translateY(-3.3rem)' }}
                    />
                    <div className="profile_w_col">
                        <div className="profile_name">
                            <Skeleton
                                height="35px"
                                width="200px"
                                containerClassName="avatar-skeleton"
                            />
                            <Skeleton
                                height="30px"
                                width="100px"
                                containerClassName="avatar-skeleton"
                                style={{ transform: 'translateY(2.5px)' }}
                            />
                        </div>
                        <div className="profile_friend_count">
                            <Skeleton
                                height="20px"
                                width="90px"
                                containerClassName="avatar-skeleton"
                                style={{ marginTop: '5px' }}
                            />
                        </div>
                        <div className="profile_friend_imgs">
                            {Array.from(new Array(6), (val, i) => i + 1).map(
                                (id, i) => (
                                    <Skeleton
                                        key={i}
                                        circle
                                        height="32px"
                                        width="32px"
                                        containerClassName="avatar-skeleton"
                                        style={{
                                            transform: `translateX(${
                                                -i * 7
                                            }px)`,
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
                <div className={`friendship ${!visitor && 'fix'}`}>
                    <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                    />
                    <div className="flex">
                        <Skeleton
                            height="36px"
                            width={120}
                            containerClassName="avatar-skeleton"
                        />
                        {visitor && (
                            <Skeleton
                                height="36px"
                                width={120}
                                containerClassName="avatar-skeleton"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )

    const HashLoaderTheme = () => (
        <>
            <div className="profile_card">
                <div className="profile_card_header">Intro</div>
                <div className="skeleton_loader">
                    <HashLoader color="#0d843c" />
                </div>
            </div>
            <div className="profile_card">
                <div className="profile_card_header">
                    Photos
                    <div className="profile_header_link">See all photos</div>
                </div>
                <div className="skeleton_loader">
                    <HashLoader color="#0d843c" />
                </div>
            </div>
            <div className="profile_card">
                <div className="profile_card_header">
                    Friends
                    <div className="profile_header_link">See all friends</div>
                </div>
                <div className="skeleton_loader">
                    <HashLoader color="#0d843c" />
                </div>
            </div>
        </>
    )

    return (
        <div className="profile">
            {visible && (
                <CreatePostPopup
                    user={user}
                    setVisible={setVisible}
                    posts={profile?.posts}
                    dispatch={dispatch}
                    profile
                />
            )}
            <Header
                page="profile"
                getAllPosts={getAllPosts}
                dispatch={dispatch}
            />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">
                    {loading ? (
                        <SkeletonLoader />
                    ) : (
                        <>
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
                        </>
                    )}

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
                                {loading ? (
                                    <HashLoaderTheme />
                                ) : (
                                    <>
                                        <Intro
                                            detailss={profile.details}
                                            visitor={visitor}
                                            setOthername={setOthername}
                                        />
                                        <Photos photos={photos} />
                                        <Friends friends={profile.friends} />
                                    </>
                                )}
                            </div>
                            <div className="profile_right">
                                {!visitor && (
                                    <CreatePost
                                        user={user}
                                        profile
                                        setVisible={setVisible}
                                    />
                                )}
                                <GridPosts />

                                {loading ? (
                                    <div className="skeleton_loader_posts">
                                        <HashLoader
                                            color="#0d843c"
                                            size={100}
                                        />
                                    </div>
                                ) : (
                                    <div className="posts">
                                        {profile.posts &&
                                        profile.posts.length ? (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
