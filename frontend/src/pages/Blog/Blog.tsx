// (EDIT - make it public blog listing)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blog/published`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12 text-center">
          Blog & Documentation
        </h1>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-pink-500 transition-all hover:scale-105"
            >
              <h2 className="text-3xl font-bold text-white mb-3">{post.title}</h2>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <span className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;