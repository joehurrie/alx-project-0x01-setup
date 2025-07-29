import { PostData, PostModalProps } from "@/interfaces";
import React, { useState } from "react";
import Button from "@/components/common/Button";

const PostModal: React.FC<PostModalProps> = ({ onClose, onSubmit }) => {
  const [post, setPost] = useState<PostData>({ userId: 1, title: "", body: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(post);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-gray-700 mb-1">
              User ID
            </label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={post.userId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-gray-700 mb-1">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={post.body}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              placeholder="Enter post content"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button label="Cancel" onClick={onClose} variant="secondary" />
            <Button label="Add Post" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
