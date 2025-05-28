const fs = require('fs');
const path = require('path');

const charactersPath = path.join(__dirname, 'characters.json');
const phrasesPath = path.join(__dirname, 'phrases.json');
const emojisPath = path.join(__dirname, 'emojis.json');
const skinsPath = path.join(__dirname, 'skins.json');
const dataPath = path.join(__dirname, 'data.json');

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateDataFile() {
  try {
    const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));
    const phrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));
    const emojis = JSON.parse(fs.readFileSync(emojisPath, 'utf8'));
    const skins = JSON.parse(fs.readFileSync(skinsPath, 'utf8'));

    // Pick secretCharacter
    const character = getRandomItem(characters);

    // Pick secretQuote
    let quoteCharacter, charPhrases;
    do {
      quoteCharacter = getRandomItem(characters);
      charPhrases = phrases.find(p => p.name === quoteCharacter.name);
    } while (!charPhrases || !charPhrases.quotes.length);

    const idx = Math.floor(Math.random() * charPhrases.quotes.length);
    const randomQuote = charPhrases.quotes[idx];
    const randomURL = charPhrases.urls[idx];

    // Pick secretEmoji
    let emojiCharacter, charEmojis;
    do {
      emojiCharacter = getRandomItem(characters);
      charEmojis = emojis.find(e => e.name === emojiCharacter.name);
    } while (!charEmojis || !charEmojis.quotes.length);

    const randomEmoji = getRandomItem(charEmojis.quotes);

    // Pick secretSkin
    // Find a character with at least one skin
    let skinCharacterName, charSkins;
    do {
      skinCharacterName = getRandomItem(characters).name;
      charSkins = skins[skinCharacterName];
    } while (!charSkins || !charSkins.length);

    const chosenSkin = getRandomItem(charSkins);

    const data = {
      secretCharacter: {
        name: character.name,
        role: character.role,
        affiliation: character.affiliation,
        gender: character.gender,
        species: character.species,
        nationality: character.nationality,
        releaseYear: character.releaseYear
      },
      secretQuote: {
        name: quoteCharacter.name,
        quote: randomQuote,
        url: randomURL
      },
      secretEmoji: {
        name: emojiCharacter.name,
        emojis: randomEmoji
      },
      secretSkin: {
        name: skinCharacterName,
        skin_name: chosenSkin.skin_name,
        url: chosenSkin.image_url
      }
    };

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`Updated data.json with characters: Character(${character.name}), Quote(${quoteCharacter.name}), Emoji(${emojiCharacter.name}), Skin(${skinCharacterName} - ${chosenSkin.skin_name})`);
  } catch (err) {
    console.error('Error updating data.json:', err);
  }
}

updateDataFile();
process.exit(0);
