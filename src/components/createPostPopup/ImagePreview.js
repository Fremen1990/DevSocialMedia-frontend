import './style.css'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'

export default function ImagePreview({ text, setText, user }) {
    return (
        <div className="overflow_a">
            <EmojiPickerBackgrounds
                text={text}
                setText={setText}
                user={user}
                type2
            />
        </div>
    )
}
