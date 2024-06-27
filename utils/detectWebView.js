export const isWebView = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (
        (/iPhone|iPod|iPad/.test(userAgent) &&
            /AppleWebKit/.test(userAgent) &&
            !/Safari/.test(userAgent)) ||
        (/Android/.test(userAgent) && /wv/.test(userAgent))
    );
};
