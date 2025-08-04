'use client';

import { useState } from 'react';

import usePosts from '@/hooks/use-posts';
import Button from './button';
import TextField from './text-field';

const characterLimit = 280;

export default function PostForm() {
  const [content, setContent] = useState('');

  const { sendPost } = usePosts();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendPost(content);

    // Reset form.
    setContent('');
  };

  return (
    <div className="card card-hover">
      <h3 className="text-lg font-lexend font-semibold mb-4 text-black">Create a Post</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextField
          className="w-full"
          onChange={(event) => setContent(event.target.value)}
          maxLength={characterLimit}
          placeholder="What's happening in the ChatChain?"
          value={content}
        />
        <div className="flex justify-between items-center">
          <span className="text-sm font-dm-sans text-gray-500">
            {content.length}/{characterLimit} characters
          </span>
          <Button 
            type="submit" 
            className="bg-black text-white hover:bg-gray-800 font-dm-sans font-medium px-6 py-2 rounded-lg transition-colors duration-200"
            disabled={!content.trim()}
          >
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}