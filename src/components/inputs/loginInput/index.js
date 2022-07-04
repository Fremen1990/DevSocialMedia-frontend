import React from 'react'
import './style.css'
import { useField } from 'formik'

function LoginInput({ placeholder, ...props }) {
    const [field, meta] = useField(props)

    return (
        <div className="input_wrap">
            <input
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
        </div>
    )
}

export default LoginInput
