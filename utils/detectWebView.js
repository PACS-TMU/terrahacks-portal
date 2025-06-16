export const isWebView = () => {
    if (typeof navigator === "undefined" || typeof window === "undefined") {
        return false;
    }
    const userAgent = navigator.userAgent || window.opera || "";
    return (
        (/iPhone|iPod|iPad/.test(userAgent) &&
            /AppleWebKit/.test(userAgent) &&
            !/Safari/.test(userAgent)) ||
        (/Android/.test(userAgent) && /wv/.test(userAgent))
    );
};
