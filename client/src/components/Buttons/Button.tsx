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
    disabled,
    className,
    ...rest
}: ButtonProps) {
    return (
        <button
            {...rest}
            color={color}
            className={`px-3 py-1.5 text-sm rounded-md leading-6 text-white bg-brand-primary-muted shadow-slate-700 shadow border-none font-medium w-auto select-none touch-manipulation transition-all hover:bg-brand-primary-light focus:!outline-none ${
                variant === 'primary' &&
                'bg-brand-primary hover:bg-brand-primary/60'
            }
            ${
                variant === 'secondary' &&
                'bg-brand-secondary hover:bg-brand-secondary/60'
            }
            ${disabled && 'bg-slate-600/40 text-slate-600 pointer-events-none'}
            ${className ? className : ''}`}
        >
            {icon && <i className="icon">{icon}</i>}
            {label}
        </button>
    );
}
