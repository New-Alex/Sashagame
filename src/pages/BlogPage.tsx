import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, User, Terminal, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch posts", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative bg-[#050505]">
      <SEO 
        title={t.blog.title}
        description={t.blog.subtitle}
        url="/blog"
      />
      
      {/* 11yo Game Dev Workspace Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050505] to-[#050505]" />
        
        {/* Grid representing Unity/Unreal editor grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Floating "Ideas" and "Code Snippets" */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-10 opacity-20 hidden lg:block"
        >
          <div className="font-mono text-xs text-green-400 bg-black/50 p-4 rounded-lg border border-green-500/30">
            <p>void Update() {'{'}</p>
            <p className="pl-4">if (Input.GetKeyDown(KeyCode.Space))</p>
            <p className="pl-8">Jump();</p>
            <p>{'}'}</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-10 opacity-10 hidden lg:block"
        >
          <div className="text-6xl">👾</div>
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-20 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"
        />
        
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/20 blur-[80px] rounded-full"
        />

        {/* Sketchbook / Blueprint vibes */}
        <div className="absolute top-20 right-1/4 opacity-5 rotate-12 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-white fill-none stroke-2">
            <circle cx="50" cy="50" r="40" strokeDasharray="5,5" />
            <rect x="30" y="30" width="40" height="40" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="50" y1="10" x2="50" y2="90" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16 border-b border-white/10 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <Terminal className="w-8 h-8 text-violet-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dev<span className="text-violet-500">Log</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg font-mono flex items-center gap-2"
          >
            <ChevronRight className="w-5 h-5 text-fuchsia-500" />
            {t.blog.subtitle}
            <span className="w-2 h-5 bg-violet-500 animate-pulse inline-block ml-1" />
          </motion.p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-violet-500 font-mono animate-pulse">
            &gt; {t.blog.loading}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/20 to-transparent" />

            <div className="space-y-16">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-12 md:pl-24"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] md:left-[27px] top-6 w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.8)] ring-4 ring-[#050505]" />
                  
                  {/* Timeline Date (Desktop) */}
                  <div className="hidden md:block absolute left-0 top-5 -translate-x-full pr-12 text-right w-48">
                    <div className="text-violet-400 font-mono text-sm">
                      {new Date(post.created_at).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                      })}
                    </div>
                    <div className="text-gray-600 text-xs mt-1 font-mono">
                      {new Date(post.created_at).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  <div className="group bg-[#0f0f0f] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition-all hover:shadow-[0_0_30px_-15px_rgba(139,92,246,0.3)]">
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden relative border-b border-white/5">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      {/* Mobile Date */}
                      <div className="md:hidden flex items-center gap-2 text-violet-400 font-mono text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">
                        {post.title}
                      </h2>
                      
                      <div className="prose prose-invert prose-violet max-w-none text-gray-400 text-base md:text-lg">
                        {post.content.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg">
                          <User className="w-4 h-4 text-fuchsia-500" />
                          <span className="font-medium">{t.blog.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
