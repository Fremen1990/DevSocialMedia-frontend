import React from 'react'
import './style.css'
import { useMediaQuery } from 'react-responsive'
import { ErrorMessage, useField } from 'formik'

// eslint-disable-next-line no-unused-vars
function RegisterInput({ placeholder, bottom, ...props }) {
    const [field, meta] = useField(props)

    //Responsiveness with 'react-responsive
    const view1 = useMediaQuery({
        query: '(min-width:539px',
    })

    // eslint-disable-next-line no-unused-vars
    const view2 = useMediaQuery({
        query: '(min-width:850px',
    })
    const view3 = useMediaQuery({
        query: '(min-width:1170px',
    })
    const testView1 = view3 && field.name === 'first_name'
    const testView2 = view3 && field.name === 'last_name'

    return (
        <div className="input_wrap register_input_wrap">
            <input
                className={
                    meta.touched && meta.error ? 'input_error_border' : ''
                }
                style={{
                    width: `${
                        view1 &&
                        (field.name === 'first_name' ||
                            field.name === 'last_name')
                            ? '100%'
                            : view1 &&
                              (field.name === 'email' ||
                                  field.name === 'password')
                            ? '370px'
                            : '300px'
                    }`,
                }}
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error && (
                <div
                    className={
                        view3
                            ? 'input_error input_error_desktop'
                            : 'input_error'
                    }
                    style={{
                        transform: 'translateY(3px)',
                        left: `${
                            testView1 ? '-107%' : testView2 ? '107%' : ''
                        }`,
                    }}
                >
                    {meta.touched && meta.error && (
                        <ErrorMessage name={field.name} />
                    )}

                    {meta.touched && meta.error && (
                        <div
                            className={
                                view3 && field.name !== 'last_name'
                                    ? 'error_arrow_left'
                                    : view3 && field.name === 'last_name'
                                    ? 'error_arrow_right'
                                    : !view3 && 'error_arrow_bottom'
                            }
                        ></div>
                    )}
                </div>
            )}

            {meta.touched && meta.error && <i className="error_icon"></i>}
        </div>
    )
}

export default RegisterInput
