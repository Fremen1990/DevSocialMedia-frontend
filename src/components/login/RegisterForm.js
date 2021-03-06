import { Form, Formik } from 'formik'
import RegisterInput from '../inputs/registerInput'
import { useState } from 'react'
import * as Yup from 'yup'
import DateOfBirthSelect from './DateOfBirthSelect'
import GenderSelect from './GenderSelect'
import DotLoader from 'react-spinners/DotLoader'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm({ setVisible }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfos = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        bYear: new Date().getFullYear(),
        bMonth: new Date().getMonth() + 1,
        bDay: new Date().getDate(),
        gender: '',
    }

    const [user, setUser] = useState(userInfos)
    const {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
    } = user

    // Input state
    const [dateError, setDateError] = useState('')
    const [genderError, setGenderError] = useState('')

    //Submit state
    const [error, setError] = useState('')
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(false)

    // Generating new Areas with year month and day
    const yearTemp = new Date().getFullYear()
    const years = Array.from(new Array(108), (val, index) => yearTemp - index)
    const months = Array.from(new Array(12), (val, index) => 1 + index)
    const getDays = () => {
        return new Date(bYear, bMonth, 0).getDate()
    }
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index)

    const handleRegisterChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    // YUP form validation
    const registerValidation = Yup.object({
        first_name: Yup.string()
            .required('Whats your first name?')
            .min(2, 'First name must be between 2 and 16 characters')
            .max(16, 'First name must be between 2 and 16 characters')
            .matches(
                /^[aA-zZ]+$/,
                'Numbers and special characters are not allowed'
            ),
        last_name: Yup.string()
            .required('Whats your first name?')
            .min(2, 'First name must be between 2 and 16 characters')
            .max(16, 'First name must be between 2 and 16 characters')
            .matches(
                /^[aA-zZ]+$/,
                'Numbers and special characters are not allowed'
            ),
        email: Yup.string()
            .required(
                'You will need this when you log in and if you ever need to reset your password'
            )
            .email('Enter a valid email address'),
        password: Yup.string()
            .required(
                'Enter a combination of at least six numbers, letters and punctuation marks (as ! abd &)'
            )
            .min(6, 'Password must be at least 6 characters')
            .max(64, 'Password cannot be more than 64 characters'),
    })

    const registerSubmit = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/register`,
                {
                    first_name,
                    last_name,
                    email,
                    password,
                    bYear,
                    bMonth,
                    bDay,
                    gender,
                }
            )
            setError('')
            setSuccess(data.message)
            // setLoading(false)
            // eslint-disable-next-line no-unused-vars
            const { message, ...rest } = data

            setTimeout(() => {
                dispatch({ type: 'LOGIN', payload: rest })
                Cookies.set('user', JSON.stringify(rest))
                setLoading(false)
                navigate('/profile')
            }, 2000)
        } catch (error) {
            setLoading(false)
            setSuccess('')
            //error message from the backend
            setError(error.response.data.message)
        }
    }

    return (
        <div className="blur">
            <div className="register">
                <div className="register_header">
                    <i
                        className="exit_icon"
                        onClick={() => setVisible(false)}
                    ></i>
                    <span>Sign Up</span>
                    <span>It is quick and easy</span>
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        first_name,
                        last_name,
                        email,
                        password,
                        bYear,
                        bMonth,
                        bDay,
                        gender,
                    }}
                    validationSchema={registerValidation}
                    onSubmit={() => {
                        let current_date = new Date()
                        let picked_date = new Date(bYear, bMonth - 1, bDay)
                        let atleast14 = new Date(1970 + 14, 0, 1)
                        let noMoreThan70 = new Date(1970 + 70, 0, 1)
                        if (current_date - picked_date < atleast14) {
                            setDateError(
                                'it looks like you have entered the wrong info.Please make sure that you use your real date of birth.'
                            )
                        } else if (current_date - picked_date > noMoreThan70) {
                            setDateError(
                                'it looks like you have entered the wrong info.Please make sure that you use your real date of birth.'
                            )
                        } else if (gender === '') {
                            setDateError('')
                            setGenderError(
                                'Please choose a gender. You can change who can see this later.'
                            )
                        } else {
                            setDateError('')
                            setGenderError('')
                            registerSubmit()
                        }
                    }}
                >
                    {/* eslint-disable-next-line no-unused-vars */}
                    {(formik) => (
                        <Form className="register_form">
                            <div className="reg_line">
                                <RegisterInput
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    onChange={handleRegisterChange}
                                />
                                <RegisterInput
                                    type="text"
                                    placeholder="Surname"
                                    name="last_name"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="reg_line">
                                <RegisterInput
                                    type="text"
                                    placeholder="Mobile number or email address"
                                    name="email"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="reg_line">
                                <RegisterInput
                                    type="password"
                                    placeholder="New password"
                                    name="password"
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="reg_col">
                                <div className="reg_line_header">
                                    Date of birth <i className="info_icon"></i>
                                </div>
                                <DateOfBirthSelect
                                    bDay={bDay}
                                    bMonth={bMonth}
                                    bYear={bYear}
                                    days={days}
                                    months={months}
                                    years={years}
                                    handleRegisterChange={handleRegisterChange}
                                    dateError={dateError}
                                />
                            </div>
                            <div className="reg_col">
                                <div className="reg_line_header">
                                    Gender <i className="info_icon"></i>
                                </div>

                                <GenderSelect
                                    handleRegisterChange={handleRegisterChange}
                                    genderError={genderError}
                                />
                            </div>
                            <div className="reg_infos">
                                By clicking Sign Up, you agree to our{' '}
                                <span>Terms, Data Policy &nbsp;</span>
                                and <span>Cookie Policy.</span> You may receive
                                SMS notifications from us and can opt out at any
                                time.
                            </div>
                            <div className="reg_btn_wrapper">
                                <button className="blue_btn open_signup">
                                    Sign Up
                                </button>
                            </div>
                            <DotLoader
                                color="#1876f2"
                                loading={loading}
                                size={30}
                            />
                            {error && <div className="error_text">{error}</div>}
                            {success && (
                                <div className="success_text">{success}</div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
