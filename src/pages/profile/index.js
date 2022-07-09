import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { profileReducer } from '../../functions/reducers'
import { useEffect, useReducer, useState } from 'react'
import { getProfile } from '../../apiCalls'
import Header from '../../components/header'

export default function Profile() {
    const navigate = useNavigate()
    //username from http query
    const { username } = useParams()
    //user from redux global store
    const { user } = useSelector((state) => ({ ...state }))
    //check which user is available
    const userName = username === undefined ? user.username : username

    // eslint-disable-next-line no-unused-vars
    const [showCoverMenu, setShowCoverMenu] = useState(false)

    // eslint-disable-next-line no-unused-vars
    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: '',
    })

    useEffect(() => {
        getProfile(userName, user, dispatch, navigate)
    }, [userName])
    return (
        <div>
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <div className="profile_cover">
                        {profile.cover && (
                            <img
                                src={profile.cover}
                                alt="profile cover"
                                className="cover"
                            />
                        )}
                        <div className="update_cover_wrapper">
                            <div
                                className="open_cover_update"
                                onClick={() =>
                                    setShowCoverMenu((prev) => !prev)
                                }
                            >
                                <i className="camera_filled_icon"></i>
                                Add Cover Photo
                            </div>
                            {showCoverMenu && (
                                <div className="open_cover_menu">
                                    <div className="open_cover_menu_item">
                                        <i className="photo_icon"></i>Select
                                        Photo
                                    </div>
                                    <div className="open_cover_menu_item">
                                        <i className="photo_icon"></i>Upload
                                        Photo
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
