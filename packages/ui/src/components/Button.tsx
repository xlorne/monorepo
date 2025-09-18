import './Button.scss';
import { ButtonProps } from "@xlorne/ui-api";
import * as React from "react";

export const Button:React.FC<ButtonProps> = (props) => {
    const { primary = false, size = 'medium', backgroundColor, label } = props;
    const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';

    React.useImperativeHandle(props.actionRef, () => {
        return {
            getLabel: () => {
                return label;
            }
        }
    },[props.actionRef]);

    return (
        <button
            type="button"
            className={['demo-button', `demo-button--${size}`, mode].join(' ')}
            style={{backgroundColor}}
            {...props}
        >
            {label}
        </button>
    );
};
