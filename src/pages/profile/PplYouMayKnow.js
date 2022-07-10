import './style.css'
import { Dots } from '../../svg'
import { stories } from '../../data/home'
import AddFriendSmallCard from './AddFriendSmallCard'

export default function PplYouMayKnow() {
    return (
        <div className="pplumayknow">
            <div className="pplumayknow_header">
                People You May Know
                <div className="post_header_right ppl_circle">
                    <Dots />
                </div>
            </div>
            <div className="pplumayknow_list">
                {stories.map((item, index) => (
                    <AddFriendSmallCard item={item} key={index} />
                ))}
            </div>
        </div>
    )
}
