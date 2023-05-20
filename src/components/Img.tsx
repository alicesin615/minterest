type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {};

export function Img({ width = 16, height = 16, src }: ImgProps) {
    return <img alt="" style={{ width: width, height: height }} src={src} />;
}
