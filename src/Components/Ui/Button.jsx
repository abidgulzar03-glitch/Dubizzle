import "./Button.css";

/**
 * Reusable button.
 *
 * Props:
 *  - variant: "primary" (default) | "outline"
 *  - className: extra classes (for layout in the parent)
 *  - any other prop (onClick, type, disabled, aria-*) goes to <button>
 */
function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      className={`dz-btn dz-btn--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
