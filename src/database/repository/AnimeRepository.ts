import {Anime, AnimeModel} from '../model';

export class AnimeRepository {

    constructor() {
    }

    private createId(data: Anime) {
        return `${data.name}-${data.lang}-${data.season}-${data.episode}`;
    }

    public async getAnime(name: string, lang: string, season:number, episode: number): Promise<Anime | null> {
        const data: Anime = {
            embedUrl: null,
            episode,
            episodeUrl: null,
            id: null,
            lang,
            name,
            reader: null,
            season
        }
        return AnimeModel.get(this.createId(data));
    }

    public async isDataInDB(data: Anime): Promise<boolean> {
        const result = await AnimeModel.get(this.createId(data));
        return !!result;
    }

    public async getAnimeByName(name: string): Promise<Anime[]> {
        return await AnimeModel.filter({name}).orderBy('id').all();
    }

    public async insertAnime(data: Anime): Promise<Anime> {
        data.id = this.createId(data);
        return await AnimeModel.create(data);
    }

    public async updateEmbedUrl(data: Anime): Promise<void> {
        data.id = this.createId(data);
        await AnimeModel.filter({id: data.id}).update({embedUrl: data.embedUrl})
    }

    public async updateReader(data: Anime): Promise<void> {
        data.id = this.createId(data);
        await AnimeModel.filter({id: data.id}).update({embedUrl: data.embedUrl, reader: data.reader})
    }

}
