// hewwo!! (◕‿◕) these are the tests for our precious isPalindrome function~ let's make sure it's perfect!!
import { describe, expect, it } from "bun:test";
import { isPalindrome } from "./isPalindrome";

// (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ let's test all the cute lil cases and make sure everything works!! uwu
describe("isPalindrome", () => {
  // (｡♥‿♥｡) simple palindromes that should return true~ yay!!
  it("returns true for a simple palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("returns true for a single character string", () => {
    // (◕‿◕) one lil character is always a palindrome~ so smol and perfect!!
    expect(isPalindrome("a")).toBe(true);
  });

  it("returns true for an empty string", () => {
    // UwU an empty string is vacuously a palindrome~ nothing to disagree!!
    expect(isPalindrome("")).toBe(true);
  });

  it("is case-insensitive", () => {
    // ✨ uppercase and lowercase should be treated the same~ how fair!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(isPalindrome("RaceCar")).toBe(true);
  });

  it("ignores spaces and punctuation", () => {
    // (｡♥‿♥｡) the classic "A man, a plan, a canal: Panama" — so famous and so cute!!
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("ignores spaces for a simple spaced palindrome", () => {
    expect(isPalindrome("never odd or even")).toBe(true);
  });

  it("handles numeric palindromes", () => {
    // (◕‿◕) numbers can be palindromes too~ digits are cute!! uwu
    expect(isPalindrome("12321")).toBe(true);
  });

  it("handles alphanumeric mixed palindromes", () => {
    expect(isPalindrome("A1 1a")).toBe(true);
  });

  // (｡♥‿♥｡) non-palindromes that should return false~ sadge but important to check!!
  it("returns false for a non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  it("returns false for a string that is only a palindrome with wrong case", () => {
    // OwO "ab" is definitely not a palindrome even when you squint~
    expect(isPalindrome("ab")).toBe(false);
  });

  it("returns false for a non-palindrome with punctuation", () => {
    // ✨ punctuation shouldn't magically make it a palindrome~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    expect(isPalindrome("hello, world!")).toBe(false);
  });
});
