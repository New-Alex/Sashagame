import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Play, MessageSquare, Info, Youtube, Send, Gamepad, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

interface Game {
  id: number;
  title: string;
  description: string;
  status: string;
  image_url: string;
  play_url?: string;
}

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch games", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pb-20">
      <SEO 
        title={t.hero.name1 + " & " + t.hero.name2}
        description={t.hero.description}
      />
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[#0a0a0a] z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 to-[#0a0a0a]" />
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-500/5 to-transparent" />
          
          {/* Animated Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-full" 
          />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-300 text-sm font-medium backdrop-blur-sm"
          >
            <Gamepad className="w-4 h-4" />
            <span className="tracking-wide uppercase text-xs">{t.hero.badge}</span>
          </motion.div>
          
          <div className="mb-12 relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tighter"
            >
              <span className="block text-2xl md:text-3xl font-normal text-gray-500 mb-4 tracking-normal font-mono">
                {t.hero.titlePrefix}
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  {t.hero.name1}
                </span>
                <motion.span 
                  className="absolute -inset-1 bg-violet-500/20 blur-xl -z-10"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              <span className="mx-4 text-violet-500 font-light">&</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-fuchsia-400">
                  {t.hero.name2}
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 text-lg md:text-xl text-gray-400 font-mono mt-6"
            >
              <span className="text-violet-400">{t.hero.role1}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
              <span className="text-fuchsia-400">{t.hero.role2}</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-3xl mx-auto mb-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden group hover:border-violet-500/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
            <Sparkles className="absolute top-4 right-4 w-5 h-5 text-violet-500/50 group-hover:text-violet-400 transition-colors" />
            <p className="text-2xl md:text-3xl text-white font-light italic leading-relaxed">
              "{t.hero.poeticLine}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a 
              href="#games" 
              className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {t.hero.ctaProjects}
            </a>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/channel/UCwTRciuTuKvBucdsaavjdsA"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000]/20 hover:scale-105 transition-all"
                title="YouTube @cawa079"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://t.me/cawa079"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#0088cc]/10 border border-[#0088cc]/20 text-[#0088cc] hover:bg-[#0088cc]/20 hover:scale-105 transition-all"
                title="Telegram"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section id="games" className="relative py-24 overflow-hidden">
        {/* Creative Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-cyber-gradient opacity-60" />
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 left-10 w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
              {t.games.title}
            </h2>
            <div className="text-sm text-gray-400 font-mono border border-white/10 bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
              {t.games.total}: {games.length}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500 animate-pulse">{t.games.loading}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[#151515]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)]"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gray-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-80 z-10" />
                    <img 
                      src={game.image_url || `https://picsum.photos/seed/${game.id}/800/600`} 
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg
                        ${game.status === 'release' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 
                          game.status === 'alpha' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 
                          'bg-blue-500/20 text-blue-300 border border-blue-500/30'}`}>
                        {/* @ts-ignore */}
                        {t.games.status[game.status] || game.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-20 -mt-12">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-violet-300 transition-colors">{game.title}</h3>
                    <p className="text-gray-300 text-sm mb-6 line-clamp-2 h-10 leading-relaxed">{game.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg hover:shadow-violet-500/25">
                        <Play className="w-4 h-4 fill-current" />
                        {t.games.play}
                      </button>
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 hover:border-white/20" title="Оставить отзыв">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
