export default function Shortcut({ link, img, name }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="shortcut_item hover3"
        >
            <img src={img} alt="Shortcut image" />
            <span>{name}</span>
        </a>
    )
}
