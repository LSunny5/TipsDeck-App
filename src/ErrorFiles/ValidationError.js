import React from 'react';
import './ValidationError.css';

/* validation template used for various form errors */
export default function ValidationError(props) {
    if (props.message) {
        return (
            <div className="error">
                {props.message}
            </div>
        );
    }
    return <></>
}