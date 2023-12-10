'use client';

import { useState } from 'react';

import usePosts from '@/hooks/use-posts';
import Button from './button';
import TextField from './text-field';


const characterLimit = 280;

// Import necessary modules and components

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
    <form className="flex items-center bg-gray-100 p-4 rounded-md" onSubmit={handleSubmit}>
      {/* Added background color, padding, and rounded corners for better visual appeal */}
      <TextField
        className="flex-1 mr-2"
        onChange={(event) => setContent(event.target.value)}
        maxLength={characterLimit}
        placeholder="What's happening?"
        value={content}
      />
      <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
        Post
      </Button>
    </form>
  );
}