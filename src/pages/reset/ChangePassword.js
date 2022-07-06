import React from 'react'
import { Form, Formik } from 'formik'
import LoginInput from '../../components/inputs/loginInput'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

export default function ChangePassword({
    password,
    setPassword,
    conf_password,
    setConf_password,
    error,
    setLoading,
    userInfos,
    setError,
}) {
    const navigate = useNavigate()
    const validatePassword = Yup.object({
        password: Yup.string()
            .required(
                'Enter a combination of at least six numbers, letters and punctuation marks (as ! abd &)'
            )
            .min(6, 'Password must be at least 6 characters')
            .max(64, 'Password cannot be more than 64 characters'),

        conf_password: Yup.string()
            .required('Confirm your password')
            .oneOf([Yup.ref('password')], 'Password must match'),
    })

    const { email } = userInfos

    const changePassword = async () => {
        try {
            setLoading(true)
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
                { email, password }
            )
            setError('')
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            setError(setError(error.response.data.message))
        }
    }

    return (
        <div className="reset_form">
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Type a new password:</div>
            <Formik
                enableReinitialize
                initialValues={{
                    password,
                    conf_password,
                }}
                validationSchema={validatePassword}
                onSubmit={() => changePassword()}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                        />{' '}
                        <LoginInput
                            type="password"
                            name="conf_password"
                            onChange={(e) => setConf_password(e.target.value)}
                            placeholder="Confirm new password"
                            bottom
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">
                                Cancel
                            </Link>
                            <button type="submit" className="green_btn">
                                Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
