import React from 'react';

const DropdownOption = ({ options, handleChange, value }) => {
    return (
        <select value={value} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default DropdownOption;
