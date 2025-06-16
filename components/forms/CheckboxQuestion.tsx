import React from "react";

interface CheckboxQuestionProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    required?: boolean;
}

export default function CheckboxQuestion({
    id,
    name,
    checked,
    onChange,
    label,
    required = false,
}: CheckboxQuestionProps) {
    return (
        <label className="flex items-center gap-2 mb-2" htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                required={required}
                className="accent-[#2a6c82] w-5 h-5"
            />
            {label}
        </label>
    );
}