import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20" 
             style={{ backgroundImage: "url('/hero2.jpg')" }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-blue-900/40" />
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10 flex flex-col items-center">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Transform Your </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
              Hiring Process
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Effortlessly filter resumes using smart AI algorithms and auto-send personalized 
            emails to top candidates. Save time, hire smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg">
              Watch Demo
            </button>
          </div>
        
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '95%', text: 'Time Saved' },
              { number: '10x', text: 'Faster Hiring' },
              { number: '5,000+', text: 'Happy Users' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;