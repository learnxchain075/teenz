import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 text-white flex items-center justify-center">
        <Sparkles className="w-6 h-6" />
      </div>
      <span className="font-bold text-xl text-text-base">Teenz Skin</span>
    </Link>
  );
}