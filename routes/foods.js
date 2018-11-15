import express from 'express';
import fetch from './../utils/fetch';
import Scraper from './../utils/scraper';

const app = express();

app.get('/', async (req, res) => {
  const html = await fetch();
  const scraper = new Scraper(html);
  return res.status(200).send(scraper.getAllDays());
});

app.get('/gruenkohl', async (req, res) => {
  console.log('gruenkohl test')
  const html = await fetch();
  const scraper = new Scraper(html);
  const foodPlan = scraper.getAllDays();
  let gruenkohlResponse = foodPlan.map((dayPlan) => {
    let gruenkohl;
    console.log(dayPlan.food[0])
    if (dayPlan.food[0]['Essen 1'].search('Grünkohl') != -1) {
      gruenkohl = true;
    } else {
      gruenkohl = false
    }
    return { date: dayPlan.date, gruenkohl: gruenkohl}
  })
  return res.status(200).send(gruenkohlResponse);
})

app.get('/:day', async (req, res) => {
  if (req.params.day < 0 && req.params.day > 5) {
    return res.status(404).send('Das ist kein valider Endpunkt');
  }
  const html = await fetch();
  const scraper = new Scraper(html);
  const day = Number(req.params.day) + 1;
  return res.status(200).send(scraper.scrapeDay(day));
});



module.exports = app;
