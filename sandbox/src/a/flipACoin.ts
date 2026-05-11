/**
 * 🪙✨ flipACoin.ts — A delightful coin-flipping simulator! 🎉🌟
 * 🎲🍀 This module provides the FlipACoin class for all your coin-tossing needs! 🚀💫
 */

/** 🪙🎯 The two possible outcomes of a coin flip — heads or tails! 🦅💰 */
type CoinFace = "heads" | "tails";

/**
 * 🪙🎪 FlipACoin — An object-oriented coin flipper extraordinaire! 🌈✨
 *
 * 🎭🎠 Encapsulates all the power and mystery of a single coin flip! 🔮💥
 * 🏆🎊 Instantiate this class and let fate decide your destiny! 🎲🌟
 */
export class FlipACoin {
  /** 🔢💡 Tracks the total number of flips performed so far! 📊🎯 */
  private flipCount: number = 0; // 🔄🧮 Starts at zero, climbs with every toss! 🚀📈

  /** 🗃️📜 Stores the full history of every flip result! 🏅🎞️ */
  private history: CoinFace[] = []; // 💾🌀 A growing record of coinny adventures! 🪙🗺️

  /**
   * 🎰🪄 flip() — The star of the show! Simulates a single coin flip! 🌟🎡
   *
   * 🎲🔀 Uses Math.random() to let pure chance determine the outcome! 🍀🌊
   * 📝🏷️ Records the result in history and increments the flip counter! 🔢✅
   *
   * @returns 🪙✨ Either "heads" or "tails" — the universe has spoken! 🌌🎯
   */
  public flip(): CoinFace {
    // 🎲🌀 Roll the dice of fate — 50/50 chance for each side! ⚖️🍀
    const result: CoinFace = Math.random() < 0.5 ? "heads" : "tails"; // 🪙💫 The moment of truth! 🔮🎊

    // 📈🔢 Increment the flip counter to track our glorious history! 🏆📊
    this.flipCount++; // ➕🎯 One more flip added to the legend! 🌟🎠

    // 💾📜 Append the result to the history log for posterity! 🗃️🔖
    this.history.push(result); // 🗂️✨ Saved forever in the annals of coin time! 📚🏅

    // 🎉🪙 Return the glorious outcome to the caller! 🚀🌈
    return result;
  }

  /**
   * 🔢📊 getFlipCount() — Returns the total number of flips performed! 🏆🎯
   *
   * 🧮💡 Great for tracking how many times fate has been tempted! 🍀🌟
   *
   * @returns 🔢✨ The total flip count as a number! 📈🎲
   */
  public getFlipCount(): number {
    // 📤🔢 Hand back the sacred flip count! 🏅💫
    return this.flipCount; // 🪙🎊 Every flip remembered and counted! 🌈📊
  }

  /**
   * 📜🗃️ getHistory() — Returns a copy of the full flip history! 🎞️🌟
   *
   * 🔒🛡️ Returns a shallow copy to protect the internal state! 🏰💎
   * 🕰️🧭 Peek into the past and relive every glorious coin flip! 🌈✨
   *
   * @returns 🪙📜 An array of every CoinFace result, in order! 🎯🎠
   */
  public getHistory(): CoinFace[] {
    // 📋🔐 Return a copy so nobody messes with our precious history! 🛡️🏆
    return [...this.history]; // 🌀💫 Spread into a fresh array for safety! 🔒🎉
  }

  /**
   * 🔄🧹 reset() — Clears the flip count and history back to zero! 🌱✨
   *
   * 🆕🎯 Perfect for starting a brand new round of coin-flipping fun! 🎪🚀
   * 💥🌊 Wipe the slate clean and begin again with fresh coin energy! 🪙🌟
   */
  public reset(): void {
    // 🧹🔢 Zero out the flip counter — back to the beginning! 🔄💫
    this.flipCount = 0; // ⬅️🌱 Freshly reset and ready for action! 🚀🎊

    // 🗑️📜 Clear the history array — out with the old, in with the new! 🌈🏆
    this.history = []; // 🧼✨ Squeaky clean and ready for more flips! 🪙🎉
  }
}
