import { RiMoonLine, RiMoonFill } from "react-icons/ri";

export default function Header(props) {
  const { onThemeToggle, isDarkMode } = props;
  // localStorage.setItem("theme", "dark-mode");

  return (
    <header className="header">
      <div className="wrapper">
        <span className="nav-logo">
          <a href="/">Where in the World?</a>
        </span>
        <span className="nav-theme-toggler">
          <button className="btn theme-toggler-btn" onClick={onThemeToggle}>
            {!isDarkMode ? (
              <RiMoonFill className="theme-icon" />
            ) : (
              <RiMoonLine className="theme-icon" />
            )}{" "}
            Dark Mode
          </button>
        </span>
      </div>
    </header>
  );
}
