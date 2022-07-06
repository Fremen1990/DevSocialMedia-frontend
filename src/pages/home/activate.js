import './style.css'
import Header from '../../components/header'
import LeftHome from '../../components/home/left'
import { useDispatch, useSelector } from 'react-redux'
import RightHome from '../../components/home/right'
import Stories from '../../components/home/stories'
import CreatePost from '../../components/createPost'
import { useEffect, useState } from 'react'
import ActivateForm from './ActivateForm'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Activate() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((user) => ({ ...user }))
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const { token } = useParams()

    const activateAccount = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/activate`,
                { token },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            )
            setSuccess(data.message)
            Cookies.set('user', JSON.stringify({ ...user, verified: true }))
            dispatch({ type: 'VERIFY', payload: true })
            setTimeout(() => {
                navigate('/')
            }, 3000)
        } catch (error) {
            setError(error.response.data.message)
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }

    useEffect(() => {
        activateAccount(token)
    }, [])

    return (
        <div className="home">
            {}
            <Header />
            {success && (
                <ActivateForm
                    type="success"
                    header="Account verification succeeded"
                    text={success}
                    loading={loading}
                />
            )}
            {error && (
                <ActivateForm
                    type="error"
                    header="Account verification failed"
                    text={error}
                    loading={loading}
                />
            )}
            <LeftHome user={user} />
            <div className="home_middle">
                <Stories />
                <CreatePost user={user} />
            </div>
            <RightHome user={user} />
        </div>
    )
}
