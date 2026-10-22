import "./Header.css";
import Button from "./Ui/Button";
import Badge from "./Ui/Badge";
import IconButton from "./Ui/IconButton";
import Select from "./Ui/Select";
import { useState, useRef, useEffect, useCallback } from "react";

import {
  Bell,
  Bookmark,
  Heart,
  MessageCircle,
  ClipboardList,
  Building2,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Abu Dhabi");
  const [jobsOpen, setJobsOpen] = useState(false);
  const [jobsLeft, setJobsLeft] = useState(0);
  const [activeJobItem, setActiveJobItem] = useState(null);
  const headerRef = useRef(null);
  const jobsLinkRef = useRef(null);
  const jobsMenuRef = useRef(null);
  const closeTimer = useRef(null);

  // phones / tablets / any device without hover: use tap instead of hover
  const isTouchLike = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (hover: none)").matches;

  // defined before the effect that uses it (stable reference)
  const closeJobsMenu = useCallback(() => {
    clearTimeout(closeTimer.current);
    setJobsOpen(false);
    setActiveJobItem(null);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeJobsMenu();

    // tap / click outside the menu closes it
    const onPointerDown = (e) => {
      const insideMenu = jobsMenuRef.current?.contains(e.target);
      const onJobsLink = jobsLinkRef.current?.contains(e.target);
      if (!insideMenu && !onJobsLink) closeJobsMenu();
    };

    // keep position correct if the screen is resized / rotated
    const onResize = () => closeJobsMenu();

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      clearTimeout(closeTimer.current);
    };
  }, [closeJobsMenu]);

  const cities = [
    "All Cities (UAE)",
    "Dubai",
    "Abu Dhabi",
    "Ras al Khaimah",
    "Sharjah",
    "Fujairah",
    "Ajman",
    "Umm al Quwain",
    "Al Ain",
  ];

  const accountLinks = [
    { label: "Notifications", icon: Bell, href: "#notifications" },
    { label: "My Searches", icon: Bookmark, href: "#my-searches" },
    { label: "Favorites", icon: Heart, href: "#favorites" },
    { label: "Chats", icon: MessageCircle, href: "#chats" },
    { label: "My Ads", icon: ClipboardList, href: "#my-ads" },
    { label: "Bookings", icon: Building2, href: "#bookings" },
  ];

  const categories = [
    { label: "Motors", badge: "NEW", href: "#motors" },
    { label: "Property", badge: "NEW", href: "#property" },
    { label: "Jobs", href: "/jobs" },
    { label: "Classifieds", href: "#classifieds" },
    { label: "Furniture & Garden", href: "#furniture-and-garden" },
    { label: "Mobiles & Tablets", href: "#mobiles-and-tablets" },
    { label: "Community", href: "#community" },
  ];

  // ---- Jobs mega menu data ----
  const jobCategories = [
    "Accounting / Finance",
    "Automobile",
    "Beauty / Salon",
    "Cleaner / Housekeeper",
    "Construction",
    "Cook / Chef",
    "Customer Service / Call Centre",
    "Data Management & Analysis",
    "Design",
    "Driver / Delivery",
    "Education",
    "Engineering",
    "Event Management & Operations",
    "HR / Admin",
    "Handyman / Technician",
    "Information Technology",
    "Legal Services",
    "Logistics & Distribution",
    "Manufacturing / Warehouse",
    "Marine Captain / Crew",
  ];
  const jobTypes = ["Full Time", "Part Time", "Contract", "Temporary"];
  const jobQualifications = [
    "High School/Secondary",
    "Graduate",
    "Masters Degree",
    "PHD",
  ];

  const jobsMenu = [
    {
      title: "Jobs Seekers",
      items: [
        { label: "Jobs by Categories", list: jobCategories, viewAll: true },
        { label: "Jobs by Types", list: jobTypes },
        { label: "Jobs by Qualifications", list: jobQualifications },
      ],
    },
    {
      title: "Recruiters",
      items: [
        {
          label: "Jobs Seeker by Categories",
          list: jobCategories,
          viewAll: true,
        },
        { label: "Jobs Seeker by Types", list: jobTypes },
        { label: "Jobs Seeker by Qualifications", list: jobQualifications },
      ],
    },
  ];

  const openJobsMenu = () => {
    clearTimeout(closeTimer.current);
    if (jobsLinkRef.current && headerRef.current) {
      const link = jobsLinkRef.current.getBoundingClientRect();
      const head = headerRef.current.getBoundingClientRect();
      // reserve room for the right panel (420px) so the menu never runs
      // off-screen when it appears on hover
      const leftWidth =
        jobsMenuRef.current?.querySelector(".dz-jobs-left")?.offsetWidth || 0;
      const menuWidth = leftWidth + 420;

      // start under the Jobs link, but never let the menu leave the screen
      const wanted = link.left - head.left - 12;
      const maxLeft = head.width - menuWidth - 12;
      setJobsLeft(Math.max(12, Math.min(wanted, maxLeft)));
    }

    setJobsOpen(true);
  };

  const scheduleCloseJobsMenu = () => {
    if (isTouchLike()) return; // no hover-out on touch
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setJobsOpen(false);
      setActiveJobItem(null);
    }, 150);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="dz-header" ref={headerRef}>
      {/* Top header */}
      <div className="dz-topbar">
        {/* Logo and location */}
        <div className="dz-brand">
          <a href="/" className="dz-logo" aria-label="dubizzle home">
            <img src="/dubizzlelogo.svg" alt="dubizzle" />
          </a>

          {/* City selector */}
          <Select
            options={cities}
            value={selectedCity}
            onChange={handleCitySelect}
            ariaLabel="Select location"
          />
        </div>

        {/* Account navigation */}
        <nav
          className={`dz-account-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Account navigation"
        >
          {accountLinks.map(({ label, icon: Icon, href }) => (
            <a
              href={href}
              className="dz-account-link"
              key={label}
              onClick={closeMobileMenu}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </a>
          ))}

          <a href="#login" className="dz-login" onClick={closeMobileMenu}>
            Log in or sign up
          </a>

          <Button
            className="dz-ad-button"
            onClick={() => {
              closeMobileMenu();
              window.location.hash = "place-ad";
            }}
          >
            Place Your Ad
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <IconButton
          className="dz-mobile-toggle"
          label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="dz-account-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </IconButton>
      </div>

      {/* Category navigation */}
      <nav className="dz-category-nav" aria-label="Main categories">
        {categories.map(({ label, badge, href }) => {
          const isJobs = label === "Jobs";
          return (
            <a
              key={label}
              href={href}
              ref={isJobs ? jobsLinkRef : undefined}
              className={`dz-category-link ${isJobs ? "active" : ""} ${
                isJobs && jobsOpen ? "menu-open" : ""
              }`}
              aria-current={isJobs ? "page" : undefined}
              aria-haspopup={isJobs ? "true" : undefined}
              aria-expanded={isJobs ? jobsOpen : undefined}
              onMouseEnter={
                isTouchLike()
                  ? undefined
                  : isJobs
                    ? openJobsMenu
                    : closeJobsMenu
              }
              onMouseLeave={isJobs ? scheduleCloseJobsMenu : undefined}
              onFocus={
                isTouchLike()
                  ? undefined
                  : isJobs
                    ? openJobsMenu
                    : closeJobsMenu
              }
              onClick={(e) => {
                if (!isJobs) return closeJobsMenu();
                // touch devices: first tap opens the menu, second tap navigates
                if (isTouchLike() && !jobsOpen) {
                  e.preventDefault();
                  openJobsMenu();
                }
              }}
            >
              <span>{label}</span>

              {badge && <Badge>{badge}</Badge>}
            </a>
          );
        })}
      </nav>

      {/* Jobs mega menu */}
      <div
        ref={jobsMenuRef}
        className={`dz-jobs-menu ${jobsOpen ? "is-open" : ""}`}
        style={{ "--jobs-left": `${jobsLeft}px` }}
        onMouseEnter={openJobsMenu}
        onMouseLeave={scheduleCloseJobsMenu}
      >
        <div className="dz-jobs-left">
          {jobsMenu.map((group) => (
            <div className="dz-jobs-group" key={group.title}>
              <div className="dz-jobs-group-title">{group.title}</div>
              {group.items.map((item) => {
                const isActive = activeJobItem?.label === item.label;
                return (
                  <div key={item.label} className="dz-jobs-item-wrap">
                    <a
                      href="/jobs"
                      className={`dz-jobs-item ${isActive ? "active" : ""}`}
                      aria-expanded={isActive}
                      onMouseEnter={() =>
                        !isTouchLike() && setActiveJobItem(item)
                      }
                      onFocus={() => !isTouchLike() && setActiveJobItem(item)}
                      onClick={(e) => {
                        if (isTouchLike()) {
                          // tap toggles the list instead of navigating
                          e.preventDefault();
                          setActiveJobItem(isActive ? null : item);
                        } else {
                          closeJobsMenu();
                        }
                      }}
                    >
                      {item.label}
                      <ChevronDown size={14} className="dz-jobs-chevron" />
                    </a>

                    {/* inline list: only visible on phones (accordion) */}
                    {isActive && (
                      <ul
                        className={`dz-jobs-inline dz-jobs-list ${
                          item.list.length > 10 ? "two-col" : ""
                        }`}
                      >
                        {item.list.map((entry) => (
                          <li key={entry}>
                            <a href="/jobs" onClick={closeJobsMenu}>
                              {entry}
                            </a>
                          </li>
                        ))}
                        {item.viewAll && (
                          <li className="dz-jobs-viewall">
                            <a href="/jobs" onClick={closeJobsMenu}>
                              View all →
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <a href="/jobs" className="dz-jobs-hire" onClick={closeJobsMenu}>
            Hire with Us
          </a>
        </div>

        {activeJobItem && (
          <div className="dz-jobs-right">
            <div className="dz-jobs-right-head">
              <h4>{activeJobItem.label}</h4>
              {activeJobItem.viewAll && (
                <a href="/jobs" onClick={closeJobsMenu}>
                  View all <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
            <ul
              className={`dz-jobs-list ${
                activeJobItem.list.length > 10 ? "two-col" : ""
              }`}
            >
              {activeJobItem.list.map((entry) => (
                <li key={entry}>
                  <a href="/jobs" onClick={closeJobsMenu}>
                    {entry}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
