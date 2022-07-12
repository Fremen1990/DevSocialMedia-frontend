import axios from 'axios'

export const getProfile = async (
    userName,
    user,
    dispatch,
    navigate,
    token,
    setPhotos
) => {
    const path = `${user.username}/*`
    const max = 30
    const sort = 'desc'
    try {
        dispatch({ type: 'PROFILE_REQUEST' })
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,

            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
        if (data.ok === false) {
            navigate('/')
        } else {
            try {
                const images = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/listImages`,
                    { path, sort, max },

                    {
                        header: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                setPhotos(images.data)
            } catch (error) {
                console.log(error)
            }

            dispatch({ type: 'PROFILE_SUCCESS', payload: data })
        }
    } catch (error) {
        dispatch({
            type: 'PROFILE_ERROR',
            payload: error.response.data.message,
        })
    }
}

export const getAllPosts = async (user, dispatch) => {
    console.log('USER FROM API CALLS', user.token)
    try {
        dispatch({ type: 'POSTS_REQUEST' })
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,

            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        )
        dispatch({
            type: 'POSTS_SUCCESS',
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: 'POSTS_ERROR',
            payload: error.data.response.message,
        })
    }
}
