import "./IconButton.css";

/**
 * Reusable icon-only button (menu toggle, close, etc.).
 *
 * Props:
 *  - label: accessible name (required, used as aria-label)
 *  - className: extra classes
 *  - children: the icon, e.g. <Menu size={22} />
 */
function IconButton({
  children,
  label,
  type = "button",
  className = "",
  ...rest
}) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`dz-icon-btn ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
