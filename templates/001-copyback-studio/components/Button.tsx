"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-ink-900 text-white hover:bg-ink-600 focus:ring-ink-900 disabled:bg-ink-300 disabled:text-ink-500",
    secondary: "bg-ink-100 text-ink-900 hover:bg-ink-200 focus:ring-ink-200 disabled:bg-ink-100 disabled:text-ink-400",
    outline: "border border-ink-200 bg-transparent text-ink-900 hover:bg-ink-50 focus:ring-ink-200 disabled:border-ink-100 disabled:text-ink-300 disabled:bg-ink-50",
    ghost: "bg-transparent text-ink-600 hover:text-ink-900 hover:bg-ink-50 disabled:text-ink-300",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};
