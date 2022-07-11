export default function Bio({
    infos,
    handleChange,
    max,
    setShowBio,
    updateDetails,
    placeholder,
    name,
    detail,
    setShow,
    rel,
}) {
    return (
        <div className="add_bio_wrap">
            {rel ? (
                <select
                    className="select_rel"
                    name={name}
                    value={infos.relationship}
                    onChange={handleChange}
                >
                    <option value="Single">Single</option>
                    <option value="In a relationship">In a relationship</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Programmer">Programmer</option>
                </select>
            ) : (
                <textarea
                    placeholder={placeholder}
                    name={name}
                    value={infos?.[name]}
                    maxLength={detail ? 25 : 100}
                    onChange={handleChange}
                    className="textarea_blue details_input"
                ></textarea>
            )}

            {!detail && (
                <div className="remaining">{max} character remaining </div>
            )}
            <div className="flex">
                <div className="flex flex_left">
                    <i className="public_icon"></i>Public
                </div>
                <div className="flex flex_right">
                    <button
                        className="gray_btn"
                        onClick={() =>
                            !detail ? setShowBio(false) : setShow(false)
                        }
                    >
                        Cancel
                    </button>
                    <button
                        className="green_btn"
                        onClick={() => {
                            updateDetails()
                            setShow(false)
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
