import { useRef, useState } from 'react'
import './style.css'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'
import AddToYourPost from './AddToYourPost'
import ImagePreview from './ImagePreview'
import useClickOutside from '../../helpers/clickOutside'
import { createPost } from '../../functions/post'
import { PulseLoader } from 'react-spinners'
import PostError from './PostError'
import dataURItoBlob from '../../helpers/dataURItoBlob'
import { uploadImages } from '../../functions/uploadImages'

export default function CreatePostPopup({ user, setCreatePostVisible }) {
    const [text, setText] = useState('')
    const [images, setImages] = useState([])
    const [showPrev, setShowPrev] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [background, setBackground] = useState('')
    const createPostPopup = useRef(null)

    useClickOutside(createPostPopup, () => setCreatePostVisible(false))

    const postSubmit = async () => {
        if (background) {
            setLoading(true)
            const response = await createPost(
                null,
                background,
                text,
                null,
                user.id,
                user.token
            )
            setLoading(false)
            if (response === 'ok') {
                setBackground('')
                setText('')
                setCreatePostVisible(false)
            } else {
                setError(response)
            }
        } else if (images && images.length) {
            setLoading(true)
            const postImages = images.map((img) => {
                return dataURItoBlob(img)
            })
            const path = `${user.username}/post Images`
            console.log('user', user)
            let formData = new FormData()
            formData.append('path', path)
            postImages.forEach((image) => {
                formData.append('file', image)
            })
            const response = await uploadImages(formData, path, user.token)

            const res = await createPost(
                null,
                null,
                text,
                response,
                user.id,
                user.token
            )
            setLoading(false)
            if (res === 'ok') {
                setText('')
                setImages('')
                setCreatePostVisible(false)
            } else {
                setError(res)
            }
        } else if (text) {
            setLoading(true)
            const response = await createPost(
                null,
                background,
                text,
                null,
                user.id,
                user.token
            )
            setLoading(false)
            if (response === 'ok') {
                setBackground('')
                setText('')
                setCreatePostVisible(false)
            } else {
                setError(response)
            }
        } else {
            setError('Please write something, choose image or background')
            console.log('No entry')
        }
    }

    return (
        <div className="blur">
            <div className="postBox" ref={createPostPopup}>
                {error && <PostError error={error} setError={setError} />}

                <div className="box_header">
                    <div
                        className="small_circle"
                        onClick={() => setCreatePostVisible(false)}
                    >
                        <i className="exit_icon"></i>
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img
                        src={user.picture}
                        alt=""
                        className="box_profile_img"
                    />
                    <div className="box_col">
                        <div className="box_profile_name">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="box_privacy">
                            <img src="/icons/public.png" alt="" />
                            <span>Public</span>
                            <i className="arrowDown_icon"></i>
                        </div>
                    </div>
                </div>

                {!showPrev ? (
                    <>
                        <EmojiPickerBackgrounds
                            text={text}
                            user={user}
                            setText={setText}
                            showPrev={showPrev}
                            background={background}
                            setBackground={setBackground}
                        />
                    </>
                ) : (
                    <ImagePreview
                        images={images}
                        setImages={setImages}
                        text={text}
                        user={user}
                        setText={setText}
                        showPrev={showPrev}
                        setShowPrev={setShowPrev}
                        setError={setError}
                    />
                )}
                <AddToYourPost setShowPrev={setShowPrev} />
                <button
                    className="post_submit"
                    onClick={() => postSubmit()}
                    disabled={loading}
                >
                    {loading ? <PulseLoader color="#fff" size={8} /> : 'Post'}
                </button>
            </div>
        </div>
    )
}
