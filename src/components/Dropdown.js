import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Dropdown(props) {
  const { regions, regionFilter } = props;

  const [dropdownActive, setDropdownActive] = useState(false);
  const toggleDropdown = () => setDropdownActive(!dropdownActive);
  const node = useRef();

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropdownActive(false);
  };

  useEffect(() => {
    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownActive]);

  return (
    <div className="filter-drop-down">
      <div className="drop-down-header">
        <button className="btn drop-down-btn" onClick={toggleDropdown}>
          Filter by Region <MdKeyboardArrowDown size={18} />
        </button>
      </div>
      {/* <div> */}
      {dropdownActive && (
        <div ref={node} className="drop-down-list">
          {regions.map((region, index) => (
            <button
              key={index}
              onClick={() => {
                regionFilter(region);
                toggleDropdown();
              }}
              className="btn drop-down-item"
            >
              {region}
            </button>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
