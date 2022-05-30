# Blok Tech

**blok tech periode 4 leerjaar 2**

Mijn naam is Stefan Radouane.
Ik ga een matchin applicatie maken voor blok tech.
Ik heb gekozen voor het matching concept, katten matchen aan bomen om in vast te raken.

# Sounder

<p align="center">
  <img width="70%" src="https://github.com/stefanradouane/bloktech-individueel/blob/main/public/images/logosounder.png" />
</p>

## 🎵 Over mijn project

Dit project bevat een muziek matching applicatie.

### Concept en Feature

Het concept wat ik heb bedacht is muziek matchen op basis van jou lievelings muziek categorieen.
Hierbij wil ik me focussen op toevoegen en verwijderen van muziek naar een 'likelijst'.<br>
Wanneer je bent ingelogd kun je categorieen selecteren. Op basis van deze gekozen categoerieen kun je bij 'ontdek' alle nummers zien die je mogelijk leuk vind. Om een beeld te krijgen van het nummer kun je de coverart en wanneer beschikbaar een preview zien. Elk nummer kun je een like geven of een dislike. Wanneer je een nummer een like geeft kun je dit nummer later terug vinden in je 'likelijst'. Wanneer je een nummer een dislike geeft komt dit nummer in de 'dislikelijst'. Dit kan je bekijken in de 'likelijst', als je dan klikt op de link: 'nummers die je een dislike hebt gegeven'.

## ✨ Installatie

### Voordat je start

Wil je aan de slag met mijn project?<br>
Zorg ervoor dat je eerst de volgende dingen hebt installeerd.

- Node.js
- NPM
- Git
- MongoDB Compass
<!-- Optionele apps. -->

<details>
<summary><strong>Heb je Node.js, NPM of Git nog niet geinstalleerd?</strong></summary>

- Node.js // [Download node.js](https://nodejs.org/en/download/)

```
// Check node version
node -v
```

- NPM

```
// Install NPM
npm install npm --global

// Check NPM version
npm -v
```

- Git // [Download Git](https://github.com/git-guides/install-git)

```
// Check version
git version
```

- MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)<br>
2. Installeer de app
3. Als je de app opent en "New Connection" ziet staan ben je klaar, voor nu.

</details>

### Starten van de server

Voer dan de volgende stappen uit:<br>

1. Open een terminal en navigeer naar een map waar jij mijn repository in wilt opslaan.

2. Clone deze repository:

```
git clone https://github.com/stefanradouane/bloktech-individueel
```

3.  Wanneer dit is gelukt heb je de repository op je eigen computer gedownload. Navigeer naar deze repository in de terminal. Je wilt nu alle packages installeren die je nodig hebt voor deze feature. Om dit project vervolgens te laten werken voer je het volgende commando uit: <br>

```
npm install
```

4. Als je het project wilt gebruiken tik dan het volgende in je terminal:

```
node server.js
```

Ga naar een browser en navigeer naar: localhost:3000 <br>
Als alles goed is verlopen zie je nu een inlog scherm.<br>
**Top tot zo ver werkt alles!**

### :computer: Koppelen van de database

Om de app daadwerkelijk ook te laten werken moet je een database koppelen aan de app.<br>

<!-- Summary? -->

Dit is heel erg simpel en kost maar 4 stappen.

1. Maak een account aan op [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) // Als je al een account hebt ga door naar stap 4
2. Voltooi de welkom onboarding
3. Maak een shared cluster aan en geef dit een logische naam
4. Log in met je MongoDB account
5. Klik Database links in de navigatie er opent nu een scherm van 'Database Deployments'. Je ziet nu jouw cluster staan, klik op connect naast de naam van jouw cluster
6. Als je nog geen connection security hebt ingesteld dan krijg je nu te zien dat je een gebruiker moet aanmaken. Naast de gebruiker moet je ook een IP adres verifiëren, je kunt klikken op 'add current ip address' // Als je al een gebruiker hebt om MongoDB kun je deze stap overslaan
7. Vervolgens moet je een vorm van connectie selecteren. Klik op 'Connect your application'
8. Zorg ervoor dat je de driver hebt ingesteld op Node.js version 4.1 or later
9. Kopieer de tekst

```
// Voorbeeld van de tekst die je moet kopieren
mongodb+srv://<gebruikersnaam>:<wachtwoord>@<clustenaam>.<id>.mongodb.net/?retryWrites=true&w=majority
```

Binnen dit project is er gebruik van een MongoDB database. <br>
Wil je hier meer over begrijpen en lezen wat mijn database structuur is? Dan verwijs ik je graag door naar de pagina [Database Structure](https://github.com/ArisRosbach/blokTech/wiki/Database-Structure) binnen mijn wiki. <br>
Hier vind je een korte toelichting over een database en heb ik de structuur in een afbeelding weergegeven.

### :computer: De spotify api laten werken

<!-- Hier moet ik uitleggen welk bestand moet worden geopend -->
<!-- Hier moet  -->

## :memo:Documentatie

Dit project is tot stand gekomen dankzij veel ideeën maar vooral onderzoek. <br>
Mijn gehele documentatie hiervan kun je vinden in de [wiki](https://github.com/ArisRosbach/blokTech/wiki) van deze repository. <br>
Hier lees je over hoe ik tot mijn concept en feature ben gekomen. Daarnaast heb ik ook veel onderzoek gedaan naar de onderwerpen die kwamen kijken bij het maken van dit project.

## :heavy_exclamation_mark:Lincense

Deze repository is licensed onder de [GNU General Public License v3.0](https://github.com/ArisRosbach/blokTech/blob/main/LICENSE)

<p align="center">
  <img width="80%" src="https://github.com/ArisRosbach/blokTech/blob/main/images/bannerLicense.png" />
</p>

## :email:Contact

Naam - Aris Rosbach <br>
Email - aris.rosbach@hva.nl <br>
Project - https://github.com/ArisRosbach/blokTech
