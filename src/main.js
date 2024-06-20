import {CsvExporterDatabase} from "./database";
import {getAnimeEpisode, getAnimeName} from "./utils";
import {initReader, initSummary} from "./init";

async function process(database, url) {
    if (getAnimeName(url.pathname) === '/') {
        return;
    }

    if (getAnimeEpisode(url.search)) {
        initReader(database);
    } else {
        await initSummary(database);
    }
}

(async () => {
    const database = new CsvExporterDatabase()
    await database.createDatabases();
    navigation.addEventListener('navigate', async (e) => {
        let navigate = new URL(e.destination.url)
        await process(database, navigate);
    });

    await process(database, new URL(document.location.href));
})();
