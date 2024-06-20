import {Anime, CsvExporterDatabase} from '../database';
import {getAnimeEpisode, getAnimeLang, getAnimeName, getAnimeSeason, observeDom} from '../utils';

export function initReader(db: CsvExporterDatabase): void {
    /// observer for play button.
    playButtonActions(db);
    /// observer for lecteur button
    choiceLecteurAction(db);
}

function choiceLecteurAction(db: CsvExporterDatabase) {
    let lecteurButton = document.getElementById('headlessui-listbox-button-:r0:') as HTMLButtonElement;
    if (lecteurButton) {
        return;
    }

    let lecteurButtonObserver = observeDom(document.getElementById('root'), () => {
        let lecteurButton = document.getElementById('headlessui-listbox-button-:r0:') as HTMLButtonElement;
        if (lecteurButton) {
            lecteurButtonObserver.disconnect();
            listLecteurAction(lecteurButton.parentNode as HTMLElement, db);
        }
    });
}

function listLecteurAction(parentUlNode: HTMLElement, db: CsvExporterDatabase) {
    let divObserver = observeDom(parentUlNode, (e) => {
        for (const eElement of e) {
            for (const removedNode of eElement.removedNodes) {
                if (removedNode.nodeName !== 'UL') continue;
                playButtonActions(db);
            }
        }
    })
}

function playButtonActions(db: CsvExporterDatabase) {
    let playButton = document.getElementById('play_button') as HTMLButtonElement;
    if (playButton) {
        playButton.click();
        iframeAction(db);
        return;
    }

    let observer = observeDom(document.getElementById('root'), () => {
        playButton = document.getElementById('play_button') as HTMLButtonElement;
        if (playButton) {
            observer.disconnect();
            playButton.click();
            iframeAction(db);
        }
    });
}

function iframeAction(db: CsvExporterDatabase) {
    let iframeObserver = observeDom(document.getElementById('root'), async () => {
        let iframe = document.querySelector('iframe');
        if (iframe.title) {
            iframeObserver.disconnect();
            await saveAnime(db, iframe.src);
        }
    });
}

async function saveAnime(db: CsvExporterDatabase, embed_url: string) {
    const location = document.location;
    const locationPathname = location.pathname;
    const locationSearch = location.search;
    let anime: Anime = {
        name: getAnimeName(locationPathname),
        lang: getAnimeLang(locationSearch),
        season: getAnimeSeason(locationSearch),
        episode: getAnimeEpisode(locationSearch),
        embedUrl: embed_url,
        episodeUrl: locationPathname + locationSearch,
        id: null,
        reader: (new URL(embed_url)).hostname
    }
    if (!await db.animeRepository.isDataInDB(anime)) {
        await db.animeRepository.insertAnime(anime);
    } else {
        let animeDb = await db.animeRepository.getAnime(anime.name, anime.lang, anime.season, anime.episode);
        if (animeDb.embedUrl === anime.embedUrl) return;
        let confirme = window.confirm('Etes vous sur de vouloir changer d\'url');
        if (confirme) {
            await db.animeRepository.updateEmbedUrl(anime);
        }
    }
}
