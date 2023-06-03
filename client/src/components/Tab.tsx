type TabProps = React.HTMLAttributes<HTMLDivElement> & {
    label: string;
    active: boolean;
};

export function Tab({ label, active, onClick }: TabProps) {
    return (
        <div
            className={`px-3 py-1 flex items-center text-slate-400 hover:bg-brand-primary-light/10 hover:text-brand-primary h-fit cursor-pointer transition-all rounded ${
                active
                    ? '!text-brand-primary bg-brand-primary-light/10 font-medium'
                    : ''
            }`}
            onClick={onClick}
        >
            {label}
        </div>
    );
}
