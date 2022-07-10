import './style.css'
import { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'
import { handleImage } from '../../functions/handleImage'
import ErrorHandler from '../errors/ErrorHandler'
export default function CreateComment({ user }) {
    const [picker, setPicker] = useState(false)
    const [comment, setComment] = useState('')
    const [commentImage, setCommentImage] = useState('')
    const [error, setError] = useState('')
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)
    const imgInput = useRef(null)
    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition
    }, [cursorPosition])
    const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current
        ref.focus()
        const start = comment.substring(0, ref.selectionStart)
        const end = comment.substring(ref.selectionStart)
        const newText = start + emoji + end
        setComment(newText)
        setCursorPosition(start.length + emoji.length)
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
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                    />
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
