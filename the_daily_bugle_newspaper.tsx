import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Moon, 
  Sun, 
  ArrowLeft, 
  Share2, 
  Clock, 
  Calendar, 
  User, 
  Flame, 
  TrendingUp, 
  AlertCircle, 
  Trash2, 
  Check, 
  Filter,
  ExternalLink,
  Volume2
} from 'lucide-react';

// --- DATA: 10 Bugle Articles with JJJ Flair and New York City lore ---
const INITIAL_ARTICLES = [
  {
    id: 'db-001',
    title: 'SPIDER-MAN: MENACE OR THREAT? CITY COUNCIL DEMANDS ANSWERS!',
    subtitle: 'Costumed vigilante leaves trail of damaged public property and shattered gargoyles across Midtown.',
    category: 'Menace Watch',
    author: 'J. Jonah Jameson',
    role: 'Publisher & Editor-in-Chief',
    date: 'OCT 30, 2026',
    readTime: '4 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=1200&q=80',
    caption: 'Suspect spotted scaling Chrysler Building spire before vanishing into the rain. (Photo: Peter Parker)',
    summary: 'While soft-headed citizens applaud this masked marauder, taxpayers foot the multimillion-dollar bill for ruptured water mains and shattered masonry.',
    content: [
      'NEW YORK — Another day, another catastrophic demonstration of why masked vigilantes have no place in civilized Manhattan society. Yesterday afternoon, rush-hour traffic along 5th Avenue was brought to an agonizing standstill when the self-anointed "Spider-Man" engaged in a reckless airborne scuffle.',
      'According to eyewitnesses, structural facade decor fell within inches of terrified pedestrians. Did this so-called hero stick around to speak with NYPD officers? Did he sign for the smashed municipal buses? No! He swung away cowardly into the cloud cover, leaving hardworking civil servants to untangle his sticky, chemically toxic residue.',
      '"The man is a public hazard, plain and simple," thundered City Commissioner O’Malley at an emergency press briefing called outside City Hall this morning. "We cannot allow anonymous actors dressed in pyjamas to dictate public safety laws."',
      'The Daily Bugle has launched an official tip line. We are offering a $10,000 bounty for unmasked photographs of this menace. If you know who is hiding behind that insect mask, step forward. New York deserves the truth!'
    ],
    tags: ['Spider-Man', 'Midtown', 'NYPD', 'Vigilante', 'JJJ Exclusive']
  },
  {
    id: 'db-002',
    title: 'OSCORP UNVEILS EXPERIMENTAL "CLEAN ENERGY" TURBINES AT ROOSEVELT ISLAND',
    subtitle: 'Norman Osborn assures citizens that electromagnetic surges during testing are "completely within safety tolerances."',
    category: 'Science & Tech',
    author: 'Betty Brant',
    role: 'Senior Investigative Reporter',
    date: 'OCT 29, 2026',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    caption: 'The newly activated Roosevelt Island reactor glowed an ominous neon green yesterday.',
    summary: 'Oscorp executives dismissed local wildlife disruptions and power grid flickers as "routine calibration hiccups."',
    content: [
      'Roosevelt Island residents were startled early Tuesday evening when high-voltage arcs pulsed across the Oscorp Advanced Propulsion lab. Oscorp CEO Norman Osborn appeared before shareholders, waving off environmental hazard petitions.',
      '"Innovation requires boldness," Osborn told journalists during the launch tour. "Our zero-emission bio-generators will power Manhattan for decades without depleting municipal reserves."',
      'However, harbor workers report erratic magnetic disturbances disrupting navigational compasses across the East River. Bugle science consultants have urged city inspectors to audit Oscorp containment vaults immediately.'
    ],
    tags: ['Oscorp', 'Norman Osborn', 'Technology', 'East River']
  },
  {
    id: 'db-003',
    title: 'THE SHOCKER STRIKES UNION SQUARE VAULT; THWARTED BEFORE ESCAPE',
    subtitle: 'Vibratory sonic cannons collapse bank vestibule before mysterious web snags getaway vehicle.',
    category: 'NYC Crime',
    author: 'Ben Urich',
    role: 'Metro Desk Chief',
    date: 'OCT 28, 2026',
    readTime: '5 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    caption: 'Heavily reinforced armored transport left suspended between two streetlamps.',
    summary: 'Herman Schultz, alias "The Shocker", was remanded to the Raft maximum security wing following a chaotic diamond heist.',
    content: [
      'Midtown Federal Bank became ground zero for sonic warfare yesterday as career felon Herman Schultz blasted through reinforced steel gates with gauntlet-mounted acoustic pulse emitters.',
      'Just as Schultz loaded $4.2 million in bearer bonds into an armored van, twin cables of high-tensile web filament snagged the drive shaft, flipping the vehicle onto safety barricades.',
      'Special tactical units secured Schultz without human casualties. While onlookers cheered the webbed intervention, District Attorney officials noted that property damages exceeded the value of the preserved bonds threefold.'
    ],
    tags: ['The Shocker', 'Bank Heist', 'Union Square', 'Raft']
  },
  {
    id: 'db-004',
    title: 'EDITORIAL: WHY I WILL NEVER STOP DEMANDING SPIDER-MAN’S ARREST',
    subtitle: 'A personal manifesto on true heroism vs. unchecked vigilante anarchy.',
    category: 'Opinion',
    author: 'J. Jonah Jameson',
    role: 'Publisher & Editor-in-Chief',
    date: 'OCT 27, 2026',
    readTime: '6 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    caption: 'New York City skyline: protected by brave men and women in blue, not arachnid cowards.',
    summary: 'A true hero wears a badge, pays taxes, and faces the judge and jury. Real heroes don’t skulk in back alleys with masked identities.',
    content: [
      'People ask me every day: "Jonah, why are you so tough on Spider-Man? Didn’t he stop that subway derailment? Didn’t he catch that mugger?"',
      'Let me tell you something: my father served with honor. Firefighters walk into burning tenements with names emblazoned on their turnout coats. Police officers put their badges on the line under the scrutiny of the press and the law. They don’t hide their faces behind painted spandex!',
      'When someone refuses to show who they are, they are hiding their conscience. Who audits Spider-Man? Who prosecutes him when his acrobatic antics crush a bodega awning? Nobody! That is not a hero—that is a loose cannon waiting to ignite!'
    ],
    tags: ['JJJ Editorial', 'NYPD', 'Civic Duty', 'Accountability']
  },
  {
    id: 'db-005',
    title: 'SPOTTED: ARMORED RHINO-LIKE BEHEMOTH TEARS THROUGH QUEENS BOULEVARD',
    subtitle: 'Traffic obliterated for 14 blocks before tactical containment units arrived.',
    category: 'Sightings',
    author: 'Ned Leeds',
    role: 'Staff Correspondent',
    date: 'OCT 26, 2026',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    caption: 'Asphalt gouges up to two feet deep line Queens Blvd following the stampede.',
    summary: 'The armored brute Aleksei Sytsevich smashed six concrete mixers before redirecting toward the industrial waterfront.',
    content: [
      'Commuters on Queens Boulevard witnessed nightmare fuel Tuesday morning when a 9-foot-tall polymer-armored giant known in underworld whispers as "The Rhino" charged headlong down oncoming lanes.',
      'Department of Transportation workers dove into access ditches as the brute ripped an MTA bus off its axles. Witnesses claim the creature was bellowing challenges into the sky, demanding "The Spider" come face him.',
      'Emergency barricades remain stationed around Sunnyside Yards. Mayor’s office officials advise all Queens residents to remain vigilant and report structural vibrations immediately.'
    ],
    tags: ['Queens', 'Rhino', 'MTA', 'Sightings']
  },
  {
    id: 'db-006',
    title: 'DR. CURT CONNORS ASSURES CITY: "REPTILIAN CELLULAR REGENERATION IS SAFE"',
    subtitle: 'ESU biology professor promises amputee breakthroughs despite rumors of erratic test-subject outbursts.',
    category: 'Science & Tech',
    author: 'Betty Brant',
    role: 'Senior Investigative Reporter',
    date: 'OCT 25, 2026',
    readTime: '4 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    caption: 'Dr. Connors demonstrating tissue synthesis models at Empire State University labs.',
    summary: 'The groundbreaking geneticist claims cross-species DNA sequencing holds the key to limb restoration.',
    content: [
      'At Empire State University, Dr. Curtis Connors delivered an impassioned defense of his controversial reptilian limb-regeneration initiative. The decorated geneticist claimed that mammalian gene therapy has plateaued.',
      '"Lizards regenerate lost appendages in weeks," Dr. Connors argued before fellow academics. "By harnessing epigenetic triggers, human amputees could walk again within days."',
      'However, unconfirmed leaks from the ESU custodial staff allege severe sewer-line gashes and unusual reptilian scale shedding in the basement plumbing. Connors dismissed the claims as superstitious folklore.'
    ],
    tags: ['Curt Connors', 'Lizard', 'ESU', 'Science']
  },
  {
    id: 'db-007',
    title: 'BROOKLYN BOTANICAL GARDEN REPORTS BIZARRE VINE GROWTH AFTER NIGHT SKY FLASH',
    subtitle: 'Exotic flora expands thirty feet overnight; botanists baffled by unearthly bioluminescence.',
    category: 'Sightings',
    author: 'Peter Parker',
    role: 'Freelance Photographer',
    date: 'OCT 24, 2026',
    readTime: '2 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    caption: 'Bizarre black-and-purple tendrils wrapping around greenhouse framework.',
    summary: 'Park rangers sealed off the conservatory after midnight readings registered unprecedented chlorophyll mutations.',
    content: [
      'Security personnel at Brooklyn Botanical Gardens were greeted by an astonishing sight at dawn: an entire greenhouse wing choked by thick, oily tendrils emitting a subtle rhythmic hum.',
      'According to garden curator Elena Vance, atmospheric telemetry picked up a micro-meteoroid impact near the conservatory grounds at 2:14 AM.',
      'The Daily Bugle dispatched photographer Peter Parker to capture images of the phenomenon before Department of Environmental Protection hazmat units quarantined the perimeter.'
    ],
    tags: ['Brooklyn', 'Symbiote', 'Botanical', 'Meteor']
  },
  {
    id: 'db-008',
    title: 'THE FISK TOWER CHARITY GALA: BILLIONAIRE WILSON FISK PLEDGES $50M TO SLUM REBUILD',
    subtitle: 'Controversial real estate mogul claims New York needs "builders, not brawlers."',
    category: 'NYC Crime',
    author: 'Ben Urich',
    role: 'Metro Desk Chief',
    date: 'OCT 23, 2026',
    readTime: '4 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    caption: 'Wilson Fisk speaking at Hell\'s Kitchen benefit gala.',
    summary: 'While city magistrates praise the philanthropic endowment, federal investigators continue probing shell contracts.',
    content: [
      'Surrounded by Manhattan elite, Wilson Fisk announced the launch of the "Fisk Urban Restoration Fund," promising to revitalize neglected blocks throughout Hell’s Kitchen and Spanish Harlem.',
      '"I was raised on these rough pavements," Fisk stated in his gravelly baritone. "Our city suffers from chaos and theatrical vigilantism. What we need is stability, infrastructure, and order."',
      'Behind the champagne flutes, however, Bugle sources confirm federal prosecutors continue reviewing port-authority manifests linked to several Fisk distribution fronts.'
    ],
    tags: ['Wilson Fisk', 'Kingpin', 'Hells Kitchen', 'Philanthropy']
  },
  {
    id: 'db-009',
    title: 'GREEN GOBLIN HOVER-GLIDER SPOTTED OVER GEORGE WASHINGTON BRIDGE?',
    subtitle: 'Terrified motorists report chilling cackles and pumpkin-shaped combustive ordnance.',
    category: 'Menace Watch',
    author: 'J. Jonah Jameson',
    role: 'Publisher & Editor-in-Chief',
    date: 'OCT 22, 2026',
    readTime: '5 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    caption: 'Smoke contrails linger above upper bridge suspension cables.',
    summary: 'Eyewitness accounts describe a cackling emerald-masked aviator hurling explosive pods across rush hour lanes.',
    content: [
      'Panic gripped the George Washington Bridge at twilight when a low-flying turbine glider swooped between suspension towers, setting off a cascade of acoustic explosions.',
      'Several drivers abandoned vehicles as acrid pumpkin-scented smoke filled the inbound express lanes. Port Authority police fired warning shots, but the aerial assassin accelerated south toward the Palisades.',
      'Are Spider-Man and this winged ghoul working together? The Bugle has long suspected collusion among these costumed freaks! Send your photos to the Bugle newsroom immediately!'
    ],
    tags: ['Green Goblin', 'GW Bridge', 'Pumpkin Bombs', 'Menace Watch']
  },
  {
    id: 'db-010',
    title: 'BUGLE EXCLUSIVE: WHO KEEPS SUPPLYING SPIDER-MAN WITH THOSE WEBS?',
    subtitle: 'Chemical engineers examine abandoned filaments; reveal formula requires industrial polymer refinement.',
    category: 'Opinion',
    author: 'Ned Leeds',
    role: 'Staff Correspondent',
    date: 'OCT 21, 2026',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    caption: 'Microscopic inspection of synthetic web fluid dissolved after 60 minutes.',
    summary: 'The compound dissolves into thin air within an hour, making criminal forensics nearly impossible.',
    content: [
      'Chemical analysis performed at an independent Brooklyn lab on freshly harvested web fiber revealed a high-tensile nylon derivative with shear strength rivaling military Kevlar.',
      'The most infuriating factor for prosecutors? The fluid degrades completely into volatile inert gas within 60 to 90 minutes, erasing fingerprints, DNA samples, and ballistic evidence.',
      'Who funded this compound? A rogue university student? A defecting corporate lab? The Daily Bugle demands an investigation into Manhattan chemical distributors!'
    ],
    tags: ['Web Fluid', 'Forensics', 'Investigation', 'Spider-Man']
  }
];

const CATEGORIES = [
  'All',
  'Menace Watch',
  'NYC Crime',
  'Science & Tech',
  'Opinion',
  'Sightings'
];

const TICKER_ITEMS = [
  '🚨 BREAKING: SPIDER-MAN SEEN SWINGING OFF CHRYSLER BUILDING WITH MYSTERIOUS PACKAGE!',
  '⚡ JJJ EXCLUSIVE: "HE\'S A MENACE, HE\'S A THREAT, AND HE WILL BE BROUGHT TO JUSTICE!"',
  '💰 $10,000 REWARD FOR GENUINE PHOTOGRAPHS OF SPIDER-MAN UNMASKED! CALL THE BUGLE TIP LINE!',
  '⚠️ WARNING: REPORT SUSPICIOUS GLIDER NOISES DIRECTLY TO THE NYPD OR THE DAILY BUGLE!',
  '📰 DAILY BUGLE MORNING EDITION BREAKS SALES RECORDS ACROSS ALL FIVE BOROUGHS!'
];

export default function DailyBugleApp() {
  // --- STATE ---
  const [articles] = useState(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'article' | 'saved'
  const [activeArticleId, setActiveArticleId] = useState(null);
  
  // LocalStorage Saved Articles
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('daily_bugle_saved');
      return stored ? JSON.parse(stored) : ['db-001'];
    } catch {
      return ['db-001'];
    }
  });

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('daily_bugle_dark');
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch {
      return false;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('daily_bugle_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  }, [savedIds]);

  // Sync dark mode to localStorage and HTML root
  useEffect(() => {
    try {
      localStorage.setItem('daily_bugle_dark', JSON.stringify(darkMode));
    } catch (e) {
      console.error('LocalStorage theme write failed:', e);
    }
  }, [darkMode]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Bookmark Toggle
  const toggleSaveArticle = (id, e) => {
    if (e) e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds(prev => prev.filter(item => item !== id));
      showToast('Article removed from saved clips');
    } else {
      setSavedIds(prev => [...prev, id]);
      showToast('Article pinned to your Bugle scrapbook!');
    }
  };

  const clearAllSaved = () => {
    setSavedIds([]);
    showToast('All saved articles cleared!');
  };

  // Navigation handlers
  const handleOpenArticle = (id) => {
    setActiveArticleId(id);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoSaved = () => {
    setCurrentView('saved');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Active full article object
  const activeArticle = useMemo(() => {
    return articles.find(a => a.id === activeArticleId) || articles[0];
  }, [articles, activeArticleId]);

  // Filtered stories for Home view
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.author.toLowerCase().includes(q) ||
        article.tags.some(t => t.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured article (first featured or first of filtered)
  const featuredArticle = useMemo(() => {
    return articles.find(a => a.featured) || articles[0];
  }, [articles]);

  // Saved articles list
  const savedArticles = useMemo(() => {
    return articles.filter(a => savedIds.includes(a.id));
  }, [articles, savedIds]);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-serif ${
      darkMode ? 'bg-zinc-950 text-stone-200' : 'bg-[#f7f5ed] text-stone-900'
    }`}>

      {/* --- TOP BANNER / DATE BAR --- */}
      <div className={`border-b text-xs font-sans uppercase tracking-widest px-4 py-1.5 flex justify-between items-center transition-colors ${
        darkMode ? 'bg-zinc-900/90 border-zinc-800 text-stone-400' : 'bg-stone-200/90 border-stone-300 text-stone-700'
      }`}>
        <div className="flex items-center space-x-3">
          <span className="font-bold text-red-600 dark:text-red-500">NEW YORK CITY</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">LATE CITY FINAL EDITION</span>
          <span>•</span>
          <span>FRIDAY, OCT 30, 2026</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline font-mono">WEATHER: 58°F RAIN & SPIDER-WEBS</span>
          <span className="font-semibold text-stone-800 dark:text-stone-300">PRICE: $1.25</span>
        </div>
      </div>

      {/* --- ICONIC RETRO HEADER --- */}
      <header className={`border-b-4 border-double px-4 pt-6 pb-4 transition-colors ${
        darkMode ? 'border-red-700/60 bg-zinc-900' : 'border-stone-900 bg-[#faf8f1]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Top Bar inside Masthead */}
          <div className="w-full flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 font-sans font-bold text-xs uppercase tracking-wider rounded ${
                darkMode ? 'bg-red-950/80 text-red-400 border border-red-800' : 'bg-red-700 text-white'
              }`}>
                PULITZER SNUBBED
              </span>
              <span className="hidden sm:inline font-sans text-xs italic text-stone-500">
                "The Only Paper with the Guts to Tell the Raw Truth!"
              </span>
            </div>

            {/* Quick Actions: Dark Mode & Saved Stories Count */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGoSaved}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-sm font-sans font-semibold transition-all ${
                  currentView === 'saved'
                    ? 'bg-red-600 text-white'
                    : darkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-stone-200'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-900'
                }`}
                title="Saved Articles"
              >
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Saved Clips</span>
                <span className="ml-1 text-xs px-1.5 py-0.2 bg-black/30 text-white rounded-full">
                  {savedIds.length}
                </span>
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode ? 'bg-zinc-800 text-amber-400 hover:bg-zinc-700' : 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                }`}
                title="Toggle Dark Mode"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* THE FAMOUS DAILY BUGLE LOGO */}
          <div 
            onClick={handleGoHome}
            className="cursor-pointer text-center select-none group my-2"
          >
            <h1 className="font-extrabold tracking-tighter uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-red-600 dark:text-red-500 font-sans transform group-hover:scale-[1.01] transition-transform drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
              THE DAILY BUGLE
            </h1>
            <p className="font-serif italic text-xs sm:text-sm md:text-base tracking-widest uppercase text-stone-600 dark:text-stone-400 mt-1 border-t border-b border-stone-400 dark:border-zinc-700 py-1 inline-block px-8">
              J. JONAH JAMESON, PUBLISHER • FIRST WITH THE FACTS, FIRST WITH THE FEARLESS TRUTH!
            </p>
          </div>

          {/* Navigation Bar */}
          <nav className="w-full mt-4 pt-3 border-t border-stone-300 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <button
                onClick={handleGoHome}
                className={`px-3 py-1 font-sans text-xs uppercase font-bold tracking-wider rounded transition-colors ${
                  currentView === 'home' && selectedCategory === 'All'
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-800'
                }`}
              >
                Front Page
              </button>
              {CATEGORIES.slice(1).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentView('home');
                  }}
                  className={`px-3 py-1 font-sans text-xs uppercase font-semibold tracking-wider rounded transition-colors ${
                    currentView === 'home' && selectedCategory === cat
                      ? 'bg-red-600 text-white'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* In-Nav Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search Bugle archives..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className={`w-full font-sans text-xs pl-8 pr-3 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors ${
                  darkMode 
                    ? 'bg-zinc-800 border-zinc-700 text-stone-100 placeholder-stone-500' 
                    : 'bg-white border-stone-300 text-stone-900 placeholder-stone-400'
                }`}
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
            </div>
          </nav>
        </div>
      </header>

      {/* --- LIVE BREAKING NEWS TICKER --- */}
      <div className="bg-red-600 text-white overflow-hidden py-2 px-4 shadow-md flex items-center">
        <div className="flex items-center space-x-2 bg-black px-2.5 py-0.5 text-xs font-mono font-bold tracking-widest uppercase mr-4 shrink-0 rounded">
          <Volume2 className="w-3 h-3 text-red-500 animate-pulse" />
          <span>SCOOP WIRE</span>
        </div>
        <div className="whitespace-nowrap overflow-x-auto text-xs sm:text-sm font-sans font-bold tracking-wide flex space-x-8 no-scrollbar">
          {TICKER_ITEMS.map((item, idx) => (
            <span key={idx} className="inline-block hover:underline cursor-pointer">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT AREA: SWITCH ROUTING --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW 1: HOME PAGE (Featured + Filtered Grid) */}
        {currentView === 'home' && (
          <div>
            {/* Filter Pills for Mobile & Category Overview */}
            <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-stone-300 dark:border-zinc-800 mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-red-600" />
                <span className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500">
                  Browsing Section:
                </span>
                <span className="font-sans text-sm font-bold text-red-600 dark:text-red-400">
                  {selectedCategory}
                </span>
                {searchQuery && (
                  <span className="text-xs bg-stone-200 dark:bg-zinc-800 px-2 py-0.5 rounded font-sans">
                    Matching "{searchQuery}"
                  </span>
                )}
              </div>

              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-xs font-sans text-stone-500 hover:text-red-600 underline font-semibold"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* FEATURED LEAD STORY (Shown when viewing 'All' and no active search filter) */}
            {selectedCategory === 'All' && !searchQuery && (
              <section className={`mb-12 border-4 p-4 sm:p-6 transition-all ${
                darkMode ? 'border-red-900/60 bg-zinc-900/70' : 'border-stone-900 bg-white shadow-xl'
              }`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Headline and Story Intro */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-red-600 text-white font-sans text-xs font-black tracking-widest px-2.5 py-0.5 uppercase">
                          TOP STORY • EXTRA
                        </span>
                        <span className="font-sans text-xs text-stone-500 uppercase font-semibold">
                          {featuredArticle.category}
                        </span>
                      </div>

                      <h2 
                        onClick={() => handleOpenArticle(featuredArticle.id)}
                        className="font-sans font-black text-3xl sm:text-5xl tracking-tight leading-none text-stone-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors"
                      >
                        {featuredArticle.title}
                      </h2>

                      <p className="mt-3 text-base sm:text-lg font-serif italic text-stone-600 dark:text-stone-300 leading-relaxed border-l-4 border-red-600 pl-3">
                        {featuredArticle.subtitle}
                      </p>

                      <p className="mt-4 font-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-200 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-3">
                      <div className="flex items-center space-x-3 text-xs font-sans text-stone-500 dark:text-stone-400">
                        <span className="font-bold text-stone-900 dark:text-stone-200">By {featuredArticle.author}</span>
                        <span>•</span>
                        <span>{featuredArticle.date}</span>
                        <span>•</span>
                        <span>{featuredArticle.readTime}</span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => toggleSaveArticle(featuredArticle.id, e)}
                          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-sans text-xs font-bold transition-all ${
                            savedIds.includes(featuredArticle.id)
                              ? 'bg-amber-500 text-black'
                              : 'bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-stone-800 dark:text-stone-200'
                          }`}
                        >
                          {savedIds.includes(featuredArticle.id) ? (
                            <>
                              <BookmarkCheck className="w-3.5 h-3.5" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Save for Later</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleOpenArticle(featuredArticle.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-sans text-xs font-bold px-4 py-1.5 rounded uppercase tracking-wider transition-colors"
                        >
                          Read Full Article
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Lead Photo */}
                  <div className="lg:col-span-5">
                    <div 
                      onClick={() => handleOpenArticle(featuredArticle.id)}
                      className="group cursor-pointer relative overflow-hidden border-2 border-stone-900 dark:border-zinc-700 bg-black"
                    >
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-72 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500 grayscale contrast-125 hover:grayscale-0"
                      />
                      <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5">
                        BUGLE PHOTO UNIT
                      </div>
                    </div>
                    <p className="mt-2 text-xs font-sans italic text-stone-500 text-right">
                      {featuredArticle.caption}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* EDITORIAL QUOTE CALLOUT BANNER */}
            <div className={`mb-10 p-4 border-y-2 border-stone-900 dark:border-zinc-700 text-center ${
              darkMode ? 'bg-zinc-900' : 'bg-[#f0ece1]'
            }`}>
              <blockquote className="font-serif italic text-lg sm:text-xl font-bold tracking-tight text-red-700 dark:text-red-400">
                “HE DOESN'T WANT TO BE FAMOUS? THEN WHY DOES HE WEAR A COSTUME?! HE'S A MENACE, PARKER!”
              </blockquote>
              <cite className="block text-xs font-sans uppercase font-bold tracking-widest text-stone-500 mt-1">
                — J. JONAH JAMESON, FROM HIS 5TH FLOOR CORNER OFFICE
              </cite>
            </div>

            {/* STORIES GRID HEADER */}
            <div className="flex items-center justify-between border-b-2 border-stone-900 dark:border-zinc-700 pb-2 mb-6">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tight flex items-center space-x-2">
                <span className="w-3 h-3 bg-red-600 inline-block"></span>
                <span>Dispatch Wire ({filteredArticles.length} Stories)</span>
              </h3>
              <span className="text-xs font-mono uppercase text-stone-500">
                Sorted by: Latest Wire Feeds
              </span>
            </div>

            {/* STORIES GRID */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-stone-300 dark:border-zinc-800 rounded">
                <AlertCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                <h4 className="font-sans text-xl font-bold">No Dispatches Found</h4>
                <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto font-serif">
                  No articles matched your criteria. Jameson probably rejected the pitch or fired the reporter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 text-white font-sans text-xs uppercase font-bold rounded"
                >
                  Reset News Wire
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => {
                  const isSaved = savedIds.includes(article.id);
                  return (
                    <article
                      key={article.id}
                      onClick={() => handleOpenArticle(article.id)}
                      className={`group cursor-pointer flex flex-col justify-between border transition-all duration-300 p-4 relative ${
                        darkMode 
                          ? 'border-zinc-800 bg-zinc-900 hover:border-red-600 hover:shadow-[0_4px_20px_rgba(220,38,38,0.15)]' 
                          : 'border-stone-300 bg-white hover:border-stone-900 hover:shadow-lg'
                      }`}
                    >
                      <div>
                        {/* Thumbnail & Bookmark Pin */}
                        <div className="relative mb-3 overflow-hidden border border-stone-900/20 bg-stone-950 aspect-[16/10]">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 grayscale contrast-125 group-hover:grayscale-0"
                            loading="lazy"
                          />
                          <span className="absolute top-2 left-2 bg-red-600 text-white font-sans text-[10px] font-black uppercase px-2 py-0.5 tracking-wider">
                            {article.category}
                          </span>
                          <button
                            onClick={(e) => toggleSaveArticle(article.id, e)}
                            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all ${
                              isSaved
                                ? 'bg-amber-500 text-black shadow'
                                : 'bg-black/60 text-white hover:bg-black'
                            }`}
                            title={isSaved ? "Saved" : "Save for Later"}
                          >
                            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Title & Metadata */}
                        <h4 className="font-sans font-black text-xl leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {article.title}
                        </h4>

                        <p className="mt-2 text-xs sm:text-sm font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      {/* Footer Details */}
                      <div className="mt-4 pt-3 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between text-xs font-sans text-stone-500">
                        <div className="flex items-center space-x-1.5">
                          <User className="w-3 h-3 text-stone-400" />
                          <span className="truncate max-w-[110px]">{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">{article.readTime}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: FULL ARTICLE DETAIL */}
        {currentView === 'article' && (
          <div className="max-w-4xl mx-auto">
            {/* Top Navigation */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-300 dark:border-zinc-800">
              <button
                onClick={handleGoHome}
                className="flex items-center space-x-2 text-xs font-sans uppercase font-bold tracking-wider hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Front Page</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleSaveArticle(activeArticle.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded font-sans text-xs font-bold transition-all ${
                    savedIds.includes(activeArticle.id)
                      ? 'bg-amber-500 text-black'
                      : 'bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  {savedIds.includes(activeArticle.id) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      <span>Article Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save for Later</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Article link copied to clipboard!');
                  }}
                  className="p-1.5 bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 dark:hover:bg-zinc-700 rounded transition-colors text-stone-700 dark:text-stone-200"
                  title="Share Story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Headline Header */}
            <article className={`p-6 sm:p-10 border-2 transition-colors ${
              darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-stone-900 bg-white shadow-xl'
            }`}>
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-red-600 text-white font-sans text-xs font-black px-2.5 py-0.5 uppercase tracking-wider">
                  {activeArticle.category}
                </span>
                <span className="text-xs font-sans text-stone-500">•</span>
                <span className="text-xs font-sans text-stone-500">{activeArticle.date}</span>
                <span className="text-xs font-sans text-stone-500">•</span>
                <span className="text-xs font-sans font-semibold text-stone-700 dark:text-stone-300">
                  {activeArticle.readTime}
                </span>
              </div>

              <h1 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none text-stone-950 dark:text-white uppercase">
                {activeArticle.title}
              </h1>

              <p className="mt-4 text-lg sm:text-2xl font-serif italic text-stone-600 dark:text-stone-300 leading-snug border-l-4 border-red-600 pl-4 py-1">
                {activeArticle.subtitle}
              </p>

              {/* Byline */}
              <div className="mt-6 py-4 border-y border-stone-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-700 text-white font-sans font-bold flex items-center justify-center text-sm shadow">
                    {activeArticle.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-stone-900 dark:text-stone-100">
                      By {activeArticle.author}
                    </h5>
                    <p className="font-sans text-xs text-stone-500">
                      {activeArticle.role}
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-stone-400">
                  DISPATCH REF: {activeArticle.id.toUpperCase()}
                </div>
              </div>

              {/* Hero Image in Article */}
              <figure className="my-8">
                <div className="border border-stone-900 dark:border-zinc-700 overflow-hidden bg-black">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-80 sm:h-[480px] object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <figcaption className="mt-2 text-xs font-sans italic text-stone-500 flex justify-between">
                  <span>{activeArticle.caption}</span>
                  <span className="font-mono text-red-600">DAILY BUGLE ARCHIVE PHOTO</span>
                </figcaption>
              </figure>

              {/* Pull Quote */}
              <div className={`p-6 my-6 border-l-4 border-red-600 ${
                darkMode ? 'bg-zinc-800/60' : 'bg-[#faf8f1]'
              }`}>
                <p className="font-serif italic text-xl font-bold text-stone-900 dark:text-stone-100 leading-relaxed">
                  "{activeArticle.summary}"
                </p>
              </div>

              {/* Full Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg font-serif text-stone-800 dark:text-stone-300 leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx} className={idx === 0 ? "first-letter:text-5xl first-letter:font-sans first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-red-600" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-stone-200 dark:border-zinc-800">
                <span className="font-sans text-xs uppercase font-bold text-stone-500 mr-2">Filed under:</span>
                <div className="inline-flex flex-wrap gap-2 mt-2">
                  {activeArticle.tags.map((t) => (
                    <span 
                      key={t}
                      onClick={() => {
                        setSearchQuery(t);
                        handleGoHome();
                      }}
                      className="cursor-pointer text-xs font-sans px-2.5 py-1 bg-stone-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white rounded transition-colors text-stone-700 dark:text-stone-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Jameson Stamp of Approval */}
              <div className="mt-8 p-4 border border-dashed border-red-600/50 bg-red-600/5 rounded text-center">
                <p className="text-xs font-sans uppercase font-bold tracking-widest text-red-600">
                  OFFICIAL DAILY BUGLE EDITORIAL APPROVAL • SIGNED: J. JONAH JAMESON
                </p>
              </div>
            </article>

            {/* Back Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleGoHome}
                className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-sans text-xs uppercase font-bold px-6 py-2.5 rounded tracking-wider hover:bg-red-600 transition-colors"
              >
                ← Return to Front Page Grid
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: SAVED CLIPPINGS PAGE */}
        {currentView === 'saved' && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-2 border-stone-900 dark:border-zinc-700 mb-8 gap-4">
              <div>
                <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight flex items-center space-x-3">
                  <Bookmark className="w-8 h-8 text-amber-500 fill-amber-500" />
                  <span>My Bugle Scrapbook ({savedArticles.length})</span>
                </h2>
                <p className="font-serif italic text-stone-600 dark:text-stone-400 text-sm mt-1">
                  Articles and exposés you have saved for offline study or criminal evidence dossiers.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGoHome}
                  className="px-3 py-1.5 bg-stone-200 dark:bg-zinc-800 text-stone-800 dark:text-stone-200 font-sans text-xs uppercase font-bold rounded hover:bg-stone-300 transition-colors"
                >
                  Back to News
                </button>

                {savedArticles.length > 0 && (
                  <button
                    onClick={clearAllSaved}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white font-sans text-xs uppercase font-bold rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>
            </div>

            {savedArticles.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-stone-300 dark:border-zinc-800 rounded bg-white/50 dark:bg-zinc-900/50 p-6">
                <Bookmark className="w-16 h-16 text-stone-400 mx-auto mb-4 stroke-[1.5]" />
                <h3 className="font-sans text-2xl font-bold uppercase tracking-tight">Your Scrapbook is Empty</h3>
                <p className="font-serif text-stone-500 max-w-md mx-auto mt-2">
                  You haven't saved any Spider-Man exposés yet. Click the bookmark ribbon on any story to save it here for later reference.
                </p>
                <button
                  onClick={handleGoHome}
                  className="mt-6 px-6 py-2.5 bg-red-600 text-white font-sans text-xs uppercase font-bold tracking-wider rounded hover:bg-red-700 transition-colors"
                >
                  Browse Today's Headlines
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArticles.map((article) => (
                  <div
                    key={article.id}
                    className={`border flex flex-col justify-between p-4 transition-all ${
                      darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-stone-300 bg-white shadow'
                    }`}
                  >
                    <div>
                      <div className="relative mb-3 overflow-hidden border border-stone-900/20 bg-stone-950 aspect-[16/10]">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover grayscale contrast-125"
                        />
                        <span className="absolute top-2 left-2 bg-red-600 text-white font-sans text-[10px] font-black uppercase px-2 py-0.5">
                          {article.category}
                        </span>
                      </div>

                      <h4 
                        onClick={() => handleOpenArticle(article.id)}
                        className="font-sans font-black text-xl leading-snug hover:text-red-600 cursor-pointer transition-colors"
                      >
                        {article.title}
                      </h4>

                      <p className="mt-2 text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-2">
                        {article.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenArticle(article.id)}
                        className="font-sans text-xs font-bold text-red-600 hover:underline uppercase"
                      >
                        Read Full Story →
                      </button>

                      <button
                        onClick={() => toggleSaveArticle(article.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove Clip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- FOOTER: CLASSIC NEWSPAPER MASTHEAD FOOTER --- */}
      <footer className={`border-t-4 border-stone-900 dark:border-zinc-800 mt-16 pt-10 pb-8 px-4 transition-colors ${
        darkMode ? 'bg-zinc-950 text-stone-400' : 'bg-[#ece8dc] text-stone-700'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-stone-300 dark:border-zinc-800">
            
            <div className="md:col-span-2">
              <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-red-600 dark:text-red-500">
                THE DAILY BUGLE
              </h3>
              <p className="font-serif italic text-sm mt-2 max-w-md leading-relaxed">
                Published continuously since 1898 from Bugle Building, 39th Street & Second Avenue, Manhattan. Proudly exposing masked vigilantism and safeguarding New York City through unapologetic journalism.
              </p>
              <p className="font-sans text-xs text-stone-500 mt-3 font-semibold">
                Publisher: J. Jonah Jameson • Editor: Joseph "Robbie" Robertson
              </p>
            </div>

            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
                News Desks
              </h4>
              <ul className="space-y-1.5 font-sans text-xs">
                {CATEGORIES.slice(1).map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat);
                        handleGoHome();
                      }}
                      className="hover:text-red-600 transition-colors"
                    >
                      {cat} Wire
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-200 mb-3">
                Bugle Tip Line
              </h4>
              <p className="font-serif text-xs leading-relaxed text-stone-500">
                Got high-res photos of Spider-Man committing property damage? Contact Peter Parker or drop film canisters at Front Desk, 4th Floor.
              </p>
              <div className="mt-3 font-mono text-xs font-bold text-red-600">
                HOTLINE: 1-800-BUGLE-NOW
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-stone-500 gap-3">
            <p>© 2026 Daily Bugle Publishing Co. All Rights Reserved. Not affiliated with Stark Industries or Oscorp.</p>
            <div className="flex space-x-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Print</span>
              <span>•</span>
              <span>Bounty Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FLOATING TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-sans text-xs font-bold px-4 py-2.5 rounded shadow-2xl flex items-center space-x-2 border border-stone-700 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}