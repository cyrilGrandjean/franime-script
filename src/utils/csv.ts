import {Anime} from '../database';


export class Csv {
    private dataBrut: Anime[];
    private filename: string;

    constructor(data: Anime[]) {
        this.dataBrut = data;
        this.sortData();
        this.filename = data[0].name;
    }

    private sortData(){
        this.dataBrut.sort((a, b) => {
            if (a.season < b.season) return -1;
            if (a.season > b.season) return 1;
            if (a.episode < b.episode) return -1;
            if (a.episode > b.episode) return 1;
            return 0;
        });
    }

    private formatData(): { title: string, season: number, episode: number, url: string }[] {
        return this.dataBrut.map((data) => {
            return {
                title: data.name,
                season: data.season,
                episode: data.episode,
                url: data.embedUrl,
            };
        });
    }

    private createCsvRow(): string[] {
        const result: string[] = [];
        const formatedData = this.formatData();
        const keys = Object.keys(formatedData[0])
        const firstRow = keys.join(';');
        result.push(firstRow);
        result.push(...formatedData.map((data) => Object.values(data).join(';')));
        return result;
    }

    private createCsvBlob(): Blob {
        return new Blob([this.createCsvRow().join("\n")], {type: "text/csv"});
    }

    public download(): void {
        const url = window.URL.createObjectURL(this.createCsvBlob());
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `${this.filename}.csv`);
        a.click();
    }

}
