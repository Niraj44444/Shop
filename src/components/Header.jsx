import React from "react";

function Header() {
  return (
    <header className="header-content position-relative">
      {/* Ensure this image exists in your public/images folder */}
      <img
        className="hero-image"
        src="/images/cover.jpg"
        alt="A library or a reading scene"
      />

      <div className="position-absolute-middle">
        <div className="tab-content" style={{ display: "block" }}>
          <h3 className="section-title">Search Your Next Read</h3>
          <p className="section-subtitle">
            Search our entire library by <strong>title</strong>, <strong>author</strong>, 
            <strong> description</strong> or <strong>category</strong>.
          </p>

          <div className="search-container">
            <input
              className="form-input"
              type="text"
              placeholder="e.g., The World of Ice & Fire or George R.R. Martin"
            />
            <p>
              <button className="btn btn-primary">
                Search Books
              </button>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;