export default function PostError({ error, setError }) {
    return (
        <div className="postError">
            <div>{error}</div>
            <button className="green_btn" onClick={() => setError('')}>
                Try again
            </button>
        </div>
    )
}
