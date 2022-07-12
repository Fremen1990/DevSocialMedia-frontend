import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'

export default function DisplayAccessibility({ setVisible }) {
    const dispatch = useDispatch()
    const { darkTheme } = useSelector((state) => ({ ...state }))

    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="circle hover3" onClick={() => setVisible(0)}>
                    <i className="arrow_back_icon"></i>
                </div>
                Display & Accessibility
            </div>

            {/*  ------------ Dark mode ----------*/}
            <div className="mmenu_main">
                <div className="small_circle">
                    <i className="dark_filled_icon"></i>
                </div>
            </div>
            <div className="mmenu_col">
                <span className="mmenu_span1">Dark Mode</span>
                <span className="mmenu_span2">
                    Adjust the apperance of DevSocialMedia to reduce glare and
                    give your eyes a break.
                </span>
            </div>

            <label
                htmlFor="darkOff"
                className="hover3"
                onClick={() => {
                    Cookies.set('darkTheme', false)
                    dispatch({ type: 'LIGHT' })
                }}
            >
                <span>Off</span>

                {darkTheme ? (
                    <input
                        type="radio"
                        id="darkOff"
                        name="dark"
                        checked={darkTheme}
                    />
                ) : (
                    <input
                        type="radio"
                        id="darkOff"
                        name="dark"
                        checked={true}
                    />
                )}
            </label>

            <label
                htmlFor="darkOn"
                className="hover3"
                onClick={() => {
                    Cookies.set('darkTheme', true)
                    dispatch({ type: 'DARK' })
                }}
            >
                <span>On</span>

                {darkTheme ? (
                    <input
                        type="radio"
                        id="darkOn"
                        name="dark"
                        checked={darkTheme}
                    />
                ) : (
                    <input type="radio" id="darkOn" name="dark" />
                )}
            </label>

            {/*  ------------ Compact mode ----------*/}
            <div className="mmenu_main">
                <div className="small_circle">
                    <i className="compact_icon"></i>
                </div>
            </div>
            <div className="mmenu_col">
                <span className="mmenu_span1">Compact mode</span>
                <span className="mmenu_span2">
                    Make your font smaller and your screen more compact.
                </span>
            </div>

            <label htmlFor="compactOff" className="hover3">
                <span>Off</span>
                <input type="radio" id="compactOff" name="compact" />
            </label>

            <label htmlFor="compactOn" className="hover3">
                <span>On</span>
                <input type="radio" id="compactOn" name="compact" />
            </label>
            <div className="mmenu_item hover3">
                <div className="small_circle">
                    <i className="keyboard_icon"></i>
                </div>
                <span>Keyboard</span>
                <div className="rArrow">
                    <i className="right_icon"></i>
                </div>
            </div>
        </div>
    )
}
