import { Link } from 'react-router-dom'
import { useState } from 'react'
import SettingsPrivacy from './SettingsPrivacy'
import HelpSupport from './HelpSupport'
import DisplayAccessibility from './DisplayAccessibility'

export default function UserMenu({ user }) {
    const [visible, setVisible] = useState(0)

    return (
        <div className="mmenu">
            {visible === 0 && (
                <div>
                    <Link to="/profile" className="mmenu_header hover3">
                        <img src={user?.picture} alt="User picture" />

                        <div className="mmenu_col">
                            <span>
                                {user?.first_name} {user?.last_name}
                            </span>
                            <span>See your profile</span>
                        </div>
                    </Link>
                    <div className="mmenu_splitter"></div>
                    <div className="mmenu_main hover3">
                        <div className="small_circle">
                            <i className="report_filled_icon"></i>
                        </div>
                        <div className="mmenu_col">
                            <div className="mmenu_span1">Give feedback</div>
                            <div className="mmenu_span2">Help us improve</div>
                        </div>
                    </div>
                    <div className="mmenu_splitter"></div>
                    <div
                        className="mmenu_item hover3"
                        onClick={() => setVisible(1)}
                    >
                        <div className="small_circle">
                            <i className="settings_filled_icon"></i>
                        </div>
                        <span> Settings & Privacy</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>{' '}
                        </div>
                    </div>

                    <div
                        className="mmenu_item hover3"
                        onClick={() => setVisible(2)}
                    >
                        <div className="small_circle">
                            <i className="help_filled_icon"></i>
                        </div>
                        <span> Help & Support</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>{' '}
                        </div>
                    </div>

                    <div
                        className="mmenu_item hover3"
                        onClick={() => setVisible(3)}
                    >
                        <div className="small_circle">
                            <i className="dark_filled_icon"></i>
                        </div>
                        <span> Display & Accessibility</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>{' '}
                        </div>
                    </div>

                    <div className="mmenu_item hover3">
                        <div className="small_circle">
                            <i className="logout_filled_icon"></i>
                        </div>
                        <span> Logout</span>
                        <div className="rArrow">
                            <i className="right_icon"></i>{' '}
                        </div>
                    </div>
                </div>
            )}
            {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
            {visible === 2 && <HelpSupport setVisible={setVisible} />}
            {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
        </div>
    )
}
