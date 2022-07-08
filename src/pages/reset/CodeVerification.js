import React from 'react'
import { Form, Formik } from 'formik'
import LoginInput from '../../components/inputs/loginInput'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

export default function CodeVerification({
    code,
    setCode,
    error,
    setError,
    setLoading,
    setVisible,
    userInfos,
}) {
    const validateCode = Yup.object({
        code: Yup.string()
            .required('Code is required')
            .min('4', 'Code must be 4 characters')
            .max('4', 'Code must be 4 characters'),
    })

    const { email } = userInfos

    const verifyCode = async () => {
        try {
            setLoading(true)
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
                { email, code }
            )
            setError('')
            setLoading(false)
            setVisible(3)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message)
        }
    }

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code verification</div>
            <div className="reset_form_text">
                Please enter code that been sent to your email.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    code,
                }}
                validationSchema={validateCode}
                onSubmit={() => {
                    verifyCode()
                }}
            >
                {/* eslint-disable-next-line no-unused-vars */}
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="code"
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Code"
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
