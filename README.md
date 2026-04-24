# LineWatch

LineWatch on yksinkertainen web-sovellus tuotantolinjan häiriöiden seurantaan. Sovelluksella käyttäjä voi lisätä, tarkastella ja sulkea tuotantolinjan häiriöitä.

## Ominaisuudet

- Häiriön lisääminen (kone, kuvaus, kategoria)
- Häiriön sulkeminen
- Häiriöiden listaus
- Status (open / closed)

## Teknologiat

- Frontend: HTML + JavaScript
- Backend: Node.js + Express
- Tallennus: JSON-tiedosto

## Projektin rakenne

linewatch/
 ├── frontend/
     └── index.html
 ├── backend/
     └── index.js
     └── package.json
 ├── data/
     └── issues.json
 ├── README.md

## Käynnistys

1. Mene backend-kansioon:
cd backend

2. Asenna riippuvuudet:
npm install

3. Käynnistä serveri:
node index.js

4. Avaa frontend selaimessa:
avaa frontend/index.html selaimessa

## Käyttö

- Syötä kone,kuvaus ja kategoria
- Paina "Lisää häiriö"
- Häiriö näkyy listassa
- Paina "Sulje" lopettaaksesi häiriön

Sovellus toimii osoitteessa:
http://localhost:3000

## API

GET /issues  
POST /issues  
PUT /issues/:id  

## Yhteenveto

Sovellus toteuttaa yksinkertaisen häiriöseurannan, jossa käyttäjä voi lisätä ja hallita tuotantolinjan häiriöitä keskitetysti.
