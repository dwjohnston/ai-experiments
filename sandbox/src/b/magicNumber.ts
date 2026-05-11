// hewwo!! (◕‿◕) this wittle function checks if the sum of two numbers is prime~ so magical!!

/**
 * UwU checks if the sum of two numbers is a prime number!!
 *
 * (｡♥‿♥｡) first we add the two numbers together, then we check if that
 * sum is prime~ primes are so special and rare, just like us!! OwO
 *
 * @param a - the first number~ (◕‿◕)
 * @param b - the second number~ (◕‿◕)
 * @returns true if a + b is prime, false otherwise~ yay!!
 */
export const magicNumber = (a: number, b: number): boolean =>
  // ✨ add them up and check if the sum is prime~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
  isPrime(a + b);

// (◕‿◕) hewwo wittle helper!! this checks if a number is prime~ so helpful uwu!!
const isPrime = (n: number): boolean => {
  // UwU numbers less than 2 are NOT prime~ sadge :( they don't qualify for the prime club!!
  if (n < 2) return false;

  // ✨ check all divisors from 2 up to sqrt(n)~ we only need to go that far, how clever!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
  // (｡♥‿♥｡) if any divides evenly, it's not prime~ no sneaky factors allowed!!
  return Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every(
    (i) => n % i !== 0
  );
};
