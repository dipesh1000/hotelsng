import React from "react";

function HomeNewsletter() {
  return (
    <>
      <div className="newsletter">
        <div className="newsletter-title">
          <p>SIGN UP TO OUR NEWSLETTER</p>
        </div>
        <div className="newsletter-description">
          <p>
            Discover the most exclusive <br />
            before anyone
          </p>
        </div>
        <div className="email-newsletter">
          <div className="email-newsletter-wrapper">
            <input
              type="text"
              id="username"
              placeholder="Enter your email address..."
            />
            <button value="sign-up" type="submit">
              <i class="fa fa-paper-plane"></i>&nbsp; SIGN UP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNewsletter;
