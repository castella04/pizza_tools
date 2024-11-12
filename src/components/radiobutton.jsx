import React from 'react';

function RadioButton({ options, selectedValue, setSelectedValue }) {
    return (
        <div>
            {options.map((option) => (
                <label key={option.value}>
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedValue === option.value}
                        onChange={() => setSelectedValue(option.value)}
                        required
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

export default RadioButton;