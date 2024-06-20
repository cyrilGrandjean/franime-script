import {Anime, CsvExporterDatabase} from '../database';
import {getAnimeEpisode, getAnimeLang, getAnimeName, getAnimeSeason, observeDom} from '../utils';

export function initReader(db: CsvExporterDatabase): void {
    /// observer for play button.
    playButtonAction(db);
    /// observer for lecteur button
    let lecteurButtonObserver = observeDom(document.getElementById('root'), () => {
        let lecteurButton = document.getElementById('headlessui-listbox-button-:r0:') as HTMLButtonElement;
        let childLecteurButton = lecteurButton.querySelector("div") as HTMLElement;
        if (childLecteurButton) {
            lecteurButtonObserver.disconnect();
            let test = observeDom(childLecteurButton, (e) => {
                for (const eElement of e) {
                }
            });
        }

    });
}

function playButtonAction(db: CsvExporterDatabase) {
    let playButtonObserver = observeDom(document.getElementById('root'), () => {
        let playButton = document.getElementById('play_button') as HTMLButtonElement;
        if (playButton) {
            playButtonObserver.disconnect();
            playButton.click();
            let iframeObserver = observeDom(document.getElementById('root'), async () => {
                let iframe = document.querySelector('iframe');
                if (iframe.title) {
                    iframeObserver.disconnect();
                    await saveAnime(db, iframe.src);
                }
            });
        }
    });
}

async function saveAnime(db: CsvExporterDatabase, embed_url: string){
    const location = document.location;
    const locationPathname = location.pathname;
    const locationSearch = location.search;
    let anime: Anime = {
        name: getAnimeName(),
        lang: getAnimeLang(locationSearch),
        season: getAnimeSeason(locationSearch),
        episode: getAnimeEpisode(locationSearch),
        embedUrl: embed_url,
        episodeUrl: locationPathname + locationSearch,
        id: null,
        reader: (new URL(embed_url)).hostname
    }
    if (!await db.animeRepository.isDataInDB(anime)){
        await db.animeRepository.insertAnime(anime);
    }
}