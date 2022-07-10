import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { profileReducer } from '../../functions/reducers'
import { useEffect, useReducer, useState } from 'react'
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

    // console.log('PHOTOS RESOURCES', photos.resources[0].folder)
    return (
        <div>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <Cover cover={profile.cover} visitor={visitor} />
                    <ProfilePictureInfos
                        profile={profile}
                        visitor={visitor}
                        photos={photos.resources}
                    />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PplYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
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
