import React from 'react';

export const PrimaryText = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>, ref) => (
    <span className={`text-slate-2 ${className || ''}`} ref={ref} {...rest} />
));

export const SecondaryText = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>, ref) => (
    <span className={`text-slate-5 ${className || ''}`} ref={ref} {...rest} />
));

export const MutedText = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>, ref) => (
    <span className={`text-slate-6 ${className || ''}`} ref={ref} {...rest} />
));
