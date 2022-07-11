import './style.css'
import { useRef, useState } from 'react'
import ProfilePicture from '../../components/proilePicture'

export default function ProfilePictureInfos({
    profile,
    visitor,
    photos,
    othername,
}) {
    const [show, setShow] = useState(false)
    const profileImgRef = useRef(null)
    return (
        <div className="profile_img_wrap">
            {show && (
                <ProfilePicture
                    setShow={setShow}
                    profileImgRef={profileImgRef}
                    photos={photos}
                />
            )}
            <div className="profile_w_left">
                <div className="profile_w_img">
                    <div
                        className="profile_w_bg"
                        ref={profileImgRef}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${profile.picture})`,
                        }}
                    ></div>
                    {!visitor && (
                        <div
                            className="profile_circle hover1"
                            onClick={() => setShow(true)}
                        >
                            <i className="camera_filled_icon"></i>
                        </div>
                    )}
                </div>
                <div className="profile_w_col">
                    <div className="profile_name">
                        {profile.first_name} {profile.last_name}
                        <div className="othername">
                            {othername && `(${othername})`}
                        </div>
                    </div>
                    <div className="profile_friend_count"></div>
                    <div className="profile_friend_images"></div>
                </div>
            </div>
            {visitor ? (
                ''
            ) : (
                <div className="profile_w_right">
                    <div className="green_btn">
                        <img
                            src="/icons/plus.png"
                            alt="plus icon"
                            className="invert"
                        />
                        <span>Add to story</span>
                    </div>
                    <div className="gray">
                        <i className="edit_icon"></i> <span>Edit profile</span>
                    </div>
                </div>
            )}
        </div>
    )
}
