import {CsvExporterDatabase} from "./database";
import {getAnimeEpisode, getAnimeName} from "./utils";
import {initReader, initSummary} from "./init";

async function process(database) {
    if (getAnimeName() === '/') {
        return;
    }

    if (getAnimeEpisode(document.location.search)) {
        initReader(database);
    } else {
        await initSummary(database);
    }
}

(async () => {
    const database = new CsvExporterDatabase()
    await database.createDatabases();

    window.onload = () => {
        let oldHref = document.location.href;
        const body = document.querySelector("body");
        const observer = new MutationObserver(async mutations => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                await process(database);
            }
        });
        observer.observe(body, {childList: true, subtree: true});
    };
    await process(database);
})();
