import React from "react";
import {
  FaLaptop,
  FaMouse,
  FaMicrochip,
  FaMobileAlt,
  FaGamepad,
  FaTv,
  FaCamera,
  FaCompactDisc,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

const Sidebar = ({ isVisible, setIsSidebarVisible }) => {

  const history = useHistory();

  const navItems = [
    {
      label: "Laptops, Tablets & PCs",
      icon: <FaLaptop />,
      submenu: {
        Laptops: ["Apple MacBook", "Business Laptop", "Gaming Laptop", "Ultrabook"],
        Tablets: ["Apple iPad", "Android tablets", "Windows Tablets"],
        PCs: ["Gaming PCs", "Office PCs", "All in one"]
      }
    },
    {
      label: "Computer & Office",
      icon: <FaMouse />,
      submenu: {
        Monitors: ["2K Monitors", "4K Monitors", "Curved Monitors", "Gaming Monitors"],
        Printers: ["Printers & All-in-One", "Inkjet Printers", "Laser Printers", "Scanners"],
        InputDevices: ["Mouse", "Keyboards", "Headsets", "Card readers"]
      }
    },
    {
      label: "Hardware & Components",
      icon: <FaMicrochip />,
      submenu: {
        Components: ["Cases", "Processors", "Graphics Cards", "Motherboards", "Memory RAM", "PC Power Supply Unit", "SSD Drive", "HDD Drive"],
        Cooling: ["CPU Fan", "Case Fan", "Thermal Paste"],
        Hardware: ["Cables & Adapters", "WIFI Routers", "WIFI Sticks", "Disc Drives"]
      }
    },
    {
      label: "Smartphones",
      icon: <FaMobileAlt />,
      submenu: {
        MobilePhones: ["Apple iPhone", "Android Smartphone", "Button Mobile Phones"],
        Wearables: ["Smart Watches", "Sport Watches"],
        Accessories: ["Cases", "Powerbanks", "Watch Straps"]
      }
    },
    {
      label: "Games & Entertainment",
      icon: <FaGamepad />,
      submenu: {
        Consoles: ["PlayStation Consoles", "Xbox Consoles", "Nintendo Consoles", "Consoles Games"],
        PC_Gaming: ["PC Games", "Gamepads", "Wheels", "VR Headsets"],
      }
    },
    {
      label: "TV & Hi-Fi",
      icon: <FaTv />,
      submenu: {
        TVS: ["8k TV", "4k TV", "OLED TV"],
        HIFI: ["Turntables", "Amplifier", "HiFi Speakers"]
      }
    },
    {
      label: "Photo & Video",
      icon: <FaCamera />,
      submenu: {
        Cameras_Drones: ["DSLR", "Mirrorless", "Full Frame", "Drones"],
        HIFI: ["Turntables", "Amplifier", "HiFi Speakers"]
      }
    },
    {
      label: "Home Appliance",
      icon: <FaCompactDisc />,
      submenu: {
        Kitchen: ["Dishwashers", "Fridges", "Ovens", "Blenders"],
        Bathroom: ["Washing Machines", "Dryer", "All in one"],
        Other: ["Vacuum Cleaners", "Irons", "Air conditioners"]
      }
    }
  ];


  const handleMouseEnter = () => {
    if (window.innerWidth > 576) setIsSidebarVisible(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 576) {
      setIsSidebarVisible(false);
      setShowMainCategories(true);
    }
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const handleSubmenuClick = (mainCategory, subItem) => {
    const path = `/product/${mainCategory}/${subItem}`;
    history.push(path);
  };

  const [showMainCategories, setShowMainCategories] = React.useState(true);

  return (
    <div
      className={`sidebar ${isVisible ? "open" : "collapsed"}`}
      onMouseEnter={() => setIsSidebarVisible(true)}
      onMouseLeave={() => {
        setIsSidebarVisible(false);
        setShowMainCategories(true);
      }}
    >
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaBars className="header-icon" onClick={() => setIsSidebarVisible(false)} />
          {isVisible && <span className="header-text ms-2">All Categories</span>}
        </div>

        {/* Show this only on screen < 992px */}
        {window.innerWidth < 992 && isVisible && (
          <button
            className="btn btn-sm btn-light ms-auto me-2"
            onClick={() => setShowMainCategories(false)}
          >
            Menu
          </button>
        )}
      </div>

      {showMainCategories ? (
        <ul className="sidebar-list">
          {navItems.map((item, index) => (
            <li
              className="sidebar-item"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="sidebar-item-left">
                <span className="icon">{item.icon}</span>
                {isVisible && <span className="label">{item.label}</span>}
              </div>
              {isVisible && <FaChevronRight className="arrow-icon" />}
              {isVisible && hoveredIndex === index && item.submenu && (
                <div className="submenu">
                  {Object.entries(item.submenu).map(([title, items]) => (
                    <div key={title}>
                      <h4>{title}</h4>
                      <ul>
                        {items.map((subItem, subIdx) => (
                          <li
                            key={subIdx}
                            onClick={() => handleSubmenuClick(title, subItem)}
                            style={{ cursor: "pointer" }}
                          >
                            {subItem}
                          </li>
                        ))}
                      </ul>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="sidebar-list">
          <li onClick={() => history.push("/promotion")}>Promotions</li>
          <li onClick={() => history.push("/store")}>Stores</li>
          <li onClick={() => history.push("/contact")}>Our Contacts</li>
          <li onClick={() => history.push("/deliveryReturn")}>Delivery & Return</li>
          <li onClick={() => history.push("/outlet")}>Outlet</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
