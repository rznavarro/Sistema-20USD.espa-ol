import { useState, useEffect } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

interface ContentPost {
  id: string;
  postType: string;
  scheduledDate: string;
  productToPromote: string;
  status: string;
  published: boolean;
}

function TasksSection() {
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [formData, setFormData] = useState({
    postType: 'Reel',
    scheduledDate: '',
    productToPromote: '',
    status: 'Planned'
  });

  useEffect(() => {
    const saved = localStorage.getItem('content-calendar');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('content-calendar', JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!formData.scheduledDate.trim() || !formData.productToPromote.trim()) return;

    const post: ContentPost = {
      id: Date.now().toString(),
      postType: formData.postType,
      scheduledDate: formData.scheduledDate,
      productToPromote: formData.productToPromote,
      status: formData.status,
      published: false,
    };

    setPosts([...posts, post]);
    setFormData({
      postType: 'Reel',
      scheduledDate: '',
      productToPromote: '',
      status: 'Planned'
    });
  };

  const togglePublished = (id: string) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, published: !post.published } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">CONTENT CALENDAR</h2>

      <div className="mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={formData.postType}
            onChange={(e) => setFormData({ ...formData, postType: e.target.value })}
            className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
          >
            <option>Reel</option>
            <option>Story</option>
            <option>Post</option>
          </select>

          <input
            type="date"
            value={formData.scheduledDate}
            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
          />
        </div>

        <input
          type="text"
          value={formData.productToPromote}
          onChange={(e) => setFormData({ ...formData, productToPromote: e.target.value })}
          placeholder="Product to Promote"
          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
        />

        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
        >
          <option>Planned</option>
          <option>Published</option>
        </select>

        <button
          onClick={addPost}
          className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 text-lg"
        >
          <Plus className="w-5 h-5" />
          Add Content Post
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No content posts</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <button
                onClick={() => togglePublished(post.id)}
                className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                  post.published
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 border-purple-500'
                    : 'border-gray-500 hover:border-purple-500'
                }`}
              >
                {post.published && <Check className="w-4 h-4 text-white" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-purple-300 font-medium">{post.postType}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-amber-300">{post.scheduledDate}</span>
                </div>
                <p className={`text-white ${post.published ? 'line-through text-gray-400' : ''}`}>
                  {post.productToPromote}
                </p>
                <span className="inline-block px-2 py-1 bg-purple-900 text-purple-200 text-xs rounded-full mt-1">
                  {post.status}
                </span>
              </div>

              <button
                onClick={() => deletePost(post.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TasksSection;
