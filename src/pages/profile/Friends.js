import './style.css'
import SmallFooter from '../../components/footers/SmallFooter'

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
                        ? '1 Photo'
                        : `${friends.length} friends`}
                </div>
            )}
            <div className="profile_card_grid"></div>
            <SmallFooter visible />
        </div>
    )
}
