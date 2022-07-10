import './style.css'
import { useRef, useState } from 'react'
import { handleImage } from '../../functions/handleImage'
import ErrorHandler from '../errors/ErrorHandler'
import UpdateProfilePicture from './UpdateProgilePicture'
import { useSelector } from 'react-redux'
export default function ProfilePicture({ setShow, profileImgRef, photos }) {
    const refInput = useRef(null)
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('')

    const { user } = useSelector((state) => ({ ...state }))
    return (
        <div className="blur">
            <input
                type="file"
                ref={refInput}
                hidden
                onChange={(e) => handleImage(e, setImage, setError)}
                accept="image/jpeg,image/png,image/gif,image/webp"
            />
            <div className="postBox pictureBox">
                <div className="box_header">
                    <div
                        className="small_circle"
                        onClick={() => setShow(false)}
                    >
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update profile picture</span>
                </div>
                <div className="update_picture_wrap">
                    <div className="update_picture_buttons">
                        <button
                            className="light_blue_btn"
                            onClick={() => refInput.current.click()}
                        >
                            <i className="plus_icon"></i>
                            Upload photo
                        </button>
                        <button className="gray_btn">
                            <i className="frame_icon"></i>
                            Add frame
                        </button>
                    </div>
                </div>

                {error && <ErrorHandler error={error} setError={setError} />}

                <div className="old_pictures_wrap scrollbar">
                    <h4>Your profile pictures</h4>
                    <div className="old_pictures">
                        {photos
                            .filter(
                                (img) =>
                                    img.folder ===
                                    `${user.username}/profile_pictures`
                            )
                            .map((photo) => (
                                <img
                                    key={photo.public_id}
                                    src={photo.secure_url}
                                    alt="photo"
                                    onClick={() => setImage(photo.secure_url)}
                                />
                            ))}
                    </div>
                    <h4>Other pictures</h4>
                    <div className="old_pictures">
                        {photos
                            .filter(
                                (img) =>
                                    img.folder !==
                                    `${user.username}/profile_pictures`
                            )
                            .map((photo) => (
                                <img
                                    key={photo.public_id}
                                    src={photo.secure_url}
                                    alt="photo"
                                    onClick={() => setImage(photo.secure_url)}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {image && (
                <UpdateProfilePicture
                    setImage={setImage}
                    image={image}
                    setError={setError}
                    setShow={setShow}
                    profileImgRef={profileImgRef}
                />
            )}
        </div>
    )
}
