import './style.css'

export default function AddFriendSmallCard({ item }) {
    return (
        <div className="addfriendCard">
            <div className="addfriend_imgsmall">
                <img
                    src={item.profile_picture}
                    alt="add friend profile picture"
                />
                <div className="addfiend_infos">
                    <div className="addfriend_name">
                        {item.profile_name.length > 15
                            ? `${item.profile_name.substring(0, 15)}...`
                            : item.profile_name}
                    </div>

                    <div className="light_blue_btn">
                        <img src="/icons/addFriend.png" alt="add friend icon" />
                        Add Friend
                    </div>
                </div>
            </div>
        </div>
    )
}
