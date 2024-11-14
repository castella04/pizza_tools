import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css//Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header class="header">
      <div class="header_inner">
        {/* <div class="header_logo">
                    <img src="../PH_LOGO-1.jpg" alt='page-logo'/>
                </div> */}
        <div class="title">
          <h1>
            <Link to="/">ぴざつーる</Link>
          </h1>
        </div>
        <button class="toggle-menu-button" onClick={toggleMenu}>
          &#9776; {/*ハンバーガアイコン*/}
        </button>
        <div class="navbar">
          <nav
            class={isMenuOpen ? "header-site-menu open" : "header-site-menu"}
          >
            <ul>
              <li>
                <Link to="/opemane" onClick={() => setIsMenuOpen(false)}>
                  運行日誌デジタル
                </Link>
              </li>
              <li>
                <Link
                  to="https://pizzahut2.knowbuild.biz/#/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ラーニングゾーン
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
