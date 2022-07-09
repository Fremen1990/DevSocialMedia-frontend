import axios from 'axios'

export const getProfile = async (userName, user, dispatch, navigate) => {
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
            navigate('/profileNotFound')
        } else {
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
    try {
        dispatch({ type: 'POSTS_REQUEST' })
        const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
            {
                header: {
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
