// hewwo!! (◕‿◕) this wittle function checks if a number is odd~ so fun, so kawaii!

/**
 * OwO checks if a number is odd!!
 * @param n - the number we are checking~ pwease give us a real number (｡♥‿♥｡)
 * @returns true if n is odd, false if it's even~ yay!!
 */
export const isOdd = (n: number): boolean =>
  // ✨ the magic of modulo!! if the remainder is NOT 0, it's odd~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
  n % 2 !== 0;
