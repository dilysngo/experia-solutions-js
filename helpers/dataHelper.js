export function convertToCurrency(value, option) {
    if (typeof value !== 'number')
        return '';

    if (!option)
        option = {};
    if (!option.format)
        option.format = 'en-US';
    if (!option.currency)
        option.currency = 'USD';

    return value.toLocaleString(option.format, {style: 'currency', currency: option.currency});
};

export function convertToSize(size) {
    return (size / 1000000).toFixed(2) + 'MB';
}

export function convertToTime(time) {
    return Math.floor(time / 60) + ':' + (time % 60);
}

export function convertToUrl(url) {
    return process.env.CDN_BASE + url;
}

export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + JSON.stringify(cvalue) + ';' + expires + ';path=/';
};

export function getCookie(cookieName, stringCookie) {
    let strCookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie);
    if (!strCookie)
        return null;
    return unescape(strCookie[0] ? strCookie[0].toString().replace(/^[^=]+./, '') : '');
};

export function pagination(page , limit) {
    let skip = (page - 1) * limit;
    return skip;
};

export function getRatioSize(ratio) {
    let size = {};
    switch (ratio) {
    case '16:9':
        size = {
            width: 712,
            height: 400
        };
        break; 
    case '4:3':
        size = {
            width: 512,
            height: 384
        };
        break;
    case '16:10':
        size = {
            width: 576,
            height: 360
        };
        break; 
    case '9:16':
        size = {
            width: 200,
            height: 356
        };
        break;
    case '3:4':
        size = {
            width: 240,
            height: 320
        };  
        break;
    case '10:16':
        size = {
            width: 225,
            height: 360
        };
        break;
    default: 
        size = {
            width: 712,
            height: 400
        };
    }
    return size;
}