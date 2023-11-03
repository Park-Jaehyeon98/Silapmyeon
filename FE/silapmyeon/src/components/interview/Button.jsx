import { useState, useEffect } from "react";

function Button() {
  const [selectedOption, setSelectedOption] = useState("모의");
  return (
    <div>
      <label>
        <input
          type="radio"
          value="자율"
          checked={selectedOption === "자율"}
          onChange={handleOptionChange}
        />
        <button value="자율"></button>
        자율 연습
      </label>

      <label>
        <input
          type="radio"
          value="연습"
          checked={selectedOption === "연습"}
          onChange={handleOptionChange}
        />
        면접 연습
      </label>

      <label>
        <input
          type="radio"
          value="모의"
          checked={selectedOption === "모의"}
          onChange={handleOptionChange}
        />
        모의 면접
      </label>
    </div>
  );
}
