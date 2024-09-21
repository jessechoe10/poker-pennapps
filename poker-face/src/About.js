import React from "react";

function About() {
  const teamMembers = [
    {
      name: "Jesse Choe",
      role: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQECWCnl7E6esQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726613316001?e=1732147200&v=beta&t=4L2tpNlJpQlHAJUSn8lEZd_LmMnsc3q7SIkBV3sLMB0",
      bio: "Co-Founder & CEO @ Playdo.ai | QR Code Guy",
    },
    {
      name: "Aarav Patel",
      role: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQEx96-H3ERoZQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718213032280?e=1732147200&v=beta&t=2WlP-AuYZzG5Vl8nURqNt73VwRkj0SJeFnSXjGL2DBM",
      bio: "UPenn M&T | Poker + Finance Degen",
    },
    {
      name: "Aakarsh Agarwal",
      role: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQEfBk53ibN7Uw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705783266630?e=1732147200&v=beta&t=VR05bLu7YGzfIvL6fDuNOxbcswxDYq9oLmF9gFR61DE",
      bio: "UPenn M&T | Team Unc",
    },
    {
      name: "Arjun Verma",
      role: "Co-Founder",
      image: "https://media.licdn.com/dms/image/v2/D5603AQHMUg_9M1ey0Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726614314064?e=1732147200&v=beta&t=g6Lvr7M8f4lLMENADZ4ZpJuBGiPbLjpfe35V9n5JtlY",
      bio: "Penn CS | Poker Chip Photographer",
    },
  ];

  const sponsors = [
    {
      name: "Playdo.ai",
      logo: "https://i.ibb.co/WkNrKPV/playdo-logo.png",
      link: "https://playdoai.com",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-4">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>

      {/* Team Section */}
      <section className="mb-12 max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg">
              <img src={member.image} alt={member.name} className="rounded-full h-32 w-32 mb-4 mx-auto" />
              <h3 className="font-bold text-xl">{member.name}</h3>
              <p className="text-lg">{member.role}</p>
              <p className="text-white text-opacity-90 mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-4">Our Sponsor</h2>
        <div className="flex justify-center items-center flex-col">
          <a href={sponsors[0].link} target="_blank" rel="noopener noreferrer" className="rounded-lg p-6 shadow-lg mb-4">
            <img src={sponsors[0].logo} alt={sponsors[0].name} className="h-16 mb-2" />
          </a>
          <p className="text-white text-opacity-90">
            We are proud to be supported by our sponsor, whose commitment helps us innovate and grow. We advise everyone interested in tech or computer science to sign up for their waitlist by clicking on the link in the logo.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;