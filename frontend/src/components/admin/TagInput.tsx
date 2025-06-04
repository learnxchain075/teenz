'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
}

interface TagInputProps {
  existingTags: Tag[];
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  onCreateTag?: (name: string) => Promise<Tag | null>;
}

export default function TagInput({ existingTags, selectedTags, onTagsChange, onCreateTag }: TagInputProps) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const filtered = existingTags.filter(tag => 
        tag.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.some(selected => selected.id === tag.id)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      
      // Check if tag already exists in suggestions
      const existingTag = existingTags.find(
        tag => tag.name.toLowerCase() === input.trim().toLowerCase()
      );

      if (existingTag && !selectedTags.some(tag => tag.id === existingTag.id)) {
        onTagsChange([...selectedTags, existingTag]);
      } else if (onCreateTag) {
        const newTag = await onCreateTag(input.trim());
        if (newTag) {
          onTagsChange([...selectedTags, newTag]);
        }
      }

      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: Tag) => {
    onTagsChange(selectedTags.filter(tag => tag.id !== tagToRemove.id));
  };

  const addTag = (tag: Tag) => {
    if (!selectedTags.some(selected => selected.id === tag.id)) {
      onTagsChange([...selectedTags, tag]);
      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white dark:bg-gray-800">
        {selectedTags.map(tag => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 rounded-full"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="p-0.5 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags..."
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-h-48 overflow-auto"
        >
          {suggestions.map(tag => (
            <button
              key={tag.id}
              onClick={() => addTag(tag)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 