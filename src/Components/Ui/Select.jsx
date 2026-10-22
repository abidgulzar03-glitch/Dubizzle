import "./Select.css";
import { ChevronDown, Check } from "lucide-react";

/**
 * Reusable select that opens on hover or keyboard focus.
 *
 * Props:
 *  - options: array of strings
 *  - value: currently selected option
 *  - onChange: (option) => void
 *  - ariaLabel: accessible name for the trigger
 *  - className: extra classes
 */
function Select({
  options = [],
  value,
  onChange,
  ariaLabel = "Select",
  className = "",
}) {
  return (
    <div className={`dz-select ${className}`.trim()}>
      <button
        type="button"
        className="dz-select__trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
      >
        <span>{value}</span>
        <ChevronDown size={16} />
      </button>

      <div className="dz-select__menu" role="listbox">
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              type="button"
              key={option}
              role="option"
              aria-selected={selected}
              className={`dz-select__option ${selected ? "selected" : ""}`}
              onClick={() => onChange?.(option)}
            >
              <span>{option}</span>
              {selected && (
                <Check size={20} className="dz-select__check" strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Select;
