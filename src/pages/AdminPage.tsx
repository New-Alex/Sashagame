import React, { useState, useEffect } from "react";
import { Lock, Plus, Save, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Form state
  const [activeTab, setActiveTab] = useState<'game' | 'post'>('game');
  
  // Game Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("prototype");
  const [imageUrl, setImageUrl] = useState("");
  const [playUrl, setPlayUrl] = useState("");

  // Post Form
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
      setError("");
    }
  };

  const handleGameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          title,
          description,
          status,
          image_url: imageUrl,
          play_url: playUrl
        })
      });

      if (res.ok) {
        alert("Игра успешно добавлена!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setPlayUrl("");
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка при сохранении");
        if (res.status === 401) setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Ошибка сети");
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          title: postTitle,
          content: postContent,
          image_url: postImageUrl
        })
      });

      if (res.ok) {
        alert("Пост успешно добавлен!");
        setPostTitle("");
        setPostContent("");
        setPostImageUrl("");
      } else {
        const data = await res.json();
        setError(data.error || "Ошибка при сохранении");
        if (res.status === 401) setIsAuthenticated(false);
      }
    } catch (err) {
      setError("Ошибка сети");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#151515] p-8 rounded-2xl border border-white/10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Вход в панель</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Пароль администратора</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Войти
            </button>
            <p className="text-xs text-center text-gray-600 mt-4">
              По умолчанию пароль: <code>admin123</code>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Управление контентом</h1>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-gray-500 hover:text-white"
        >
          Выйти
        </button>
      </div>

      <div className="bg-[#151515] rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('game')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'game' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Добавить игру
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'post' 
                ? 'bg-white/10 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Добавить пост в блог
          </button>
        </div>
        
        {activeTab === 'game' ? (
          <form onSubmit={handleGameSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Название игры</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                    placeholder="Например: Super Space Jump"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Статус</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="prototype">Прототип</option>
                    <option value="alpha">Альфа-версия</option>
                    <option value="beta">Бета-версия</option>
                    <option value="release">Релиз</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ссылка на изображение (URL)</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Ссылка на игру (URL)</label>
                  <input
                    type="text"
                    value={playUrl}
                    onChange={(e) => setPlayUrl(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                    placeholder="https://itch.io/..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Описание</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-[280px] bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 resize-none"
                    placeholder="О чем эта игра? Какие механики используются?"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Сохранить игру
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePostSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Заголовок поста</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                  placeholder="О чем сегодня расскажем?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Ссылка на изображение (URL)</label>
                <input
                  type="text"
                  value={postImageUrl}
                  onChange={(e) => setPostImageUrl(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Содержание</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full h-[300px] bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-violet-500 resize-none"
                  placeholder="Текст статьи..."
                  required
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Опубликовать пост
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
