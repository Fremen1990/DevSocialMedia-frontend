import './style.css'
import { Dots } from '../../svg'
import { Link } from 'react-router-dom'

export default function ProfileMenu() {
    return (
        <div className="profile_menu_wrap">
            <div className="profile_menu">
                <Link to="/" className="profile_menu_active">
                    Posts
                </Link>
                <Link to="/" className="hover1">
                    About
                </Link>
                <Link to="/" className="hover1">
                    Friends
                </Link>
                <Link to="/" className="hover1">
                    Photos
                </Link>
                <Link to="/" className="hover1">
                    Videos
                </Link>
                <Link to="/" className="hover1">
                    Check-ins
                </Link>
                <Link to="/" className="p10_dots">
                    <Dots />
                </Link>
            </div>
        </div>
    )
}
