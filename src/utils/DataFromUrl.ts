export function getAnimeName(){
    return document.location.pathname.replace('/anime/', '');
}

export function getAnimeLang(queryParams: string) {
    let urlSearch = new URLSearchParams(queryParams);
    return urlSearch.get('lang');
}

export function getAnimeSeason(queryParams: string) {
    let urlSearch = new URLSearchParams(queryParams);
    return Number(urlSearch.get('s')) ?? null;
}

export function getAnimeEpisode(queryParams: string) {
    let urlSearch = new URLSearchParams(queryParams);
    return Number(urlSearch.get('ep')) ?? null;
}

