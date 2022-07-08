import './style.css'
const reactsArray = [
    {
        name: 'like',
        image: '../../../reacts/like.gif',
    },
    {
        name: 'love',
        image: '../../../reacts/love.gif',
    },
    {
        name: 'haha',
        image: '../../../reacts/haha.gif',
    },
    {
        name: 'wow',
        image: '../../../reacts/wow.gif',
    },
    {
        name: 'sad',
        image: '../../../reacts/sad.gif',
    },
    {
        name: 'angry',
        image: '../../../reacts/angry.gif',
    },
]

export default function ReactsPopup({ visible, setVisible }) {
    return (
        <>
            {visible && (
                <div
                    className="reacts_popup"
                    onMouseOver={() => {
                        setTimeout(() => {
                            setVisible(true)
                        }, 600)
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setVisible(false)
                        }, 600)
                    }}
                >
                    {reactsArray.map((react, i) => (
                        <div className="react" key={i}>
                            <img src={react.image} alt="react icon" />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
