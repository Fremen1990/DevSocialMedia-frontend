import './style.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import useClickOutside from '../../helpers/clickOutside'
import { handleImage } from '../../functions/handleImage'
import ErrorHandler from '../../components/errors/ErrorHandler'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../helpers/getCroppedImg'

export default function Cover({ cover, visitor }) {
    const [showCoverMenu, setShowCoverMenu] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [coverPicture, setCoverPicture] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('')
    const coverMenuRef = useRef(null)
    const refInput = useRef(null)

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
    return (
        <div className="profile_cover" ref={coverRef}>
            <div className="save_changes_cover">
                <div className="save_changes_left">
                    <i className="public_icon"></i>
                    Your cover photo is public
                </div>
                <div className="save_changes_right">
                    <button className="green_btn opacity_btn">Cancel</button>
                    <button className="green_btn">Save changes</button>
                </div>
            </div>
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
            {cover && <img src={cover} alt="profile cover" className="cover" />}
            {!visitor && (
                <div className="update_cover_wrapper" ref={coverMenuRef}>
                    <div
                        className="open_cover_update"
                        onClick={() => setShowCoverMenu((prev) => !prev)}
                    >
                        <i className="camera_filled_icon"></i>
                        Add Cover Photo
                    </div>
                    {showCoverMenu && (
                        <div className="open_cover_menu">
                            <div className="open_cover_menu_item hover1">
                                <i className="photo_icon"></i>Select Photo
                            </div>
                            <div
                                className="open_cover_menu_item hover1"
                                onClick={() => refInput.current.click()}
                            >
                                <i className="upload_icon"></i>Upload Photo
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
