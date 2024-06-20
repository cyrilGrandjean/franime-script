import {CsvExporterDatabase} from '../database';
import {addButtonDownloadCsv, Csv, getAnimeName, observeDom} from '../utils';


export async function initSummary(db: CsvExporterDatabase) {
    let csvButtonObserver = observeDom(document.getElementById('root'), () => {
        let parentDiv = document.querySelector('.flex.flex-row.flex-wrap.w-full.justify-center.items-center') as HTMLElement;
        if (parentDiv) {
            csvButtonObserver.disconnect();
            addButtonDownloadCsv(parentDiv, async () => {
                let animeList = await db.animeRepository.getAnimeByName(getAnimeName());
                let csv = new Csv(animeList);
                csv.download();
            });
        }
    });
}
