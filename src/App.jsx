import { useEffect, useState, useCallback, useRef } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isNumbers, setIsNumbers] = useState(false);
  const [isSpecialCharacters, setIsSpecialCharacters] = useState(false);
  const inputRef = useRef(null);

  const generatePassword = useCallback(() => {
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+";
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let characters = alphabets;
    if (isNumbers) characters += numbers;
    if (isSpecialCharacters) characters += specialCharacters;
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setPassword(newPassword);
  }, [isNumbers, isSpecialCharacters, length]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumbers, isSpecialCharacters, generatePassword]);

  const handleCopy = () => {
    inputRef.current?.select();
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="bg-slate-900 h-screen text-white flex flex-col">
      <h1 className="text-4xl font-bold text-center pt-10">
        Welcome to Password Generator
      </h1>
      <div className="w-3/6 min-h-[30vh] bg-black m-auto rounded-xl shadow-2xl shadow-slate-800 flex flex-col">
        <div className="bg-emerald-800 rounded-2xl shadow-lg shadow-neutral-800 m-8 h-full">
          <div className="flex flex-col">
            <span className="flex m-2 py-4">
              <input
                type="text"
                ref={inputRef}
                readOnly
                value={password}
                aria-label="Generated password"
                className="rounded-l-lg bg-green-500 text-black p-4 w-full text-2xl font-semibold"
              />
              <button
                onClick={handleCopy}
                className="bg-white text-black rounded-r-lg p-4 text-xl font-semibold hover:bg-slate-500 hover:text-white"
              >
                Copy
              </button>
            </span>
            <span className="flex py-5 px-2 gap-6 flex-wrap">
              <span className="flex gap-3">
                <input
                  type="range"
                  value={length}
                  min={6}
                  max={40}
                  onChange={(e) => setLength(parseInt(e.target.value, 10))}
                  aria-label="Password length"
                  className="w-52 text-xl cursor-pointer"
                />
                <span className="text-2xl font-semibold">Length: {length}</span>
              </span>
              <span className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  className="w-8 h-8"
                  checked={isNumbers}
                  onChange={(e) => setIsNumbers(e.target.checked)}
                  aria-label="Include numbers"
                />
                <span className="text-2xl font-semibold">Numbers</span>
              </span>
              <span className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  className="w-8 h-8"
                  checked={isSpecialCharacters}
                  onChange={(e) => setIsSpecialCharacters(e.target.checked)}
                  aria-label="Include special characters"
                />
                <span className="text-2xl font-semibold">
                  Special Characters
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
