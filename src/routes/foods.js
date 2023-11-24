import express from 'express';
import fetch from '../utils/fetch';
import Scraper from '../utils/scraper';
import Cache from '../utils/cache';

const app = express();
const cache = new Cache();

app.get('/', async (req, res) => {
    let data = cache.get();

    if (!data) {
        const html = await fetch();
        const scraper = new Scraper(html);
        data = scraper.getAllDays();
        cache.set(data);
    }
    return res.status(200).send(data);
});

app.get('/:day', async (req, res) => {
    if (req.params.day < 0 || req.params.day > 5) {
        return res.status(404).send('Das ist kein valider Endpunkt');
    }
    let data = cache.get();

    if (!data) {
        const html = await fetch();
        const scraper = new Scraper(html);
        data = scraper.getAllDays();
        cache.set(data);
    }
    return res.status(200).send(data[req.params.day]);
    //const day = Number(req.params.day) + 1;
    //return res.status(200).send(scraper.scrapeDay(day));
});

export default app;
