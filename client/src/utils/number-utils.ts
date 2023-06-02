export function SigFigFormatter(number, sigFigLimit = 5) {
    return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: sigFigLimit
    }).format(number);
}
export function formatApy(apy) {
    return Boolean(apy) ? Number(apy) / 100 : 0;
}
