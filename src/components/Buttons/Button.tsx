import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
    label: string;
    variant?: 'primary' | 'secondary';
};

export function Button({
    label,
    color,
    icon,
    variant,
    className,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            color={color}
            className={`px-3 py-1.5 text-sm rounded-md leading-6 text-white bg-brand-primary-muted shadow-slate-700 shadow border-none font-medium w-auto select-none touch-manipulation transition-all hover:bg-brand-primary-light focus:!outline-none ${
                variant === 'primary' ? '' : ''
            } ${className ? className : ''}`}
        >
            {icon && <i className="icon">{icon}</i>}
            {label}
        </button>
    );
}
