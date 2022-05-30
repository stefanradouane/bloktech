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

## 🎼 Installatie

### Voordat je start

Wil je aan de slag met mijn project?<br>
Zorg ervoor dat je eerst de volgende dingen hebt installeerd.

- Node.js
- NPM
- Git
- MongoDB Compass
  <!-- Optionele apps. -->

<details>
<summary><strong>Heb je Node.js, NPM, Git of MongoDB Compass nog niet geinstalleerd?</strong></summary>

- Node.js // [Download node.js](https://nodejs.org/en/download/)

```
// Check node version
node -v
```

- NPM

```
// Install NPM
npm install npm --global
```

```
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

### :zap: Starten van de server

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

### :computer: Verander de naam van EXAMPLE.env

<strong>De app heeft een aantal variabelen nodig die je zelf moet ophalen en plaatsen in een '.env' bestand.</strong><br><br>
Momenteel is er alleen nog een EXAMPLE.env bestand, verander de naam van 'EXAMPLE.env' naar alleen '.env'.<br>
Verder zul je nog gaan lezen hoe je de variabelen die je nodig hebt kunt verzamelen.

### 🎛️ Koppelen van de database

Om de app daadwerkelijk ook te laten werken moet je een database koppelen aan de app.<br>

<!-- Summary? -->

<details>
<summary>Dit is simpeler dan het lijkt het zijn een aantal stappen.</summary>

1. Maak een account aan op [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) // Als je al een account hebt ga door naar stap 4
2. Voltooi de welkom onboarding
3. Maak een shared cluster aan en geef dit een logische naam
4. Log in met je MongoDB account
5. Klik Database links in de navigatie er opent nu een scherm van 'Database Deployments'. Je ziet nu jouw cluster staan, klik op connect naast de naam van jouw cluster
6. Als je nog geen connection security hebt ingesteld dan krijg je nu te zien dat je een gebruiker moet aanmaken. Naast de gebruiker moet je ook een IP adres verifiëren, je kunt klikken op 'add current ip address' // Als je al een account hebt op MongoDB kun je deze stap overslaan
7. Vervolgens moet je een vorm van connectie selecteren. Klik op 'Connect your application'
8. Zorg ervoor dat je de driver hebt ingesteld op Node.js version 4.1 or later
9. Kopieer de tekst, laat exact dit zelfde scherm open staan

```
// Voorbeeld van de tekst die je moet kopieren
mongodb+srv://gebruikersnaam:<password>@clustenaam.id.mongodb.net/?retryWrites=true&w=majority
```

10. Open .env dit was eerst EXAMPLE.env, maar dat heb je als het goed is al veranderd
11. Vul de gekopieerde tekst die je van stap 9 hebt gekopieerd in bij het variabel 'DB_URI'

```
//.env file
DB_URI = mongodb+srv://gebruikersnaam:<password>@clustenaam.id.mongodb.net/?retryWrites=true&w=majority
```

12. Verander in dit .env bestand <password> naar het wachtwoord van de 'connection security' gebruiker, dat je in stap 6 hebt ingesteld.

```
//.env file
DB_URI = mongodb+srv://gebruikersnaam:mijnwachtwoord@clustenaam.id.mongodb.net/?retryWrites=true&w=majority
```

13. Als het goed is heb je de browser nog geopent op MongoDB Atlas met het scherm waar je zojuist het DB_URI hebt gekopieerd, klik op 'Go Back' rechts onder op dit connect scherm.

14. Je ziet nu de opties weer de 'connection methods', selecteer nu connect using MongoDB Compass

15. Je ziet nu een scherm om te verbinden met MongoDB Compass, kopieer de link die op het scherm verschijnt.

```
// Voorbeeld van de tekst die je moet kopieren
mongodb+srv://test:<password>@gebruikersnaam.id.mongodb.net/test
```

16. Open MongoDB Compass, als het goed is zie je nu op het scherm 'New Connection', en een veld waar je een url zou kunnen invullen.

17. Vul hier de link in die je net hebt gekopieerd in stap 15, verander <password> in het wachtwoord van de 'connection security' gebruiker, dat je in stap 6 hebt ingesteld.

18. Klik op 'databases' boven in het scherm, en klik vervolgens op de groene knop 'create database'

19. Je krijgt nu de optie om een database aan te maken. Je ziet als het goed is twee invul velden 'database name' & 'collection name'

20. Vul als 'database name' een logische naam in, omdat mijn app 'sounder' heet raad ik de naam 'sounder' aan

21. Vul als 'collection name' een logische naam in, omdat de gebruikte collectie over de gebruikers gaat raad ik de naam 'gebruikers' aan

22. Maak de database aan

23. Open het .env bestand en verander het variabel DB_NAME

```
//.env file
DB_URI = mongodb+srv://gebruikersnaam:<password>@clustenaam.id.mongodb.net/?retryWrites=true&w=majority
DB_NAME = sounder
```

24. Verander ook in het .env bestand het variabel DB_COLLECTION, zorg ervoor dat je de naam van de collectie zet tussen dubbele quotes ("...")

```
//.env file
DB_URI = mongodb+srv://gebruikersnaam:<password>@clustenaam.id.mongodb.net/?retryWrites=true&w=majority
DB_NAME = sounder
DB_COLLECTION = "gebruikers"
```

25. Top het is je gelukt om de database te koppelen aan de app!
</details>

Binnen dit project is er gebruik van een MongoDB database. <br>
Wil je hier meer over begrijpen en lezen wat mijn database structuur is? Dan verwijs ik je graag door naar de pagina [Database Structure](https://github.com/ArisRosbach/blokTech/wiki/Database-Structure) binnen mijn wiki. <br>
Hier vind je een korte toelichting over een database en heb ik de structuur in een afbeelding weergegeven.

### 💿 De spotify API werkend maken

Naast het koppelen van de database moet er ook verbinding gemaakt worden met de API van spotfiy.<br>
Om deze API te laten werken heb je twee dingen nodig, een Client ID & een Client Secret.

<details>
<summary>Dit is simpeler dan het lijkt het zijn een aantal stappen.</summary>

1. Open [Spotify Developer](https://developer.spotify.com/dashboard/)
2. Klik op 'log in' er opent nu een pop-up waar je kunt inloggen met je spotify account. Heb je nog geen account dan kun je jezelf registreren of inloggen met facebook, apple of google.
3. Open je dashboard, en klik op create an app
4. Vul een 'app name' in bijvoorbeeld 'sounder'. Vul ook een 'app description' in bijvoorbeeld "Tinder voor muziek."
5. Wanneer je dit hebt ingevuld klik op create
6. Dit project wordt automatisch geopent links op het scherm zie je jouw Client ID staan dit id kun je kopieren, hou de website nog open
7. Open /public/scripts/getSpotify.js en vul dit op regel 1 bij clientId in tussen dubbele quotes ("...")

```
//file getSpotify.js
const clientId = "1234abcd56ef"
```

8. Open de website van spotify opnieuw, je ziet onder het Client ID, een groene link staan met "SHOW CLIENT SECRET" klik hier op, jouw Client Secret is nu zichtbaar op het scherm.

9. Kopieer deze code plaats dit in getSpotify.js op regel 2 bij clientSecret in tussen dubbele quotes ("...")

```
//file getSpotify.js
const clientId = "1234abcd56ef"
const clientSecret = "abcd1234ef56"
```

10. Top het is je gelukt om de spotify API werkend te krijgen!
</details>

## 📄 Documentatie

Dit project is tot stand gekomen dankzij veel ideeën maar vooral onderzoek. <br>
Mijn gehele documentatie hiervan kun je vinden in de [wiki](https://github.com/stefanradouane/bloktech-individueel/wiki) van deze repository. <br>
Hier lees je over hoe ik tot mijn concept en feature ben gekomen. Daarnaast heb ik ook veel onderzoek gedaan naar de onderwerpen die kwamen kijken bij het maken van dit project.

## 🏷️ License

© Stefan Radouane

Licensed under the [MIT License](https://github.com/stefanradouane/bloktech-individueel/blob/main/LICENSE)

## 📮 Contact

Naam - Stefan Radouane <br>
Email - stefan.radouane@hva.nl <br>
Project - https://github.com/stefanradouane/bloktech-individueel

<p align="center">
  <img width="5%" src="https://github.com/stefanradouane/bloktech-individueel/blob/main/public/images/logoxs.png" />
</p>
