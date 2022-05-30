# Blok Tech

**blok tech periode 4 leerjaar 2**

Mijn naam is Stefan Radouane.
Ik ga een matchin applicatie maken voor blok tech.
Ik heb gekozen voor het matching concept, katten matchen aan bomen om in vast te raken.

# Sounder

<p align="center">
  <img width="70%" src="https://github.com/ArisRosbach/blokTech/blob/main/images/bannerPawFinder.png" />
</p>

## 🎵 Over mijn project

Dit project bevat een muziek matching applicatie.

### Concept en Feature

Het concept wat ik heb bedacht is muziek matchen op basis van jou lievelings muziek categorieen.
Hierbij wil ik me focussen op toevoegen en verwijderen van muziek naar een 'likelijst'.<br>
Wanneer je bent ingelogd kun je categorieen selecteren. Op basis van deze gekozen categoerieen kun je bij 'ontdek' alle nummers zien die je mogelijk leuk vind. Om een beeld te krijgen van het nummer kun je de coverart en wanneer beschikbaar een preview zien. Elk nummer kun je een like geven of een dislike. Wanneer je een nummer een like geeft kun je dit nummer later terug vinden in je 'likelijst'. Wanneer je een nummer een dislike geeft komt dit nummer in de 'dislikelijst'. Dit kan je bekijken in de 'likelijst', als je dan klikt op de link: 'nummers die je een dislike hebt gegeven'.

## ✨ Installatie

## Before we start

Wil je aan de slag met mijn project?<br>
Zorg ervoor dat je eerst de volgende dingen hebt installeerd.

- Node.js
- NPM
- Git

<details>
<summary>Heb je Node.js, NPM of Git nog niet geinstalleerd?</summary>

- Node.js // [Download node.js]("https://nodejs.org/en/download/")

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

- Git // [Download Git]("https://github.com/git-guides/install-git")

```
// Check version
git version
```

</details>

Voer dan de volgende stappen uit: <br>

1. Open een terminal en navigeer naar een map waar jij mijn repository in wilt opslaan.
2. Clone deze repository:

```
git clone https://github.com/ArisRosbach/blokTech
```

3.  Wanneer dit is gelukt heb je de repository op je eigen computer staan. Navigeer binnen deze repository in de terminal. Je wilt nu alle packages installeren die je nodig hebt voor deze feature. Om dit project vervolgens te laten werken voer je het volgende commando uit: <br>

```
npm install
```

4. Als je het project wilt gebruiken tik dan het volgende in je terminal:

```
nodemon index.js
```

Ga naar een browser en navigeer naar: localhost:8000 <br>
Als alles goed is verlopen zie je de matches van de asieldieren en kun je filteren. <br>

### Node installeren

Heb je bij stap 3 problemen gehad dan kan dat zijn omdat je geen node hebt geïnstalleerd.

1.  Open je terminal en installeer nvm met het volgende commando;

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
```

2.  Sluit je terminal en start deze vervolgens opnieuw op. Tik het volgende in je terminal:

```
nvm install stable
```

3.  Nu heb je Node succesvol geïnstalleerd. Dit kun je met de volgende checken:

```
node -v #
npm -v #
```

## :computer:Database

Binnen dit project is er gebruik van een MongoDB database. <br>
Wil je hier meer over begrijpen en lezen wat mijn database structuur is? Dan verwijs ik je graag door naar de pagina [Database Structure](https://github.com/ArisRosbach/blokTech/wiki/Database-Structure) binnen mijn wiki. <br>
Hier vind je een korte toelichting over een database en heb ik de structuur in een afbeelding weergegeven.

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
