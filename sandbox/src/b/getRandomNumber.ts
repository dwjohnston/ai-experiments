/**
 * (◕‿◕) getRandomNumber.ts — the most precious lil random number generator!! uwu
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ This module is written in a purely functional style — no classes,
 * no scary mutable state, just sparkly pure functions doing their best!! ✧
 *
 * (｡♥‿♥｡) Every function in here is a pure lil baby that takes inputs and gives
 * back outputs without touching anything naughty on the outside~ OwO
 */

// ~*~ (◕‿◕) Type Definitions — so cute and so helpful!! ~*~

/**
 * (｡♥‿♥｡) A lil config object for specifying a number range, how adorable!!
 * Both `min` and `max` are inclusive so no numbers get left out UwU
 */
export type RandomRange = {
  /** (◕‿◕) The smallest number that could possibly show up~ so smol! */
  min: number;
  /** (◕‿◕) The biggest number that could possibly show up~ so tall! */
  max: number;
};

// ~*~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Core Random Number Functions — here they come!! ~*~

/**
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ getRandomNumber — the superstar of the whole file!! uwuwuwu
 *
 * (｡♥‿♥｡) Returns a lovely random floating-point number between `min` and `max`
 * (both ends are included because we don't discriminate against boundary values)!! OwO
 *
 * (◕‿◕) This is a pure function — same range in, unpredictably cute number out,
 * and absolutely zero side effects to worry about!! yay!!
 *
 * @param min (◕‿◕) The lower bound of the range — the floor of our lil number house~
 * @param max (◕‿◕) The upper bound of the range — the ceiling of our lil number house~
 * @returns (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A sparkly random number somewhere between min and max!!
 *
 * @example
 * // (｡♥‿♥｡) Roll a number between 1 and 10, how exciting!! UwU
 * const n = getRandomNumber(1, 10);
 */
export const getRandomNumber = (min: number, max: number): number => {
  // (◕‿◕) Sprinkle some Math.random() magic — it gives us [0, 1) and we stretch
  // it to fill our whole cozy [min, max] range!! so satisfying uwu
  return Math.random() * (max - min) + min; // ✧ the math is doing its best and we love it!! ✧
};

/**
 * (｡♥‿♥｡) getRandomInt — just like getRandomNumber but it only returns whole
 * numbers because sometimes you need things to be nice and tidy!! OwO
 *
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Both `min` and `max` are inclusive so every integer in the range
 * has an equal chance of being chosen — fairness is cute!! uwu
 *
 * @param min (◕‿◕) The smallest integer we could ever get — a humble lil floor~
 * @param max (◕‿◕) The biggest integer we could ever get — a majestic lil ceiling~
 * @returns (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A random whole-number integer between min and max (inclusive)!!
 *
 * @example
 * // (｡♥‿♥｡) Simulate a dice roll, how thrilling!! UwU
 * const roll = getRandomInt(1, 6);
 */
export const getRandomInt = (min: number, max: number): number => {
  // (◕‿◕) Math.floor keeps things whole and tidy — no messy decimals allowed!! uwu
  const flooredMin = Math.ceil(min);  // ✧ ceil on min so we never sneak below the boundary~ ✧
  const flooredMax = Math.floor(max); // ✧ floor on max so we never sneak above the boundary~ ✧

  // (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ +1 makes max inclusive — because max deserves to be picked too!! (｡♥‿♥｡)
  return Math.floor(Math.random() * (flooredMax - flooredMin + 1)) + flooredMin;
};

/**
 * (｡♥‿♥｡) getRandomNumberInRange — a friendly lil wrapper around getRandomNumber
 * that accepts a single adorable RandomRange object instead of two separate params!! OwO
 *
 * (◕‿◕) Perfect for when you already have a range object sitting around and you
 * just wanna pass it in all at once without any fuss!! so convenient uwu
 *
 * @param range (｡♥‿♥｡) A lil RandomRange object with `min` and `max` properties~
 * @returns (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A sparkly random float within the given range!!
 *
 * @example
 * // (◕‿◕) Pass in a range object and get a number back — so easy!! UwU
 * const temperature = getRandomNumberInRange({ min: -10, max: 40 });
 */
export const getRandomNumberInRange = ({ min, max }: RandomRange): number => {
  // (｡♥‿♥｡) Delegate all the hard work to our beloved getRandomNumber friend!! uwu
  return getRandomNumber(min, max); // ✧ teamwork makes the dream work!! ✧
};

/**
 * (｡♥‿♥｡) getRandomIntInRange — same as getRandomNumberInRange but for integers!!
 * accepts a RandomRange object and gives back a whole-number result!! OwO
 *
 * (◕‿◕) Just the cutest lil convenience wrapper you ever did see!! UwU
 *
 * @param range (｡♥‿♥｡) A lil RandomRange object with `min` and `max` properties~
 * @returns (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A random integer within the given range (both ends inclusive)!!
 *
 * @example
 * // (◕‿◕) Pick a random month number — how delightful!! uwu
 * const month = getRandomIntInRange({ min: 1, max: 12 });
 */
export const getRandomIntInRange = ({ min, max }: RandomRange): number => {
  // (｡♥‿♥｡) Lean on our trusty getRandomInt pal to do the heavy lifting!! OwO
  return getRandomInt(min, max); // ✧ pure functions supporting each other is friendship!! ✧
};

/**
 * (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ clampToRange — a protective lil guardian that makes sure a number
 * stays snugly inside a given range!! so caring and sweet!! (｡♥‿♥｡)
 *
 * (◕‿◕) This pure function is great for validating that a random (or any!) number
 * didn't accidentally escape the bounds — safety first, uwu!!
 *
 * @param value (◕‿◕) The number we want to keep safe inside the range~
 * @param range (｡♥‿♥｡) The cozy RandomRange it must stay within~
 * @returns (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ The value if it's already safe, or the nearest boundary if it wandered off!!
 *
 * @example
 * // (◕‿◕) Keep a naughty number inside [0, 100] uwu
 * const safe = clampToRange(150, { min: 0, max: 100 }); // returns 100 (｡♥‿♥｡)
 */
export const clampToRange = (value: number, { min, max }: RandomRange): number => {
  // (｡♥‿♥｡) Math.min and Math.max working together like best friends!! uwu
  return Math.min(Math.max(value, min), max); // ✧ no number left behind!! (◕‿◕) ✧
};
