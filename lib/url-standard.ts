
export function UrlDecode(url:string){
    url = url.replace(new RegExp('%20', 'g'), " ");
    return url;
}

export function UrlPath(url:string){
    url = url.split("?")[0];
    return url;
}

