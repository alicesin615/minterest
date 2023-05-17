import { PrimaryText } from '.';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
};
export const Card = ({ title, children, className, ...rest }: CardProps) => {
    return (
        <div
            className={`shadow-card bg-slate-400/10 ring-1 ring-slate-800 rounded p-4 ${
                className ? className : ''
            }`}
            {...rest}
        >
            <PrimaryText className="font-medium">{title}</PrimaryText>
            {children}
        </div>
    );
};
