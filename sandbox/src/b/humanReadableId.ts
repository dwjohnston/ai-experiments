/**
 * (◕‿◕) humanReadableId.ts — the most adorable lil identifier factory in the whole world!! uwu
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ This module is written in a purely functional style — no classes,
 * no scary mutable state, just sparkly pure functions sprinkling IDs everywhere!! ✧
 *
 * (｡♥‿♥｡) Every generated ID follows the precious format:
 *   {adjective}-{noun}-{number}   e.g. "happy-tiger-4"
 *
 * (◕‿◕) With 10 adjectives × 10 nouns × 10 numbers we get a whole 1000 combinations
 * to choose from — so many possibilities, so much joy!! UwU
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Pass an optional seed to get deterministic IDs — same seed, same ID,
 * every single time!! perfect for testing and reproducible magic!! (｡♥‿♥｡) OwO
 */

// ~*~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Word Lists — the building blocks of ID magic!! ~*~

/**
 * (｡♥‿♥｡) ADJECTIVES — a curated collection of the most delightful describing words!!
 * Add more entries here whenever you want even MORE combinations!! (◕‿◕) go wild uwu~
 */
const ADJECTIVES = [
  "happy",   // (◕‿◕) the classic cheerful bby!!
  "fluffy",  // (｡♥‿♥｡) soft and cozy like a lil cloud~
  "sparky",  // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ electric and full of energy!!
  "sleepy",  // (◕‿◕) precious drowsy vibes uwu
  "bouncy",  // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ zooming around everywhere!!
  "golden",  // (｡♥‿♥｡) shiny and magnificent, just like you~
  "misty",   // (◕‿◕) mysterious and dreamy OwO
  "gentle",  // (｡♥‿♥｡) soft-hearted and kind, the sweetest!!
  "peppy",   // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ bursting with bubbly enthusiasm!!
  "lucky",   // (◕‿◕) blessed and full of good fortune~ ✧
] as const;

/**
 * (｡♥‿♥｡) NOUNS — a precious parade of cute critters and things!!
 * Feel free to add more lil friends here whenever your heart desires!! UwU
 */
const NOUNS = [
  "tiger",    // (◕‿◕) fierce but secretly a big softie uwu
  "panda",    // (｡♥‿♥｡) chonky and loveable and eating bamboo~
  "otter",    // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ holds hands while sleeping!! so sweet!!
  "fox",      // (◕‿◕) clever and fluffy-tailed OwO
  "bunny",    // (｡♥‿♥｡) the ultimate soft bby, no notes~
  "penguin",  // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ waddling through life with grace!!
  "koala",    // (◕‿◕) hanging on a tree, living their best life uwu
  "dolphin",  // (｡♥‿♥｡) doing flips and spreading joy everywhere~
  "corgi",    // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ lil legs, big personality!!
  "axolotl",  // (◕‿◕) the most magical and rare of all precious creatures!! OwO
] as const;

/**
 * (｡♥‿♥｡) NUMBERS — a tidy lil range of single digits!! 0 through 9, every one welcome~
 * Extend this array with more numbers anytime you want a bigger pool!! (◕‿◕) UwU
 */
const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const; // ✧ ten lil digits holding hands!! ✧

// ~*~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ PRNG Magic — sparkly deterministic randomness!! ~*~

/**
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Prng — a lil type alias for any pure function that returns a float
 * in [0, 1)!! whether seeded or totally wild, they all wear this shape!! (｡♥‿♥｡)
 */
type Prng = () => number;

/**
 * (◕‿◕) mulberry32 — a teeny-tiny seeded PRNG based on the mulberry32 algorithm!!
 * it's fast, it's pure, and it produces beautifully consistent sparkly numbers!! ✧
 *
 * (｡♥‿♥｡) Give it a seed and it gives back a stateless PRNG function — calling the
 * returned function advances through the sequence one step at a time!! so clever!! UwU
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Pure function! No side effects! The seed lives in a closure, safe
 * and cozy, untouched by the outside world!! OwO
 *
 * @param seed (◕‿◕) The numeric seed that determines the whole sequence~ choose wisely!!
 * @returns (｡♥‿♥｡) A PRNG function that returns a float in [0, 1) on each call!! yay!!
 */
const mulberry32 = (seed: number): Prng => {
  // (◕‿◕) we keep state tucked away in a lil closure — no scary globals here!! uwu
  let s = seed >>> 0; // ✧ coerce to an unsigned 32-bit integer right away!! ✧
  return (): number => {
    // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ the classic mulberry32 bit-mixing dance!! every step is precious~
    s += 0x6d2b79f5;                    // (◕‿◕) advance the state with a magic constant!!
    let t = Math.imul(s ^ (s >>> 15), 1 | s);          // (｡♥‿♥｡) mix mix mix~
    t = t ^ (t + Math.imul(t ^ (t >>> 7), 61 | t));    // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ stir it up!!
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;       // ✧ divide into [0, 1) — perfect!! ✧
  };
};

// ~*~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Helper Functions — tiny pure pals doing tiny pure things!! ~*~

/**
 * (◕‿◕) pickRandom — a precious lil helper that grabs one element from a readonly
 * array using whichever PRNG you hand it!! so flexible, so helpful, we love it!! (｡♥‿♥｡)
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Pure function! No side effects! Just vibes, a PRNG, and a random pick!! uwu
 *
 * @param items (◕‿◕) The readonly array of lil things to choose from~
 * @param prng  (｡♥‿♥｡) The PRNG function that decides our destiny!! defaults to Math.random~
 * @returns (｡♥‿♥｡) One chosen element from the array!! yay!!
 */
const pickRandom = <T>(items: ReadonlyArray<T>, prng: Prng = Math.random): T => {
  // (◕‿◕) Math.floor keeps our index a whole number — no sneaky decimals!! uwu
  const index = Math.floor(prng() * items.length); // ✧ destiny is decided right here!! ✧
  return items[index] as T; // (｡♥‿♥･) TypeScript is a lil anxious but we reassure it~
};

// ~*~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ The Star of the Show — humanReadableId!! ~*~

/**
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ humanReadableId — the most important function in the whole file!!
 * It creates a sparkly ID string every time you call it!! (｡♥‿♥｡)
 *
 * (◕‿◕) Format: `{adjective}-{noun}-{number}`
 *   e.g. "happy-tiger-4", "fluffy-panda-0", "sparky-axolotl-9"
 *
 * (｡♥‿♥｡) Draws from a pool of 10 adjectives × 10 nouns × 10 numbers for a
 * grand total of 1000 possible combinations — so many unique lil IDs!! UwU
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Pass a numeric seed to get deterministic output — call it twice with
 * the same seed and you'll get the exact same precious ID both times!! OwO
 * Omit the seed entirely for good ol' random behaviour, just like before!! (◕‿◕)
 *
 * (｡♥‿♥｡) This is a pure(-ish) function — it only reads from constants and the
 * provided (or default) PRNG, no mutable state or scary side effects anywhere!! ✧
 *
 * @param seed (◕‿◕) Optional numeric seed for deterministic ID generation~ uwu
 * @returns (｡♥‿♥｡) A freshly generated ID string in `adjective-noun-number` format~
 *
 * @example
 * // (◕‿◕) Generate a random lil ID — you deserve one!! UwU
 * const id = humanReadableId(); // => "bouncy-corgi-7" or something equally adorable~
 *
 * @example
 * // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Generate a deterministic lil ID — same seed, same result, every time!!
 * const id1 = humanReadableId(42); // => always the same precious ID for seed 42!! OwO
 * const id2 = humanReadableId(42); // => identical to id1!! friendship through math!! ✧
 */
export const humanReadableId = (seed?: number): string => {
  // (◕‿◕) if a seed was provided, conjure up a sparkly seeded PRNG just for this call!!
  // otherwise fall back to dear old Math.random — reliable as ever, bless its heart!! uwu
  const prng: Prng = seed !== undefined
    ? mulberry32(seed)  // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ deterministic magic!! same seed → same ID!! OwO
    : Math.random;      // (｡♥‿♥｡) no seed? no problem!! pure spontaneous chaos~ ✧

  const adjective = pickRandom(ADJECTIVES, prng); // (◕‿◕) pick a describing word, how fun!!
  const noun      = pickRandom(NOUNS,      prng); // (｡♥‿♥｡) pick a precious creature or thing~
  const number    = pickRandom(NUMBERS,    prng); // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ pick a lucky number!! uwu

  // (｡♥‿♥｡) Stitch the three lil pieces together with hyphens — like a friendship bracelet!! OwO
  return `${adjective}-${noun}-${number}`; // ✧ born!! a brand new ID enters the world!! ✧
};
