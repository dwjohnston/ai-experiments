// hewwo!! (◕‿◕) this wittle function checks if a string is a palindrome~ so magical!!

/**
 * UwU checks if a string is a palindrome!!
 *
 * (｡♥‿♥｡) case-insensitive and ignores all non-alphanumeric characters so
 * things like "A man, a plan, a canal: Panama" still count~ how exciting!! OwO
 *
 * @param s - the string we are checking~ pwease give us something fun!! (◕‿◕)
 * @returns true if the string reads the same forwards and backwards, false otherwise~ yay!!
 */
export const isPalindrome = (s: string): boolean => {
  // ✨ first we strip out anything that isn't a letter or number and lowercase everything~
  // only the cute alphanumeric chars get to stay!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

  // (◕‿◕) then we check if the cleaned string equals its own reversal~ so clever uwu!!
  // split into chars, reverse the array, join back together, and compare~ (｡♥‿♥｡)
  return cleaned === cleaned.split("").reverse().join("");
};
