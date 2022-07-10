import './style.css'
export default function ErrorHandler({ error, setError }) {
    return (
        <div className="postError">
            <div className="postError_error">{error}</div>
            <button className="green_btn" onClick={() => setError('')}>
                Try again
            </button>
        </div>
    )
}
