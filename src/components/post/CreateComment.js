import './style.css'
import { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'
import { handleImage } from '../../functions/handleImage'
import { comment } from '../../functions/post'
import ErrorHandler from '../errors/ErrorHandler'
import dataURItoBlob from '../../helpers/dataURItoBlob'
import { uploadImages } from '../../functions/uploadImages'
import { ClipLoader } from 'react-spinners'
// eslint-disable-next-line no-unused-vars
export default function CreateComment({ user, postId, setComments, setCount }) {
    const [picker, setPicker] = useState(false)
    const [text, setText] = useState('')
    const [commentImage, setCommentImage] = useState('')
    const [error, setError] = useState('')
    const [cursorPosition, setCursorPosition] = useState()
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false)
    const textRef = useRef(null)
    const imgInput = useRef(null)
    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition
    }, [cursorPosition])
    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current
        ref.focus()
        const start = text.substring(0, ref.selectionStart)
        const end = text.substring(ref.selectionStart)
        const newText = start + emoji + end
        setText(newText)
        setCursorPosition(start.length + emoji.length)
    }

    // eslint-disable-next-line no-unused-vars
    const handleComment = async (e) => {
        if (e.key === 'Enter') {
            if (commentImage !== '') {
                setLoading(true)
                const img = dataURItoBlob(commentImage)
                const path = `${user.username}/post_images/${postId}`
                let formData = new FormData()
                formData.append('path', path)
                formData.append('file', img)
                const imgComment = await uploadImages(
                    formData,
                    path,
                    user.token
                )

                const comments = await comment(
                    postId,
                    text,
                    imgComment[0].url,
                    user.token
                )
                setComments(comments)
                setCount((prev) => ++prev)
                setLoading(false)
                setText('')
                setCommentImage('')
            } else {
                setLoading(true)

                const comments = await comment(postId, text, '', user.token)
                setComments(comments)
                setCount((prev) => ++prev)
                setLoading(false)
                setText('')
                setCommentImage('')
            }
        }
    }
    return (
        <div className="create_comment_wrap">
            <div className="create_comment">
                <img src={user?.picture} alt="user picture" />
                <div className="comment_input_wrap">
                    {picker && (
                        <div className="comment_emoji_picker">
                            <Picker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                    <input
                        type="file"
                        hidden
                        ref={imgInput}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={(e) =>
                            handleImage(e, setCommentImage, setError)
                        }
                    />
                    {error && (
                        <ErrorHandler error={error} setError={setError} />
                    )}
                    <input
                        type="text"
                        ref={textRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        onKeyUp={handleComment}
                    />
                    <div className="comment_circle">
                        <ClipLoader size={25} loading={loading} />
                    </div>
                    <div
                        className="comment_circle_icon hover1"
                        onClick={() => setPicker((prev) => !prev)}
                    >
                        <i className="emoji_icon"></i>
                    </div>
                    <div
                        className="comment_circle_icon hover1"
                        onClick={() => imgInput.current.click()}
                    >
                        <i className="camera_icon"></i>
                    </div>{' '}
                    <div className="comment_circle_icon hover1">
                        <i className="gif_icon"></i>
                    </div>{' '}
                    <div className="comment_circle_icon hover1">
                        <i className="sticker_icon"></i>
                    </div>
                </div>
            </div>
            {commentImage && (
                <div className="comment_img_preview">
                    <img src={commentImage} alt="comment image" />
                    <div
                        className="small_white_circle"
                        onClick={() => setCommentImage('')}
                    >
                        <div className="exit_icon"></div>
                    </div>
                </div>
            )}
        </div>
    )
}
