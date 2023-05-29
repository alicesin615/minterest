import { SecondaryText } from '@components/Text';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
};
export const Card = ({ title, children, className, ...rest }: CardProps) => {
    return (
        <div
            className={`shadow-card bg-slate-400/10 ring-1 ring-slate-800 rounded p-6 ${
                className ? className : ''
            }`}
            {...rest}
        >
            <SecondaryText className="font-medium">{title}</SecondaryText>
            {children}
        </div>
    );
};
