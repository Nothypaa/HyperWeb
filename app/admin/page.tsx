'use client'

// IMPORTANT: This admin page must remain isolated from main site components
// The logout button requires clean React event handling without interference
// from Navbar, Footer, Theme toggles, or other wrapper components.
// See ConditionalAurora.tsx for exclusion logic.

import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { ContactSubmission } from '@/lib/db';
import { AdminLogin } from '@/components/ui/admin-login';

export default function AdminPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is already authenticated on page load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        return;
      }
      
      try {
        const response = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        const result = await response.json();
        
        if (result.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  // Load contacts when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadContacts = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/admin/contacts');
          const result = await response.json();
          
          if (result.success) {
            setContacts(result.data);
          } else {
            setError(result.error || 'Failed to load contacts');
          }
        } catch (err) {
          setError('Failed to load contacts');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      loadContacts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      const result = await response.json();
      
      if (result.success && result.token) {
        localStorage.setItem('adminToken', result.token);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    console.log('Logout function called at:', new Date().toISOString());
    
    try {
      localStorage.removeItem('adminToken');
      console.log('Token cleared from localStorage');
      
      // Force React to synchronously update and re-render
      flushSync(() => {
        setIsAuthenticated(false);
        setContacts([]);
        setError('');
        setLoading(false);
      });
      
      console.log('State updated via flushSync');
      
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: force page refresh
      window.location.reload();
    }
  };

  // Show loading spinner while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Show loading spinner while fetching contacts
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Submissions</h1>
            <p className="text-gray-600">Total submissions: {contacts.length}</p>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              ← Accueil
            </a>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked - mouse down');
                handleLogout();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Button clicked - onClick');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium cursor-pointer"
              style={{ pointerEvents: 'all' }}
            >
              Logout
            </button>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No submissions yet</h2>
            <p className="text-gray-600">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {contact.full_name}
                    </h3>
                    <p className="text-gray-600 break-all">{contact.email}</p>
                    {contact.phone && (
                      <p className="text-gray-600">{contact.phone}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {contact.subject === 'web-development' && 'Projet de développement web'}
                      {contact.subject === 'web-design' && 'Design web et UX/UI'}
                      {contact.subject === 'consultation' && 'Consultation gratuite'}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {contact.created_at ? new Date(contact.created_at + 'Z').toLocaleString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Europe/Paris',
                        hour12: false
                      }) : ''}
                    </p>
                  </div>
                </div>
                
                {contact.message && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4 text-xs text-gray-500">
                  IP: {contact.ip_address}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}