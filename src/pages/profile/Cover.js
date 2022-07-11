import './style.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import useClickOutside from '../../helpers/clickOutside'
import { handleImage } from '../../functions/handleImage'
import ErrorHandler from '../../components/errors/ErrorHandler'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../helpers/getCroppedImg'
import { uploadImages } from '../../functions/uploadImages'
import { updateCover } from '../../functions/user'
import { createPost } from '../../functions/post'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import OldCovers from './OldCovers'

export default function Cover({ cover, visitor, photos }) {
    const [showCoverMenu, setShowCoverMenu] = useState(false)
    const [coverPicture, setCoverPicture] = useState('')
    const [error, setError] = useState('')
    const coverMenuRef = useRef(null)
    const refInput = useRef(null)
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    const coverUpdateRef = useRef(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    useClickOutside(coverMenuRef, () => setShowCoverMenu(false))

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    // const zoomIn = () => {
    //     sliderRef.current.stepUp()
    //     setZoom(sliderRef.current.value)
    // }
    //
    // const zoomOut = () => {
    //     sliderRef.current.stepDown()
    //     setZoom(sliderRef.current.value)
    // }
    // eslint-disable-next-line no-unused-vars
    const getCroppedImage = useCallback(
        async (show) => {
            try {
                const img = await getCroppedImg(coverPicture, croppedAreaPixels)
                if (show) {
                    setZoom(1)
                    setCrop({ x: 0, y: 0 })
                    setCoverPicture(img)
                } else {
                    return img
                }
            } catch (error) {
                console.log(error)
            }
        },
        [croppedAreaPixels]
    )
    const coverRef = useRef(null)
    const [width, setWidth] = useState('')
    useEffect(() => {
        setWidth(coverRef.current.clientWidth)
    }, [window.innerWidth])

    const updateCoverPicture = async () => {
        try {
            setLoading(true)
            let img = await getCroppedImage()
            let blob = await fetch(img).then((b) => b.blob())
            const path = `${user.username}/cover_pictures`
            let formData = new FormData()
            formData.append('file', blob)
            formData.append('path', path)
            const res = await uploadImages(formData, path, user.token)
            const updated_picture = await updateCover(res[0].url, user.token)
            if (updated_picture === 'ok') {
                const new_post = await createPost(
                    'coverPicture',
                    null,
                    null,
                    res,
                    user.id,
                    user.token
                )
                if (new_post === 'ok') {
                    setLoading(false)
                    setCoverPicture('')
                    coverUpdateRef.current.src = res[0].url
                } else {
                    setLoading(false)
                    setError(new_post)
                }
            } else {
                setLoading(false)
                setError(updated_picture)
            }
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <div className="profile_cover" ref={coverRef}>
            {coverPicture && (
                <div className="save_changes_cover">
                    <div className="save_changes_left">
                        <i className="public_icon"></i>
                        Your cover photo is public
                    </div>
                    <div className="save_changes_right">
                        <button
                            className="green_btn opacity_btn"
                            onClick={() => setCoverPicture('')}
                        >
                            Cancel
                        </button>
                        <button
                            className="green_btn"
                            onClick={() => updateCoverPicture()}
                        >
                            {loading ? (
                                <PulseLoader color="#fff" size={8} />
                            ) : (
                                'Save changes'
                            )}
                        </button>
                    </div>
                </div>
            )}
            <input
                type="file"
                ref={refInput}
                hidden
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={(e) => handleImage(e, setCoverPicture, setError)}
            />
            {error && <ErrorHandler setError={setError} />}
            {coverPicture && (
                <div className="cover_cropper">
                    <Cropper
                        image={coverPicture}
                        crop={crop}
                        zoom={zoom}
                        aspect={width / 350}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={true}
                        objectFit="horizontal-cover"
                    />
                </div>
            )}
            {cover && !coverPicture && (
                <img
                    src={cover}
                    alt="profile cover"
                    className="cover"
                    ref={coverUpdateRef}
                />
            )}
            {!visitor && (
                <div className="udpate_cover_wrapper" ref={coverMenuRef}>
                    <div
                        className="open_cover_update"
                        onClick={() => setShowCoverMenu((prev) => !prev)}
                    >
                        <i className="camera_filled_icon"></i>
                        Add Cover Photo
                    </div>
                    {showCoverMenu && (
                        <div className="open_cover_menu">
                            <div
                                className="open_cover_menu_item hover1"
                                onClick={() => {
                                    setShow(true)
                                    setShowCoverMenu(false)
                                }}
                            >
                                <i className="photo_icon"></i>Select Photo
                            </div>
                            <div
                                className="open_cover_menu_item hover1"
                                onClick={() => {
                                    refInput.current.click()
                                    setShowCoverMenu(false)
                                }}
                            >
                                <i className="upload_icon"></i>Upload Photo
                            </div>
                        </div>
                    )}
                </div>
            )}
            {show && (
                <OldCovers
                    photos={photos}
                    setCoverPicture={setCoverPicture}
                    setShow={setShow}
                />
            )}
        </div>
    )
}
