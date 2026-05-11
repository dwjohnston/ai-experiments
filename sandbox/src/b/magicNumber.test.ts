// hewwo!! (◕‿◕) these are the tests for our precious magicNumber function~ let's make sure it's perfect!!
import { describe, expect, it } from "bun:test";
import { magicNumber } from "./magicNumber";

// (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ let's test all the cute lil cases and make sure everything works!! uwu
describe("magicNumber", () => {
  // (｡♥‿♥｡) cases where the sum IS prime~ these should return true, yay!!
  it("returns true when the sum is 2 (the smallest prime~)", () => {
    // OwO 1 + 1 = 2, which is prime~ so cute!!
    expect(magicNumber(1, 1)).toBe(true);
  });

  it("returns true when the sum is 3", () => {
    // ✨ 1 + 2 = 3, a prime~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(magicNumber(1, 2)).toBe(true);
  });

  it("returns true when the sum is 5", () => {
    // (◕‿◕) 2 + 3 = 5, another prime~ they are so precious!!
    expect(magicNumber(2, 3)).toBe(true);
  });

  it("returns true when the sum is 7", () => {
    // UwU 3 + 4 = 7~ yay another prime found!!
    expect(magicNumber(3, 4)).toBe(true);
  });

  it("returns true when the sum is 13", () => {
    // (｡♥‿♥｡) 6 + 7 = 13~ a lucky prime number!!
    expect(magicNumber(6, 7)).toBe(true);
  });

  it("returns true for larger primes like 97", () => {
    // ✨ 50 + 47 = 97, which is prime~ big primes are impressive uwu!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(magicNumber(50, 47)).toBe(true);
  });

  // (｡♥‿♥｡) cases where the sum is NOT prime~ these should return false, sadge but correct!!
  it("returns false when the sum is 1 (not prime~)", () => {
    // (◕‿◕) 0 + 1 = 1, which is NOT prime~ poor lonely 1!!
    expect(magicNumber(0, 1)).toBe(false);
  });

  it("returns false when the sum is 0", () => {
    // UwU 0 + 0 = 0, definitely not prime~ nope nope nope!!
    expect(magicNumber(0, 0)).toBe(false);
  });

  it("returns false when the sum is 4", () => {
    // ✨ 2 + 2 = 4, which is NOT prime (2 x 2)~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(magicNumber(2, 2)).toBe(false);
  });

  it("returns false when the sum is 9", () => {
    // (｡♥‿♥｡) 4 + 5 = 9, which is NOT prime (3 x 3)~ sneaky composite number!!
    expect(magicNumber(4, 5)).toBe(false);
  });

  it("returns false when the sum is a large composite like 100", () => {
    // OwO 50 + 50 = 100, definitely not prime~ so many factors!! (◕‿◕)
    expect(magicNumber(50, 50)).toBe(false);
  });

  it("works with negative numbers where the sum is prime", () => {
    // ✨ -1 + 4 = 3, which is prime~ negative inputs are allowed uwu!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(magicNumber(-1, 4)).toBe(true);
  });

  it("works with negative numbers where the sum is not prime", () => {
    // (｡♥‿♥｡) -2 + 6 = 4, which is NOT prime~ negative vibes, non-prime result!!
    expect(magicNumber(-2, 6)).toBe(false);
  });
});
