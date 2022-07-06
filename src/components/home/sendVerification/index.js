import './styles.css'
import { useState } from 'react'
import axios from 'axios'

export default function SendVerification({ user }) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const sendVerificationLink = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            )
            setSuccess(data.message)
        } catch (error) {
            setError(error.res.data.message)
        }
    }

    return (
        <div className="send_verification">
            <span>
                Your account is not verified, please verify before it gets
                deleted after one month since created.
            </span>

            {success && <div className="success_text">{success}</div>}
            {error && <div className="error_text">{error}</div>}
            <a onClick={() => sendVerificationLink()}>
                Click here to resend verification email
            </a>
        </div>
    )
}
