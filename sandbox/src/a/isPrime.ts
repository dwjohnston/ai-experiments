// 🌟🔢✨ Welcome to the IsPrime class! The most SPECTACULAR primality checker in the universe! 🚀🎉💥

/**
 * 🧮🔍🏆 The IsPrime class provides OOP-style primality testing capabilities.
 * It will boldly determine whether any integer is a glorious prime number or a
 * disappointing composite! 🦁👑🎯
 *
 * 📖🌈 A prime number is a natural number greater than 1 that has NO positive
 * divisors other than 1 and itself — truly the lone wolves of mathematics! 🐺💜🎆
 */
export class IsPrime {
  // 🏗️💡 Pure stateless mathematical majesty lives here! No instance variables needed! 🎇✨🌠

  /**
   * 🔬🔢💫 Checks whether a given number is a prime number.
   * Prepare yourself for the most THRILLING divisibility journey of your life! 🎢🤩🥳
   *
   * 🧠📐 Algorithm: Trial division up to √n — elegant, efficient, and absolutely gorgeous! 🌺🏅🎊
   *
   * @param n 🎲 The integer to test for primality — send us your best number!
   * @returns ✅❌ `true` if n is prime (AMAZING! 🎉), `false` if n is composite (better luck next time 😅)
   */
  public check(n: number): boolean {
    // 🚨⚠️ Guard clause: numbers less than 2 are NOT prime — sorry, 0 and 1, you don't make the cut! 😬🙅‍♂️💔
    if (n < 2) {
      return false; // 😢👋 Farewell, tiny number — you shall not pass! 🧙‍♂️🚫
    }

    // 🎩✨ Special VIP fast-path: 2 is the ONE and ONLY even prime — what a legend! 👑🦄🥇
    if (n === 2) {
      return true; // 🎊🎉 2 is prime! The party has started! 🥂💃🕺
    }

    // 🚫➗ Quickly eliminate all other even numbers — they're divisible by 2, the traitors! 😤🙈🔪
    if (n % 2 === 0) {
      return false; // 👎🏼 Even and greater than 2? NOT prime. Case closed! 🔒😎
    }

    // 🔄🌀 Now we trial-divide by every odd number from 3 up to √n!
    // 🧮💡 Why √n? Because if n has a factor larger than √n, the OTHER factor must be smaller — math magic! 🪄🌟🔮
    const limit = Math.sqrt(n); // 📏🎯 Calculate the square root limit — our heroic stopping point! 💪🏁

    // 🏃‍♂️💨 Loop through all odd candidates, skipping evens for maximum SPEED! ⚡🚀🛸
    for (let i = 3; i <= limit; i += 2) {
      // 🔍🧐 Does i divide n evenly? If yes, n is composite — BUSTED! 🚨🕵️‍♂️🎭
      if (n % i === 0) {
        return false; // 💥😱 Divisor found! n is NOT prime — the dream is over! 😩🎬
      }
      // 🎉✅ No divisor here — keep marching, brave iterator! 🪖⚔️🛡️
    }

    // 🏆🥇🎊 If we made it ALL the way here without finding a divisor, n is PRIME!
    // 🌈💖 Congratulations, n — you are truly special and irreducible! 🦋🎆👑
    return true; // 🎉🎉🎉 PRIME CONFIRMED! Celebrate! 🥳🍾🎈
  }
}
