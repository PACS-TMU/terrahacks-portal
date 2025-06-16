'use client';

type ConsentCheckboxProps = {
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    required?: boolean;
};

export default function ConsentCheckbox({
    name,
    checked,
    onChange,
    children,
    required = false,
}: ConsentCheckboxProps) {
    return (
        <label className="grid grid-cols-[auto_1fr] gap-4 mb-4 text-white">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                required={required}
                className="accent-highlight w-5 h-5"
            />
            <span>{children}</span>
        </label>
    );
}
