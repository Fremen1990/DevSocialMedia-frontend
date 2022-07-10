import { useCallback, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../helpers/getCroppedImg'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImages } from '../../functions/uploadImages'
import { updateprofilePicture } from '../../functions/user'
import { createPost } from '../../functions/post'
import { PulseLoader } from 'react-spinners'
import Cookies from 'js-cookie'

export default function UpdateProfilePicture({
    setImage,
    image,
    setError,
    setShow,
    profileImgRef,
}) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => ({ ...state }))
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const sliderRef = useRef(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])
    const zoomIn = () => {
        sliderRef.current.stepUp()
        setZoom(sliderRef.current.value)
    }

    const zoomOut = () => {
        sliderRef.current.stepDown()
        setZoom(sliderRef.current.value)
    }
    const getCroppedImage = useCallback(
        async (show) => {
            try {
                const img = await getCroppedImg(image, croppedAreaPixels)
                if (show) {
                    setZoom(1)
                    setCrop({ x: 0, y: 0 })
                    setImage(img)
                } else {
                    return img
                }
            } catch (error) {
                console.log(error)
            }
        },
        [croppedAreaPixels]
    )

    const updateProfilePicture = async () => {
        setLoading(true)
        console.log('LOADING STATE', loading)
        try {
            let img = await getCroppedImage()
            let blob = await fetch(img).then((b) => b.blob())
            const path = `${user.username}/profile_pictures`
            let formData = new FormData()
            formData.append('file', blob)
            formData.append('path', path)
            const res = await uploadImages(formData, path, user.token)
            const updated_picture = await updateprofilePicture(
                res[0].url,
                user.token
            )
            if (updated_picture === 'ok') {
                const new_post = await createPost(
                    'profilePicture',
                    null,
                    description,
                    res,
                    user.id,
                    user.token
                )
                if (new_post === 'ok') {
                    setLoading(false)
                    setImage('')
                    profileImgRef.current.style.backgroundImage = `url(${res[0].url})`
                    Cookies.set(
                        'user',
                        JSON.stringify({
                            ...user,
                            picture: res[0].url,
                        })
                    )
                    dispatch({
                        type: 'UPDATE_PICTURE',
                        payload: res[0].url,
                    })
                    setShow(false)
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
            setError(error.response.data.error)
        }
    }

    // useEffect(() => {
    //     return function cleanup() {
    //         setDescription('')
    //         setCroppedAreaPixels(null)
    //         setCrop({ x: 0, y: 0 })
    //         setZoom(1)
    //         setLoading(false)
    //     }
    // }, [])

    return (
        <div className="postBox update_img">
            <div className="box_header">
                <div className="small_circle" onClick={() => setImage('')}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update profile picture</span>
            </div>
            <div className="update_image_desc">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea_blue details_input"
                ></textarea>
            </div>
            <div className="update_center">
                <div className="crooper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        showGrid={false}
                    />
                </div>
                <div className="slider">
                    <div
                        className="slider_circle hover3"
                        onClick={() => zoomOut()}
                    >
                        <i className="minus_icon"></i>
                    </div>
                    <input
                        ref={sliderRef}
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                    <div
                        className="slider_circle hover3"
                        onClick={() => zoomIn(0)}
                    >
                        <i className="plus_icon"></i>
                    </div>
                </div>
            </div>
            <div className="flex_up">
                <div
                    className="gray_btn"
                    onClick={() => getCroppedImage('show')}
                >
                    <i className="crop_icon"></i> Crop photo
                </div>
                <div className="gray_btn">
                    <i className="temp_icon"></i>Make Temporary
                </div>
            </div>
            <div className="flex_p_t">
                <i className="public_icon"></i>
                Your profile picture is public
            </div>
            <div className="update_submit_wrap" onClick={() => setImage('')}>
                <div className="gray_btn">Cancel</div>
                <button
                    disabled={loading}
                    className="green_btn"
                    onClick={() => updateProfilePicture()}
                >
                    {loading ? <PulseLoader color="#fff" size={8} /> : 'Save'}
                </button>
            </div>
        </div>
    )
}
