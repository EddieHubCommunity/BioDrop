export default function YoutubeVideo({url, title}) {
    return (
        <iframe width="410" 
        height="220"
        src={url}
        title={title}
        allow="accelerometer; autoplay;" 
        allowFullScreen>
        </iframe>
    );
}