'use client';

import { useState } from 'react';

import useProfile from '@/hooks/use-profile';
import Button from './button';
import TextField from './text-field';

export default function ProfileForm() {
  const [name, setName] = useState('');

  const { createProfile } = useProfile();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createProfile(name);
  };

  return (
    <div className="card card-hover">
      <h3 className="text-lg font-lexend font-semibold mb-4 text-black">Create Your Profile</h3>
      <p className="text-gray-600 font-dm-sans mb-6">Set up your profile to start posting and connecting with the ChatChain community.</p>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-dm-sans font-medium text-gray-700 mb-2">
            Display Name
          </label>
          <TextField
            id="name"
            className="w-full"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your display name"
            value={name}
            maxLength={50}
          />
          <p className="text-xs text-gray-500 font-dm-sans mt-1">
            Maximum 50 characters
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-black text-white hover:bg-gray-800 font-dm-sans font-medium py-3 rounded-lg transition-colors duration-200"
          disabled={!name.trim()}
        >
          Create Profile
        </Button>
      </form>
    </div>
  );
}