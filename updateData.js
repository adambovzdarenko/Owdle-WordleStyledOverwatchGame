const fs = require('fs');
const path = require('path');

const charactersPath = path.join(__dirname, 'characters.json');
const phrasesPath = path.join(__dirname, 'phrases.json');
const emojisPath = path.join(__dirname, 'emojis.json');
const dataPath = path.join(__dirname, 'data.json');

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateDataFile() {
  try {
    const characters = JSON.parse(fs.readFileSync(charactersPath, 'utf8'));
    const phrases = JSON.parse(fs.readFileSync(phrasesPath, 'utf8'));
    const emojis = JSON.parse(fs.readFileSync(emojisPath, 'utf8'));

    const character = getRandomItem(characters);

    let quoteCharacter, charPhrases;
    do {
      quoteCharacter = getRandomItem(characters);
      charPhrases = phrases.find(p => p.name === quoteCharacter.name);
    } while (!charPhrases || !charPhrases.quotes.length);

    const idx        = Math.floor(Math.random() * charPhrases.quotes.length);
    const randomQuote = charPhrases.quotes[idx];   // same index
    const randomURL   = charPhrases.urls[idx];     // ↖︎ matches the quote

    let emojiCharacter, charEmojis;
    do {
      emojiCharacter = getRandomItem(characters);
      charEmojis = emojis.find(e => e.name === emojiCharacter.name);
    } while (!charEmojis || !charEmojis.quotes.length);

    const randomEmoji = getRandomItem(charEmojis.quotes);

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
      }
    };

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`Updated data.json with characters: Character(${character.name}), Quote(${quoteCharacter.name}), Emoji(${emojiCharacter.name})`);
  } catch (err) {
    console.error('Error updating data.json:', err);
  }
}

updateDataFile();
process.exit(0); // Явное завершение процесса
