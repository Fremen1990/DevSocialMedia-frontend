import { Link } from 'react-router-dom'

export default function SmallFooter({ visible }) {
    return (
        <div className={`fb_copyright ${visible && 'relative_fb_copyright'}`}>
            <Link to="/">Privacy</Link> <span>. </span>
            <Link to="/">Terms</Link> <span>. </span>
            <Link to="/">Advertising</Link> <span>. </span>
            <Link to="/">
                Ad Choices <i className="ad_choices_icon"></i>{' '}
            </Link>{' '}
            <span>. </span>
            <Link to="/">Cookies </Link> <span>. </span>
            <Link to="/">More </Link> <span>. </span> <br />
            DevThomas © 2022
        </div>
    )
}
