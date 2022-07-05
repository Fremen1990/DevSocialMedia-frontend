import './style.css'

export default function LeftLink({ img, text, notification }) {
    console.log('IMAGE', img)
    return (
        <div className="left_link hover1">
            <img src={`/left/${img}.png`} alt="Left link image" />
            {notification !== undefined ? (
                <div className="col">
                    <div className="col_1">{text}</div>
                    <div className="col_2">{notification}</div>
                </div>
            ) : (
                <span>{text}</span>
            )}
        </div>
    )
}
