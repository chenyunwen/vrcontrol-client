import { useState } from "react";

export const Select = ({player, options, onClick}: {player: string; options: string[]; onClick: (player: string, roomId: string, seq: number) => void}) => {
    const [selectedOption, setSelectedOption] = useState('');
    return <>
    <select
        id="mySelect"
        className="text-gray"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">請選擇</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button className="bg-blue" onClick={() => onClick(player, selectedOption, 0)}>Submit</button>
    </>
}

export default Select