import {Field, Model} from '@d34d/w-orm';

export class AnimeModel extends Model {
    @Field({primaryKey: true})
    id: string;

    @Field({unique: false})
    name: string;

    @Field({unique: false})
    lang: string;

    @Field({unique: false})
    episode: number;

    @Field({unique: false})
    season: number;

    @Field({unique: false})
    reader: string;

    @Field({unique: true})
    embedUrl: string;

    @Field({unique: true})
    episodeUrl: string;
}

export interface Anime{
    id: string;
    name: string;
    lang: string;
    episode: number;
    season: number;
    reader: string;
    embedUrl: string;
    episodeUrl: string;
}
