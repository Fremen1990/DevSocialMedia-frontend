import './style.css'
import { Link } from 'react-router-dom'

export default function AddFriendSmallCard({ person }) {
    return (
        <div className="addfriendCard">
            <div className="addfriend_imgsmall">
                <img src={person.picture} alt="add friend profile picture" />
                <div className="addfiend_infos">
                    <div className="addfriend_name">
                        {person.first_name.length + person.last_name.length > 15
                            ? person.first_name
                            : `${person.first_name} ${person.last_name}`}
                    </div>

                    <Link to={`/profile/${person.username}`}>
                        <div className="green_btn">
                            <img
                                src="/icons/addFriend.png"
                                alt="add friend icon"
                            />
                            Check Profile
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
