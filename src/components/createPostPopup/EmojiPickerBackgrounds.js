import './style.css'
import { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'
import useClickOutside from '../../helpers/clickOutside'
export default function EmojiPickerBackgrounds({
    text,
    user,
    setText,
    type2,
    setBackground,
    background,
}) {
    const [picker, setPicker] = useState(false)
    const [showBackgrounds, setShowBackgrounds] = useState(false)
    const [cursorPosition, setCursorPosition] = useState()
    const textRef = useRef(null)
    const BackgroundRef = useRef(null)
    const emojiPickerRef = useRef(null)

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

    const backgroundHandler = (i) => {
        BackgroundRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`
        setBackground(postBackgrounds[i])
        BackgroundRef.current.classList.add('bgHandler')
    }

    const removeBackground = () => {
        BackgroundRef.current.style.backgroundImage = ''
        setBackground('')
        BackgroundRef.current.classList.remove('bgHandler')
    }

    useClickOutside(emojiPickerRef, () => setPicker(false))

    const postBackgrounds = [
        '/images/postbackgrounds/1.jpg',
        '../../../images/postbackgrounds/2.jpg',
        '../../../images/postbackgrounds/3.jpg',
        '../../../images/postbackgrounds/4.jpg',
        '../../../images/postbackgrounds/5.jpg',
        '../../../images/postbackgrounds/6.jpg',
        '../../../images/postbackgrounds/7.jpg',
        '../../../images/postbackgrounds/8.jpg',
        '../../../images/postbackgrounds/9.jpg',
        '../../../images/postbackgrounds/10.jpg',
    ]
    return (
        <div className={type2 ? 'images_input' : ''}>
            <div className={!type2 ? 'flex_center' : ''} ref={BackgroundRef}>
                <textarea
                    ref={textRef}
                    maxLength="1000"
                    value={text}
                    placeholder={`What's on your mind, ${user.first_name}`}
                    className={`post_input ${type2 && 'input2'}`}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        paddingTop: `${
                            background
                                ? //  Function to center by adding padding based on entered characters
                                  Math.abs(
                                      textRef.current.value.length * 0.1 - 30
                                  )
                                : '0'
                        }%`,
                    }}
                ></textarea>
            </div>
            <div className={!type2 ? 'post_emojis_wrap' : ''}>
                {picker && (
                    <div
                        className={`comment_emoji_picker ${
                            type2 ? 'movepicker2' : 'rlmove'
                        }`}
                        ref={emojiPickerRef}
                    >
                        <Picker onEmojiClick={handleEmoji} />
                    </div>
                )}
                {!type2 && (
                    <img
                        src="/icons/colorful.png"
                        alt=""
                        onClick={() => setShowBackgrounds((prev) => !prev)}
                    />
                )}
                {!type2 && showBackgrounds && (
                    <div className="post_backgrounds">
                        <div
                            className="no_bg"
                            onClick={() => removeBackground()}
                        ></div>
                        {postBackgrounds.map((bg, i) => (
                            <img
                                src={bg}
                                key={i}
                                alt="background images"
                                onClick={() => backgroundHandler(i)}
                            />
                        ))}
                    </div>
                )}

                <i
                    className={`emoji_icon_large ${type2 && 'moveleft'}`}
                    onClick={() => {
                        setPicker((prev) => !prev)
                    }}
                ></i>
            </div>
        </div>
    )
}
