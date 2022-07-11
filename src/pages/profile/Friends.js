import './style.css'
import SmallFooter from '../../components/footers/SmallFooter'
import { Link } from 'react-router-dom'

// eslint-disable-next-line no-unused-vars
export default function Friends({ friends }) {
    return (
        <div className="profile_card">
            <div className="profile_card_header">
                Friends
                <div className="profile_header_link">See all friends</div>
            </div>
            {friends && (
                <div className="profile_card count">
                    {friends.length === 0
                        ? ''
                        : friends.length === 1
                        ? '1 Friend'
                        : `${friends.length} Friends`}
                </div>
            )}
            <div className="profile_card_grid">
                {friends &&
                    friends.slice(0, 9).map((friend) => (
                        <Link
                            to={`/profile/${friend.username}`}
                            key={friend.username}
                        >
                            <div className="profile_photo_card">
                                <img
                                    src={friend.picture}
                                    alt="friend picture"
                                />
                                <span>
                                    {friend.first_name} {friend.last_name}
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
            <SmallFooter visible />
        </div>
    )
}
