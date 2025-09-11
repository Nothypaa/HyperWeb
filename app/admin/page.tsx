'use client'

// IMPORTANT: This admin page must remain isolated from main site components
// The logout button requires clean React event handling without interference
// from Navbar, Footer, Theme toggles, or other wrapper components.
// See ConditionalAurora.tsx for exclusion logic.

import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Contact, supabaseAdmin } from '@/lib/supabase';
import { AdminLogin } from '@/components/ui/admin-login';

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

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
        const response = await fetch('/api/admin/contacts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
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
          const token = localStorage.getItem('adminToken');
          const response = await fetch('/api/admin/contacts', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
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

  // Cleanup auth state when component unmounts
  useEffect(() => {
    return () => {
      // Sign out from Supabase to prevent auth state pollution
      supabaseAdmin.auth.signOut().catch(console.error);
    };
  }, []);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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

  const handleDelete = async (contactId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
      return;
    }

    // Add to deleting set to show loading state
    setDeletingIds(prev => new Set(prev).add(contactId));

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        // Remove from contacts list
        setContacts(prev => prev.filter(contact => contact.id !== contactId));
      } else {
        alert('Erreur lors de la suppression: ' + (result.error || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Erreur lors de la suppression');
    } finally {
      // Remove from deleting set
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(contactId);
        return newSet;
      });
    }
  };

  const handleLogout = async () => {
    console.log('Logout function called at:', new Date().toISOString());
    
    try {
      // Sign out from Supabase to clear auth state
      await supabaseAdmin.auth.signOut();
      console.log('Signed out from Supabase');
      
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
              <div key={contact.id} className="bg-white rounded-lg shadow p-6 relative">
                {/* Delete button */}
                <button
                  onClick={() => contact.id && handleDelete(contact.id)}
                  disabled={!contact.id || deletingIds.has(contact.id)}
                  className="absolute top-4 right-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Supprimer cette soumission"
                >
                  {contact.id && deletingIds.has(contact.id) ? (
                    <div className="w-5 h-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
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