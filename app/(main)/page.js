import Link from 'next/link';
// Import all necessary icons
import { FaHeart, FaHandsHelping, FaBullseye, FaUnity, FaBook, FaHandshake } from 'react-icons/fa'; 

// Define the organization's details
const ORGANIZATION_NAME = "Happy Life Organization";

// --- UPDATED Aims and Objectives Data for HOME PAGE ---
// Using the most impactful objectives from the official list (Article Two)
const aimsAndObjectivesHome = [
  {
    icon: FaUnity,
    title: "Foster Unity",
    description: "To better organize and bring less privileged people under one umbrella, fostering cooperation and an effective organization.",
  },
  {
    icon: FaBook,
    title: "Vocational Education",
    description: "To cater for less privileged girls and women to acquire vocation education for self-sufficiency.",
  },
  {
    icon: FaHandshake,
    title: "Community Peace",
    description: "To promote and foster better relationships between communities for development and peace.",
  },
  {
    icon: FaHandsHelping,
    title: "Grassroots Mobilization",
    description: "To mobilise and organised grassroots people for socio-economic proposes and development.",
  },
];


export default function HomePage() {
  return (
    <div className="home-page-content">

      {/* =====================================================
          1. HERO SECTION
      ====================================================== */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* Placeholder for a background image/video/pattern */}
        <div className="absolute inset-0 bg-cover bg-center opacity-80" 
             style={{ backgroundImage: "url('/images/hero-placeholder.jpg')" }}>
        </div>
        
        <div className="relative z-10 text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl max-w-4xl mx-auto border-t-4 border-indigo-600">
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-4">
            Welcome to the {ORGANIZATION_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8 max-w-2xl mx-auto">
            Dedicated to inspiring joy, building community, and creating opportunities for a **Happy Life** for everyone.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/about" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
            >
              Our Mission &rarr;
            </Link>
            <Link 
              href="/login" // Changed href to /donate, as it's an action button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. MISSION STATEMENT
      ====================================================== */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-green-500 inline-block pb-1">
            Our Purpose
          </h2>
          <blockquote className="text-xl italic text-gray-600 max-w-4xl mx-auto leading-relaxed">
            "To uplift and support communities by providing resources, promoting unity, and advocating for social justice, ensuring every individual has the pathway to a truly happy and fulfilling life."
          </blockquote>
        </div>
      </section>

      {/* =====================================================
          3. AIMS AND OBJECTIVES (Updated to specific, key points)
      ====================================================== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-12">
            Our Core Pillars
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aimsAndObjectivesHome.map((aim, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-500 flex flex-col items-center text-center"
              >
                <aim.icon className="text-5xl text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-indigo-700 mb-3">{aim.title}</h3>
                <p className="text-gray-600 text-sm">{aim.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link
                href="/about"
                className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold border-b-2 border-indigo-600 pb-1 transition duration-300"
              >
                View All Ten Aims & Objectives &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      {/* =====================================================
          4. Call to Action
      ====================================================== */}
      <section className="py-12 px-6 bg-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Make a Difference Today</h2>
          <p className="text-lg mb-6 opacity-90">
            Your support helps us turn our objectives into reality. Join us in making the world a happier place.
          </p>
          <Link
            href="/"
            className="bg-white text-indigo-700 hover:bg-gray-200 font-bold text-lg py-3 px-8 rounded-full shadow-xl transition duration-300"
          >
            Donate Now
          </Link>
        </div>
      </section>

    </div>
  );
}