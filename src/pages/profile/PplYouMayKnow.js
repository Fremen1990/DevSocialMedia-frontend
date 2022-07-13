import './style.css'
import { Dots } from '../../svg'
// import { stories } from '../../data/home'
import AddFriendSmallCard from './AddFriendSmallCard'
import { getAllUsers } from '../../functions/user'
import { useEffect, useState } from 'react'

export default function PplYouMayKnow({ user, profile }) {
    const [pplUmayKnow, setPplUmayKnow] = useState([])

    const GetPplUmayKnow = async () => {
        const { users } = await getAllUsers(user.token)
        setPplUmayKnow(users)
    }

    useEffect(() => {
        GetPplUmayKnow()
    }, [])
    console.log('profile', profile)
    return (
        <div className="pplumayknow">
            <div className="pplumayknow_header">
                People You May Know
                <div className="post_header_right ppl_circle">
                    <Dots />
                </div>
            </div>
            <div className="pplumayknow_list">
                {pplUmayKnow.slice(0, 6).map((person, index) => (
                    <AddFriendSmallCard person={person} key={index} />
                ))}
            </div>
        </div>
    )
}
