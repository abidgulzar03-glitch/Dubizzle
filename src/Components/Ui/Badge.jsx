import "./Badge.css";

/**
 * Reusable badge (e.g. the red "NEW" pill).
 *
 * Props:
 *  - variant: "primary" (default) | "dark" | "light"
 *  - className: extra classes
 */
function Badge({ children, variant = "primary", className = "", ...rest }) {
  return (
    <span
      className={`dz-badge dz-badge--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
