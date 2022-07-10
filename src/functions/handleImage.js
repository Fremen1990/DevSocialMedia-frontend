export const handleImage = (e, setImage, setError) => {
    let file = e.target.files[0]
    if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/gif' &&
        file.type !== 'image/webp'
    ) {
        setError(`${file.name} is not supported`)
        return
    } else if (file.size > 1024 * 1024 * 5) {
        setError(`${file.name} is too heavy, max size 5MB allowed`)
        return
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
        setImage(event.target.result)
    }
}
