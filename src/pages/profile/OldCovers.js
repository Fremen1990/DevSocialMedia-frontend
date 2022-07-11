import { useSelector } from 'react-redux'
import { useRef } from 'react'
import useClickOutside from '../../helpers/clickOutside'

export default function OldCovers({ photos, setCoverPicture, setShow }) {
    const { user } = useSelector((state) => ({ ...state }))
    const oldCoverRef = useRef(null)

    useClickOutside(oldCoverRef, () => setShow(false))
    return (
        <div className="blur">
            <div className="postBox selectCoverBox" ref={oldCoverRef}>
                <div className="box_header">
                    <div
                        className="small_circle"
                        onClick={() => setShow(false)}
                    >
                        <i className="exit_icon"></i>
                    </div>
                    <span>Select photo</span>
                </div>
                <div className="selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div>
                <div className="old_pictures_wrap scrollbar">
                    <div className="old_pictures">
                        {photos &&
                            photos
                                .filter(
                                    (img) =>
                                        img.folder ===
                                        `${user.username}/cover_pictures`
                                )
                                .map((photo) => (
                                    <img
                                        key={photo.public_id}
                                        src={photo.secure_url}
                                        alt="photo"
                                        onClick={() => {
                                            setCoverPicture(photo.secure_url)
                                            setShow(false)
                                        }}
                                    />
                                ))}
                    </div>
                    <div className="old_pictures">
                        {photos &&
                            photos
                                .filter(
                                    (img) =>
                                        img.folder !==
                                        `${user.username}/post_images`
                                )
                                .map((photo) => (
                                    <img
                                        key={photo.public_id}
                                        src={photo.secure_url}
                                        alt="photo"
                                        onClick={() => {
                                            setCoverPicture(photo.secure_url)
                                            setShow(false)
                                        }}
                                    />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
