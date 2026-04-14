import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FacebookConnect() {
  const [pages, setPages]         = useState([]);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [selecting, setSelecting] = useState(null);
  const [error, setError]         = useState('');
  const navigate                  = useNavigate();

  useEffect(() => { fetchPages(); }, []);

  const fetchPages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/facebook/pages', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPages(data);
        setConnected(true);
      } else {
        setConnected(false);
        setPages([]);
      }
    } catch {
      setConnected(false);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:3000/facebook/auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch {
      setError('Failed to connect Facebook. Try again.');
    }
  };

  const handleSelectPage = async (pageId) => {
    setSelecting(pageId);
    setError('');
    try {
      const res = await fetch('http://localhost:3000/facebook/select-page', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ pageId }),
      });
      if (!res.ok) throw new Error();
      navigate('/home');
    } catch {
      setError('Failed to select page. Try again.');
      setSelecting(null);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // ── Not connected ──
  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 w-full max-w-md text-center">

          {/* Facebook icon */}
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Facebook</h2>
          <p className="text-sm text-gray-500 mb-8">
            Connect your Facebook account to manage and post to your pages.
          </p>

          {error && (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            onClick={handleConnect}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm py-3 rounded-xl transition-colors"
          >
            Connect Facebook
          </button>
        </div>
      </div>
    );
  }

  // ── Connected — show pages ──
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">

        <h2 className="text-xl font-semibold text-gray-900 mb-1">Select a Page</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose the Facebook page you want to post from.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 mb-6">
          {pages.map((page) => (
            <div
              key={page.pageId}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                page.isDefault
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Page name + badge */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {(page.pageName || page.pageId).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {page.pageName || page.pageId}
                  </p>
                  {page.isDefault && (
                    <span className="text-xs text-blue-600 font-medium">
                      Currently selected
                    </span>
                  )}
                </div>
              </div>

              {/* Select button or checkmark */}
              {page.isDefault ? (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              ) : (
                <button
                  onClick={() => handleSelectPage(page.pageId)}
                  disabled={selecting === page.pageId}
                  className="text-sm font-medium text-blue-600 bg-white border border-blue-300 hover:bg-blue-50 px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {selecting === page.pageId ? 'Selecting...' : 'Select'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Reconnect */}
        <button
          onClick={handleConnect}
          className="w-full text-sm text-gray-500 hover:text-gray-700 border border-gray-200 hover:border-gray-300 py-2.5 rounded-xl transition-colors"
        >
          Reconnect Facebook account
        </button>
      </div>
    </div>
  );
}

export default FacebookConnect;