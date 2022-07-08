import axios from 'axios'

export const createPost = async (
    type,
    background,
    text,
    images,
    user,
    token
) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/createPost`,
            { type, background, text, images, user },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return 'ok'
    } catch (error) {
        return error.response.data.message
    }
}
