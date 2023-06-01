type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement> & {
    label: string;
};

export function EmptyPlaceholder({ label, className }: EmptyPlaceholderProps) {
    return (
        <div
            className={`${
                className ? className : ''
            } text-brand-secondary text-sm `}
        >
            {label}
        </div>
    );
}
