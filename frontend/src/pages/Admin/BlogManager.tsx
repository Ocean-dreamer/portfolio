import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/blog`, {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await axios.put(`${API_BASE_URL}/api/blog/${editingPost.id}`, form, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/blog`, form, {
          withCredentials: true,
        });
      }
      setShowForm(false);
      setEditingPost(null);
      setForm({ title: "", slug: "", content: "", excerpt: "", published: false });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/blog/${id}`, {
        withCredentials: true,
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Blog Posts</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingPost(null);
            setForm({ title: "", slug: "", content: "", excerpt: "", published: false });
          }}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg text-white font-medium hover:scale-105 transition-transform"
        >
          + New Post
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {editingPost ? "Edit Post" : "Create New Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={12}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-pink-500 focus:outline-none font-mono"
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-5 h-5"
              />
              <label className="text-gray-400">Publish immediately</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg text-white font-bold hover:scale-105 transition-transform"
              >
                {editingPost ? "Update Post" : "Create Post"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="px-6 py-3 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>/{post.slug}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={post.published ? "text-green-500" : "text-yellow-500"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;