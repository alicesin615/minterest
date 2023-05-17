import React from 'react';

export const PrimaryText = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>, ref) => (
    <span className={`text-slate-4 ${className || ''}`} ref={ref} {...rest} />
));
