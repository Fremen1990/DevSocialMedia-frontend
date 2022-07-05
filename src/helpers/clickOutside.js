import { useEffect } from 'react'

// Custom hook to detect click outside a component
export default function useClickOutside(ref, callback) {
    useEffect(() => {
        const listener = (e) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return
            }
            callback()
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        // cleaning up listeners
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref])
}
