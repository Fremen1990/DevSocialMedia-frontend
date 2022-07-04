import './style.css'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/login/LoginForm'
import Footer from '../../components/login/Footer'

export default function Login() {
    return (
        <div className="login">
            <div className="login_wrapper">
                <LoginForm />
                <div className="register"></div>
                <Footer />
            </div>
        </div>
    )
}
