import rp from 'request-promise';
import cheerio from 'cheerio';

const options = {

    uri: 'https://www.stw-bremen.de/de/mensa/uni-mensa',
    transform: (body) => cheerio.load(body),
};

export default async function fetch() {
    try {
        const data = await rp(options);
        return data;
    } catch (e) {
        throw new Error('Downloading of the website failed.');
    }
}
