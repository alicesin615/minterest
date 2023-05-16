export function SigFigFormatter(number, sigFigLimit =5) {
    return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: sigFigLimit
    }).format(number);
}
