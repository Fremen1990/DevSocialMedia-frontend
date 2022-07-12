import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    acceptRequest,
    cancelRequest,
    deleteRequest,
} from '../../functions/user'

export default function Card({ userr, type, getData }) {
    const { user } = useSelector((state) => ({ ...state }))
    const cancelRequestHandler = async (userId) => {
        const res = await cancelRequest(userId, user.token)
        if (res == 'ok') {
            getData()
        }
    }
    const confirmHandler = async (userId) => {
        const res = await acceptRequest(userId, user.token)
        if (res == 'ok') {
            getData()
        }
    }
    const deleteHandler = async (userId) => {
        const res = await deleteRequest(userId, user.token)
        if (res == 'ok') {
            getData()
        }
    }
    return (
        <div className="req_card hover3">
            <Link to={`/profile/${userr.username}`}>
                <img src={userr.picture} alt="user picture" />
            </Link>
            <div className="req_name">
                {userr?.first_name} {userr?.last_name}
            </div>
            {type === 'sent' ? (
                <button
                    className="red_btn"
                    onClick={() => cancelRequestHandler(userr._id)}
                >
                    Cancel Request
                </button>
            ) : type === 'request' ? (
                <>
                    <button
                        className="green_btn"
                        onClick={() => confirmHandler(userr._id)}
                    >
                        Confirm
                    </button>
                    <button
                        className="red_btn"
                        onClick={() => deleteHandler(userr._id)}
                    >
                        Reject
                    </button>
                </>
            ) : (
                <Link to={`/profile/${userr.username}`}>
                    <button className="green_btn">Friend Profile</button>
                </Link>
            )}
        </div>
    )
}
