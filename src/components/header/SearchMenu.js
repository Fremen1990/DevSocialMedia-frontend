import { Return, Search } from '../../svg'
import { useEffect, useRef, useState } from 'react'
import useClickOutside from '../../helpers/clickOutside'
import {
    addToSearchHistory,
    getSearchHistory,
    removeFromSearch,
    search,
} from '../../functions/user'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function SearchMenu({ color, setShowSearchMenu }) {
    const [iconVisible, setIconVisible] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const { user } = useSelector((state) => ({ ...state }))
    const [results, setResults] = useState([])
    const [searchHistory, setSearchHistory] = useState([])
    const menu = useRef(null)
    const input = useRef(null)
    useClickOutside(menu, () => {
        setShowSearchMenu(false)
    })

    const getHistory = async () => {
        const res = await getSearchHistory(user.token)
        setSearchHistory(res)
    }

    useEffect(() => {
        getHistory()
    }, [])

    useEffect(() => {
        input.current.focus()
    }, [])

    const searchHandler = async () => {
        if (searchTerm === '') {
            setResults('')
        } else {
            const res = await search(searchTerm, user.token)
            setResults(res)
        }
    }
    const addToSearchHistoryHandler = async (searchUser) => {
        // eslint-disable-next-line no-unused-vars
        const res = await addToSearchHistory(searchUser, user.token)
    }

    const handleRemove = async (searchUser) => {
        removeFromSearch(searchUser, user.token)
        getHistory()
    }

    return (
        <div className="header_left search_area scrollbar" ref={menu}>
            <div className="search_wrap">
                <div className="header_logo">
                    <div
                        className="circle hover1"
                        onClick={() => setShowSearchMenu(false)}
                    >
                        <Return color={color} />
                    </div>
                </div>
                <div className="search" onClick={() => input.current.focus()}>
                    {iconVisible && (
                        <div>
                            <Search color={color} />
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Search DevSocialMedia"
                        ref={input}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIconVisible(false)}
                        onBlur={() => setIconVisible(true)}
                        onKeyUp={searchHandler}
                    />
                </div>
            </div>
            {results === '' && (
                <div className="search_history_header">
                    <span>Recent searches</span>
                    <a>Edit</a>
                </div>
            )}
            <div className="search_history scrollbar">
                {searchHistory &&
                    results == '' &&
                    searchHistory
                        .sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt)
                        })
                        .map((user) => (
                            <div
                                className="search_user_item hover1"
                                key={user._id}
                            >
                                <Link
                                    className="flex"
                                    to={`/profile/${user.user.username}`}
                                    onClick={() => {
                                        addToSearchHistoryHandler(user.user._id)
                                        setShowSearchMenu(false)
                                    }}
                                >
                                    <img src={user.user.picture} alt="" />
                                    <span>
                                        {user.user.first_name}{' '}
                                        {user.user.last_name}
                                    </span>
                                </Link>
                                <i
                                    className="exit_icon"
                                    onClick={() => {
                                        handleRemove(user.user._id)
                                    }}
                                ></i>
                            </div>
                        ))}
            </div>
            <div className="search_results scrollbar">
                {results &&
                    results.map((user) => (
                        <Link
                            to={`/profile/${user.username}`}
                            key={user._id}
                            className="search_user_item hover3"
                            onClick={() => {
                                addToSearchHistoryHandler(user._id)
                                setShowSearchMenu(false)
                            }}
                        >
                            <img src={user.picture} alt="user picture" />
                            <span>
                                {user.first_name} {user.last_name}
                            </span>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default SearchMenu
