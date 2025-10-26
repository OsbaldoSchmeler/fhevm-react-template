/**
 * Card Component
 * Reusable card container component
 */

'use client';

import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
}

export function Card({ title, subtitle, children, className = '', headerAction }: CardProps) {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              {title && <h3 className="text-xl font-bold text-blue-400">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
