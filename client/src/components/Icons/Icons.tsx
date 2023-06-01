import { IconSVGProps } from './types';

export const MinterestIcon = ({ size = 16, ...rest }: IconSVGProps) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        version="1.1"
        viewBox="0 0 16 16"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path d="M15.802 2.102c-1.73-1.311-4.393-2.094-7.124-2.094-3.377 0-6.129 1.179-7.549 3.235-0.667 0.965-1.036 2.109-1.097 3.398-0.054 1.148 0.139 2.418 0.573 3.784 1.482-4.444 5.622-7.923 10.395-7.923 0 0-4.466 1.175-7.274 4.816-0.002 0.002-0.039 0.048-0.103 0.136-0.564 0.754-1.055 1.612-1.423 2.583-0.623 1.482-1.2 3.515-1.2 5.965h2c0 0-0.304-1.91 0.224-4.106 0.873 0.118 1.654 0.177 2.357 0.177 1.839 0 3.146-0.398 4.115-1.252 0.868-0.765 1.347-1.794 1.854-2.882 0.774-1.663 1.651-3.547 4.198-5.002 0.146-0.083 0.24-0.234 0.251-0.402s-0.063-0.329-0.197-0.431z"></path>
    </svg>
);
export const QuestionMarkIcon = ({ size = 16, ...rest }: IconSVGProps) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 0 0-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"></path>
    </svg>
);
export const CheckIcon = ({ size = 20, ...rest }: IconSVGProps) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        aria-hidden="true"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
        ></path>
    </svg>
);
export const EmptyCheckIcon = ({ size = 20, ...rest }: IconSVGProps) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...rest}
    >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
);
