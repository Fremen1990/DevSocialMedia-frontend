import { Form, Formik } from 'formik'
import RegisterInput from '../inputs/registerInput'
import { useState } from 'react'

const userInfos = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: '',
    bMonth: '',
    bDay: '',
    gender: '',
}

function RegisterForm(props) {
    const [user, setUser] = useState(userInfos)

    const handleRegisterChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    return (
        <div className="blur">
            <div className="register">
                <div className="register_header">
                    <i className="exit_icon"></i>
                    <span>Sign Up</span>
                    <span>It's quick and easy</span>
                </div>
                <Formik>
                    {(formik) => (
                        <Form>
                            <div className="regi_line">
                                <RegisterInput
                                    type="text"
                                    placeholder="First name"
                                    name="first_name"
                                    onChange={handleRegisterChange}
                                />
                                <RegisterInput
                                    type="text"
                                    placeholder="Last name"
                                    name="last_name"
                                    onChange={handleRegisterChange}
                                />
                                <div className="reg_line">
                                    <RegisterInput
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        onChange={handleRegisterChange}
                                    />
                                </div>
                                <div className="reg_line">
                                    <RegisterInput
                                        type="password"
                                        placeholder="Your password"
                                        name="password"
                                        onChange={handleRegisterChange}
                                    />
                                </div>

                                <div className="reg_col">
                                    <div className="reg_line_header">
                                        Date of birth{' '}
                                        <i className="info_icon"></i>
                                    </div>
                                    <div className="reg_grid">
                                        <select name="bDay">
                                            <option>12</option>
                                        </select>
                                        <select name="bMonth">
                                            <option>12</option>
                                        </select>
                                        <select name="bYear">
                                            <option>12</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="reg_col">
                                    <div className="reg_line_header">
                                        Gender
                                        <i className="info_icon"></i>
                                    </div>
                                    <div className="reg_grid">
                                        <label htmlFor="male">
                                            Male
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="male"
                                                onChange={handleRegisterChange}
                                            />
                                        </label>
                                        <label htmlFor="female">
                                            Female
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="female"
                                                onChange={handleRegisterChange}
                                            />
                                        </label>
                                        <label htmlFor="custom">
                                            Custom
                                            <input
                                                type="radio"
                                                name="gender"
                                                id="custom"
                                                onChange={handleRegisterChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className="reg_infos">
                                    By clicking Sign Up, you agree to{' '}
                                    <span>Terms, Data Policy &nbsp;</span> and{' '}
                                    <span>Cookie Policy.</span>You may receive
                                    SMS notification from us and can opt at any
                                    time.
                                </div>
                                <div className="reg_btn_wrapper">
                                    <button className="blue_btn open_signup">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default RegisterForm
