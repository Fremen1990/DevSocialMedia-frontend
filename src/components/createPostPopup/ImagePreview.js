import './style.css'
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds'
import { useRef } from 'react'

export default function ImagePreview({
    text,
    setText,
    user,
    images,
    // eslint-disable-next-line no-unused-vars
    setError,
    setImages,
    setShowPrev,
}) {
    const ImageInputRef = useRef(null)

    const handleImages = (e) => {
        //Image load
        let files = Array.from(e.target.files)
        files.forEach((img) => {
            if (
                img.type !== 'image/jpeg' &&
                img.type !== 'image/png' &&
                img.type !== 'image/webp' &&
                img.type !== 'image/gif'
            ) {
                setError(
                    `File: ${img.name} format is unsupported, only jpeg, png, webp and gif are allowed`
                )
                files = files.filter((item) => item.name !== img.name)
                return
            } else if (img.size > 1024 * 1024 * 5) {
                setError(
                    `File: ${img.name} is too heavy, maximum file size is 5MB`
                )
                files = files.filter((item) => item.name !== img.name)

                return
            }

            const reader = new FileReader()
            reader.readAsDataURL(img)
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result])
            }
        })
    }

    return (
        <div className="overflow_a scrollbar">
            <EmojiPickerBackgrounds
                text={text}
                setText={setText}
                user={user}
                type2
            />
            <div className="add_pics_wrap">
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    hidden
                    ref={ImageInputRef}
                    onChange={handleImages}
                />

                {images && images.length ? (
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className="hover_green transit">
                                <i className="edit_icon"></i>
                                Edit
                            </button>
                            <button
                                className="hover_green transit"
                                onClick={() => ImageInputRef.current.click()}
                            >
                                <i className="addPhoto_icon"></i>
                                Add Photos/Videos
                            </button>
                        </div>
                        <div
                            className="small_white_circle transit"
                            onClick={() => setImages([])}
                        >
                            <i className="exit_icon"></i>
                        </div>
                        {/*images grid formatting*/}
                        <div
                            className={
                                images.length === 1
                                    ? 'preview1'
                                    : images.length === 2
                                    ? 'preview2'
                                    : images.length === 3
                                    ? 'preview3'
                                    : images.length === 4
                                    ? 'preview4'
                                    : images.length === 5
                                    ? 'preview5'
                                    : images.length % 2 === 0
                                    ? 'preview6'
                                    : 'preview6 singular_grid'
                            }
                        >
                            {images.map((img, i) => (
                                <img src={img} key={i} alt="uploaded image" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="add_pics_inside1">
                        <div
                            className="small_white_circle"
                            onClick={() => setShowPrev(false)}
                        >
                            <i className="exit_icon"></i>
                        </div>
                        <div
                            className="add_col hover1"
                            onClick={() => ImageInputRef.current.click()}
                        >
                            <div className="add_circle">
                                <i className="addPhoto_icon"></i>
                            </div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                )}
                <div className="add_pics_inside2">
                    <div className="add_circle">
                        <i className="phone_icon"></i>
                    </div>
                    <div className="mobile_text">
                        Add photos from your mobile device.
                    </div>
                    <span className="addphone_btn">Add</span>
                </div>
            </div>
        </div>
    )
}
