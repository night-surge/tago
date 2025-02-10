import React from "react";
import Image, { StaticImageData } from "next/image";
import Navbar from "../components/Navbar";
import BackgroundGrid from "../components/BackgroundGrid";
import akIMG from "../assets/ak_bento.jpg";
// import nilayIMG from "../assets/nilay.jpg";
import saranshIMG from "../assets/saransh.jpg";

type TeamMember = {
  name: string;
  email: string;
  phone: string;
  imageUrl: string | StaticImageData;
  alignProps?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Ayush Katare",
    email: "katareayush2005@gmail.com",
    phone: "+91-8319797487",
    imageUrl: akIMG,
    alignProps: "-translate-y-5"
  },
  {
    name: "Saransh Jain",
    email: "saranshj647@gmail.com",
    phone: "+91-7838075004",
    imageUrl: saranshIMG
  },
  {
    name: "Nilay Gupta",
    email: "nilayguptaforwork@gmail.com",
    phone: "+91-8960710445",
    imageUrl: "/api/placeholder/150/150"
  },
  
];

const TeamGrid = () => {
  return (
    <>
      <Navbar />
      <BackgroundGrid>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:bg-white/15"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-purple-500/30 relative">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className={`rounded-full object-cover ${member.alignProps}`} 
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-gray-300 text-center">
                  <p className="mb-1">
                    <span className="font-medium text-purple-300">Email: </span>
                    {member.email}
                  </p>
                  <p>
                    <span className="font-medium text-purple-300">Phone: </span>
                    {member.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundGrid>
    </>
  );
};

export default TeamGrid;
