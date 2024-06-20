import { init } from "@d34d/w-orm";
import {AnimeRepository} from './repository';

export class CsvExporterDatabase {
    static dbName = "csvExporter";
    static dbVersion = 1;
    public animeRepository: AnimeRepository;


    constructor() {
        this.animeRepository = new AnimeRepository();
    }

    public async createDatabases(): Promise<void> {
        await init(CsvExporterDatabase.dbName, CsvExporterDatabase.dbVersion);
    }

}
