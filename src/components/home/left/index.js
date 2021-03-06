import './style.css'
import LeftLink from './LeftLink'

import { left } from '../../../data/home'
import { Link } from 'react-router-dom'
import { ArrowDown1 } from '../../../svg'
import { useState } from 'react'
import Shortcut from './Shortcut'
import SmallFooter from '../../footers/SmallFooter'

export default function LeftHome({ user }) {
    const [visible, setVisible] = useState(false)
    return (
        <div className="left_home scrollbar">
            <Link to="/profile" className="left_link hover2">
                <img src={user?.picture} alt="" />
                <span>
                    {user?.first_name} {user.last_name}
                </span>
            </Link>
            {left.slice(0, 8).map((link, index) => (
                <LeftLink
                    key={index}
                    img={link.img}
                    text={link.text}
                    notification={link.notification}
                />
            ))}
            {!visible && (
                <div
                    className="left_link hover3"
                    onClick={() => setVisible(true)}
                >
                    <div className="small_circle">
                        <ArrowDown1 />
                    </div>
                    <span>See more</span>
                </div>
            )}
            {visible && (
                <div className="more_left">
                    {left.slice(8, left.length).map((link, index) => (
                        <LeftLink
                            key={index}
                            img={link.img}
                            text={link.text}
                            notification={link.notification}
                        />
                    ))}
                    <div
                        className="left_link hover3"
                        onClick={() => setVisible(false)}
                    >
                        <div className="small_circle rotate180">
                            <ArrowDown1 />
                        </div>
                        <span>Show less</span>
                    </div>
                </div>
            )}
            <div className="splitter"></div>
            <div className="shortcut">
                <div className="heading">Your shortcuts</div>
                <div className="edit_shortcuts">Edit</div>
            </div>
            <div className="shortcut_list">
                <Shortcut
                    link="https://www.youtube.com/channel/UCBLpRt0eCUra9bF9rF-QAMw"
                    img="/images/ytb.png"
                    name="Best YouTube Channel"
                />

                <Shortcut
                    link="https://www.instagram.com"
                    img="/images/insta.png"
                    name="Instagram Channel"
                />
            </div>
            <SmallFooter visible={visible} />
        </div>
    )
}
