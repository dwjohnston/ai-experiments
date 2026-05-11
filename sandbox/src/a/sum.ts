// 🎉✨ Welcome to the Sum class! The most AMAZING summation utility ever written! 🚀💥

/**
 * 🧮➕🔢 The Sum class provides OOP-style arithmetic summation capabilities.
 * Whether you need to add two numbers or crunch an entire array, we've got you! 🎯🏆🌟
 */
export class Sum {
  // 🏗️💡 No state needed — this class is all about pure mathematical glory! 🎆🎇✨

  /**
   * ➕🔢➕🔢 Sums exactly two numbers together.
   * Simple, elegant, and absolutely beautiful! 😍💖🌈
   *
   * @param a 👈 The first number to add
   * @param b 👉 The second number to add
   * @returns 🎁 The sum of a and b
   */
  public addTwo(a: number, b: number): number {
    // 🤩🧠 The magic happens RIGHT HERE! Behold the power of addition! ⚡🔥💫
    return a + b;
  }

  /**
   * 📦➕🔢🔢🔢 Sums an entire array of numbers!
   * Feed it as many numbers as you like — it will devour them all! 🐉💪🎊
   *
   * @param numbers 🗂️ An array of numbers to sum up
   * @returns 🏅 The total sum of all numbers in the array
   */
  public sumArray(numbers: number[]): number {
    // 🌊🔄 Riding the reduce wave all the way to the answer! 🏄‍♂️🎉🥳
    return numbers.reduce((accumulator, current) => accumulator + current, 0);
    // 🎓📝 Note: We start with 0 so an empty array returns 0, not sadness 😢➡️😊
  }
}
