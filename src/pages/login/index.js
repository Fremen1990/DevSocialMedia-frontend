import './style.css'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import LoginInput from '../../components/inputs/loginInput'
import { useState } from 'react'

const loginInfos = {
    email: '',
    login: '',
}

export default function Login() {
    const [login, setLogin] = useState(loginInfos)
    const { email, password } = login

    console.log(login)

    const handleLoginChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    // Yup validation checks
    const loginValidation = Yup.object({
        email: Yup.string()
            .required('Email address is required')
            .email('Must be a valid email')
            .max(64, 'Email cannot have more than 64 characters')
            .min(6, 'Email cannot have less than 6 characters'),

        password: Yup.string().required('Password is required'),
    })

    return (
        <div className="login">
            <div className="login_wrapper">
                <div className="login_wrap">
                    <div className="login_1">
                        {/*<img src="../../icons/facebook.svg" alt="" />*/}
                        <div className="login_1_logo">DevSocialMedia</div>
                        <span>
                            DevScoailMedia helps you connect and share with the
                            people around.
                        </span>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    email,
                                    password,
                                }}
                                validationSchema={loginValidation}
                            >
                                {(formik) => (
                                    <Form>
                                        <LoginInput
                                            type="email"
                                            name="email"
                                            placeholder={
                                                'Email address or phone number'
                                            }
                                            onChange={handleLoginChange}
                                        />
                                        <LoginInput
                                            type="password"
                                            name="password"
                                            placeholder={'password'}
                                            onChange={handleLoginChange}
                                            bottom
                                        />
                                        <button
                                            type="submit"
                                            className="blue_btn"
                                        >
                                            Log In
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <Link to="/forgot" className="forgot_password">
                                Forgotten password?
                            </Link>
                            <div className="sign_splitter"></div>
                            <button className="blue_btn open_signup">
                                Create Account
                            </button>
                        </div>
                        <Link to="/" className="sign_extra">
                            <b>Create a Page</b> for a celebrity, brand or
                            business.
                        </Link>
                    </div>
                </div>
                <div className="register"></div>
            </div>
        </div>
    )
}
