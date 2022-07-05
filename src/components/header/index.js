import './style.css'
import { Link } from 'react-router-dom'
import {
    LogoD,
    Search,
    HomeActive,
    Friends,
    Watch,
    Market,
    Gaming,
    Menu,
    Messenger,
    ArrowDown,
    Notifications,
} from '../../svg'
import { useSelector } from 'react-redux'

function Header() {
    const { user } = useSelector((user) => ({ ...user }))

    const color = '#65676b'

    return (
        <header>
            <div className="header_left">
                <Link to="/" className="header_logo">
                    <div className="circle">
                        <LogoD />
                    </div>
                </Link>
                <div className="search search1">
                    <Search color={color} />
                    <input
                        type="text"
                        placeholder="Search DevSocialMedia"
                        className="hide_input"
                    />
                </div>
            </div>
            <div className="header_middle">
                <Link to="/" className="middle_icon active">
                    <HomeActive color="green" />
                </Link>
                <Link to="/" className="middle_icon hover1 ">
                    <Friends color={color} />
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Watch color={color} />
                    <div className="middle_notification">9+</div>
                </Link>
                <Link to="/" className="middle_icon hover1">
                    <Market color={color} />
                </Link>{' '}
                <Link to="/" className="middle_icon hover1">
                    <Gaming color={color} />
                </Link>
            </div>

            <div className="header_right">
                <Link to="/profile" className="profile_link hover1">
                    <img src={user?.picture} alt="" />
                    <span>{user?.first_name}</span>
                </Link>
                <div className="circle_icon hover1">
                    <Menu />
                </div>
                <div className="circle_icon hover1">
                    <Messenger />
                </div>
                <div className="circle_icon hover1">
                    <Notifications />
                    <div className="right_notification">5</div>
                </div>
                <div className="circle_icon hover1">
                    <ArrowDown />
                </div>
            </div>
        </header>
    )
}

export default Header
