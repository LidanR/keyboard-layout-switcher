// Mapping from English key to Hebrew key
const engToHeb = {
  'a': 'ש', 'b': 'נ', 'c': 'ב', 'd': 'ג', 'e': 'ק',
  'f': 'כ', 'g': 'ע', 'h': 'י', 'i': 'ן', 'j': 'ח',
  'k': 'ל', 'l': 'ך', 'm': 'צ', 'n': 'מ', 'o': 'ם',
  'p': 'פ', 'q': '/', 'r': 'ר', 's': 'ד', 't': 'א',
  'u': 'ו', 'v': 'ה', 'w': '\'', 'x': 'ס', 'y': 'ט',
  'z': 'ז', ';': 'ף', ',': 'ת', '.': 'ץ', '\'': '.', '/': ','
};

// Add uppercase English mapping to support converting uppercase letters
(() => {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  for (const ch of lowercaseLetters) {
    const heb = engToHeb[ch];
    if (heb) {
      engToHeb[ch.toUpperCase()] = heb; // Hebrew has no case; map to same
    }
  }
})();

// Reverse mapping from Hebrew back to English (defaults to lowercase english)
const hebToEng = (() => {
  const entries = Object.entries(engToHeb)
    // Prefer lowercase english when collisions exist (since we added uppercase keys)
    .filter(([eng]) => eng.toLowerCase() === eng);
  return Object.fromEntries(entries.map(([eng, heb]) => [heb, eng]));
})();
