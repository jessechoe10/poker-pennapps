import React from "react";

function Homepage() {
  // List of affiliation logos
  const affiliations = [
    "https://i.ibb.co/WkNrKPV/playdo-logo.png",
    "https://d11jve6usk2wa9.cloudfront.net/platform/31337/assets/logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1024px-MIT_logo.svg.png",
    "https://engineering.berkeley.edu/wp-content/uploads/2020/02/2Color_WEB_BE_Stacked.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/University_of_Washington_Block_W_logo_RGB_brand_colors.SVG/1499px-University_of_Washington_Block_W_logo_RGB_brand_colors.SVG.png",
    "https://standards.wharton.upenn.edu/wp-content/plugins/martech-chupacabra/includes/images/Wharton-Logo-RGB.png",
    "https://blog.seas.upenn.edu/wp-content/uploads/2020/05/Penn-Engineering-Logo-blue.png",
    "https://logos-world.net/wp-content/uploads/2023/01/University-of-Maryland-Logo.png",
    "https://www.radiancetech.com/wp-content/uploads/2018/02/NAVY-Naval-research-lab-logo-596x600.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-4">
      <h1 className="text-6xl font-bold mb-4">PokerFace</h1>
      <p className="mb-6 max-w-2xl w-11/12 mx-auto">
        <b>PokerFace</b> is your ultimate solution for simplifying and enhancing your poker experience. Our innovative platform allows you to seamlessly take a picture of your poker chips, intelligently identify each color, and accurately assess their values. With just a snap, you can automate payment transactions, eliminating the hassle of manual calculations and ensuring that everyone is on the same page.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition mb-8">
        Start Playing
      </button>

      {/* Affiliations Section */}
      <h2 className="text-3xl font-bold text-white mb-8">Our Affiliations</h2>
      <div className="py-16 bg-white bg-opacity-25 text-black w-screen"> {/* Full width and transparent white background */}
        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="flex animate-scroll">
            {/* Display logos in a loop */}
            {affiliations.concat(affiliations).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Affiliation ${index + 1}`}
                className="h-16 mx-4"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <h2 className="text-3xl font-bold text-white mt-6">Features</h2>
      <div className="mt-12 max-w-4xl w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <span className="text-4xl mb-4">📸</span>
          <h3 className="font-bold text-xl mb-2">Image Recognition</h3>
          <p className="text-white text-opacity-90">
            Effortless chip value recognition through image capture.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <span className="text-4xl mb-4">💸</span>
          <h3 className="font-bold text-xl mb-2">Automated Payments</h3>
          <p className="text-white text-opacity-90">
            Automated payment processing for smooth transactions.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg flex flex-col items-center text-center">
          <span className="text-4xl mb-4">🎮</span>
          <h3 className="font-bold text-xl mb-2">Game Management</h3>
          <p className="text-white text-opacity-90">
            Intuitive game management for private and tournament play.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
        }

        .overflow-hidden {
          width: 100%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default Homepage;