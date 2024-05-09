"use client";
import Link from "next/link"
import { useState, useEffect } from "react";

export default function AutoTypeSearchLinkComponent() {
  const [homeLocationInput, setHomeLocationInput] = useState("");
  const autoTypeTexts = ["Rome", "New York", "Tokyo", "Buenos Aires", "Istanbul"].map(city => city + " ".repeat(15));
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  function typeNextChar() {
    if (currentCharIndex <= autoTypeTexts[currentTextIndex].length) {
      setCurrentCharIndex(prevValue => prevValue + 1);

    } else {
      setCurrentCharIndex(0);
      setCurrentTextIndex((currentTextIndex + 1) % autoTypeTexts.length);
    }
  }
  useEffect(() => {
    const interval = setInterval(typeNextChar, 150);
    return () => clearInterval(interval)
  }, [currentCharIndex])

  return (
    <div>
      <form>
        <input
          type="text"
          name="location"
          placeholder={autoTypeTexts[currentTextIndex].slice(0, currentCharIndex)}
          value={homeLocationInput}
          onChange={(e) => setHomeLocationInput(e.target.value)}
          className="rounded-lg bg-white border-2 border-black p-3 w-full"
        />
        <Link href={{
          pathname: '/search',
          query: { homeLocation: homeLocationInput },
        }}>
          <button
            className="rounded-lg text-white bg-black p-1.5 w-full mt-2 hover:bg-white hover:text-black border-white border-2 hover:border-black"
          >
            Find Foods
          </button>
        </Link>
      </form>
    </div>
  );
}
