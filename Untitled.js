import React, { useState, useEffect } from 'react';
import { Github, Twitter, Mail, Gift, Sparkles } from 'lucide-react';

const GlitchText = ({ children }) => (
  <span className="relative inline-block">
    <span className="absolute top-0 left-0 -ml-1 text-red-500">{children}</span>
    <span className="absolute top-0 left-0 ml-1 text-blue-500">{children}</span>
    <span className="relative text-white dark:text-gray-200">{children}</span>
  </span>
);

const CyberpunkButton = ({ onClick, children, description }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div 
      className="relative mb-12 transition-all duration-300 ease-in-out transform skew-x-12 cursor-pointer"
      style={{
        width: hover ? 'calc(100vw - 2rem)' : '250px',
        height: '60px',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div 
        className={`
          absolute top-0 left-0
          h-full w-full
          bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white
          border-2 border-indigo-500 dark:border-purple-500
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${hover ? 'w-48' : 'w-full'}
        `}
      >
        <span className="font-bold text-lg transform -skew-x-12">{children}</span>
      </div>
      <div 
        className={`
          absolute top-0 left-0
          h-full w-full
          bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-purple-600 dark:to-pink-600
          transform transition-all duration-300 ease-in-out
          ${hover ? 'translate-x-0' : 'translate-x-full'}
        `}
      ></div>
      {hover && (
        <div className="absolute top-0 left-48 h-full flex items-center ml-4 z-10">
          <div className="bg-gray-200 dark:bg-gray-800 p-2 transform skew-x-12">
            <p className="text-gray-800 dark:text-white text-sm font-medium transform -skew-x-12">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


const SocialButton = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-purple-400 transition-colors duration-300"
  >
    <Icon size={24} />
  </a>
);

const CombinedPage = () => {
  const [showWunschliste, setShowWunschliste] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const toggleWunschliste = () => {
    setTransitioning(true);
    setTimeout(() => {
      setShowWunschliste(!showWunschliste);
      setTransitioning(false);
    }, 500);
  };

  const items = [
    { title: "Montblanc Explorer", description: "Luxuriöses Parfum für den besonderen Anlass. 100ml Flakon für langanhaltenden Duft.", price: "ca. 60€", category: "Parfum", link: "https://www.douglas.de/de/p/3001052849?variant=058201" },
    { title: "Philips Sonicare DiamondClean 9000", description: "Hochwertige elektrische Zahnbürste für strahlend weiße Zähne und gesundes Zahnfleisch.", price: "140€", category: "Gesundheit", link: "https://www.amazon.de/Philips-DiamondClean-Elektrische-Zahnb%C3%BCrste-HX9911/dp/B08557LZMM?th=1" },
    { title: "Kaiten Revolution Spirit Slim Karate Gi", description: "Professioneller Karate-Anzug für intensives Training. Größe: 180 cm / 5.", price: "ca. 130€", category: "Karate", link: "https://www.kaiten.de/karateanzuege/kaiten/680/kaiten-revolution-spirit-slim?number=4180&c=4#f6b061288a1c4a50538a5abf771942a6" },
    { title: "Roland FP30 E-Piano - Weiß", description: "Damit Your Lie in April keine Lie bleibt.", price: "ca. 400-700€", category: "Musik", link: "https://www.thomann.de/de/roland_fp_30x_wh.htm" },
    { title: "NieR:Automata T-Shirt", description: "Schickes T-Shirt für Fans des kultigen Spiels.", price: "ca. 15€", category: "Anime", link: "https://de.aliexpress.com/item/1005002674948686.html" },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark' : ''} ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`
        min-h-screen p-8 transition-all duration-500
        ${showWunschliste 
          ? 'bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-slate-900 dark:to-purple-900 text-gray-800 dark:text-white' 
          : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white'}
      `}>
        <div className="container mx-auto max-w-4xl">
          <header className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-extrabold font-[var(--font-orbitron)] text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-400 dark:to-pink-400 glow-text-enhanced">
              {showWunschliste ? "VIELEN DANK <3" : <GlitchText>OSKAR POKORSKI</GlitchText>}
            </h1>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-3 rounded-full ${darkMode ? 'bg-amber-400 text-gray-900' : 'bg-slate-800 text-amber-400'} hover:opacity-80 transition-all duration-300 transform hover:scale-110`}
            >
              <Sparkles size={28} />
            </button>
          </header>

          <main>
            {!showWunschliste ? (
              <div className="flex flex-col items-center w-full">
                <CyberpunkButton href="/cv" description="Professioneller Werdegang und Skills">CV</CyberpunkButton>
                <CyberpunkButton onClick={toggleWunschliste} description="Aktuelle Wünsche und Ziele">Wunschliste</CyberpunkButton>
                <CyberpunkButton href="https://youtube.com" description="Video-Inhalte und Tutorials">YouTube</CyberpunkButton>
                <CyberpunkButton href="https://kombinatorik.info" description="Mathematik und Logik">kombinatorik.info</CyberpunkButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {items.map((item, index) => (
                  <WunschlisteItem key={index} {...item} />
                ))}
              </div>
            )}
          </main>

          <footer className="mt-12 flex justify-center">
            {!showWunschliste ? (
              <div className="flex justify-center space-x-6">
                <SocialButton href="https://github.com/oskarpokorski" icon={Github} />
                <SocialButton href="https://twitter.com/oskarpokorski" icon={Twitter} />
                <SocialButton href="mailto:oskar@example.com" icon={Mail} />
              </div>
            ) : (
              <button 
                onClick={toggleWunschliste}
                className="text-indigo-600 dark:text-purple-400 hover:text-indigo-800 dark:hover:text-purple-300 transition-colors duration-300"
              >
                Zurück zur Startseite
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CombinedPage;







const WunschlisteItem = ({ title, description, price, category, link }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`
        mb-6 overflow-hidden transition-all duration-300 
        hover:shadow-2xl dark:hover:shadow-purple-500/50 hover:shadow-indigo-500/50 
        dark:bg-slate-800 bg-white border-2 border-indigo-300 dark:border-purple-300 
        transform skew-x-12 cursor-pointer
        ${expanded ? 'h-auto' : 'h-20'}
      `}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6 transform -skew-x-12">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold font-[var(--font-orbitron)] dark:text-purple-400 text-indigo-600">{title}</h3>
          <span className="bg-indigo-500 dark:bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {category}
          </span>
        </div>
        {expanded && (
          <>
            <p className="text-md dark:text-gray-300 text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold dark:text-amber-400 text-amber-600">{price}</span>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-purple-600 dark:to-pink-600 text-white rounded-full font-bold hover:opacity-90 transition-all duration-300 flex items-center space-x-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Gift size={20} />
                <span>Bestellen und Oskar schenken</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
