import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const runTests = async () => {
    setLoading(true);
    const tests = {};

    // Test 1: Root endpoint
    try {
      const res = await fetch(`${apiUrl}`);
      tests.root = { status: res.status, data: await res.json() };
    } catch (err) {
      tests.root = { error: err.message };
    }

    // Test 2: Gallery endpoint (normalized)
    try {
      const res = await fetch(`${apiUrl}/gallery`);
      tests.gallery = { status: res.status, data: await res.json() };
    } catch (err) {
      tests.gallery = { error: err.message };
    }

    // Test 3: Admin login (normalized)
    try {
      const res = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' })
      });
      tests.adminLogin = { status: res.status, data: await res.json() };
    } catch (err) {
      tests.adminLogin = { error: err.message };
    }

    // Test 4: Send email (unchanged)
    try {
      const res = await fetch(`${apiUrl}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '1234567890',
          message: 'Test message',
          branch: 'warje'
        })
      });
      tests.sendEmail = { status: res.status, data: await res.json() };
    } catch (err) {
      tests.sendEmail = { error: err.message };
    }

    setResults(tests);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-600">
          🧪 API Integration Test
        </h1>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="font-bold text-lg mb-2">Configuration</h2>
          <p className="text-sm text-gray-600">
            <strong>API URL:</strong> {apiUrl}
          </p>
          <button
            onClick={runTests}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Run Tests Again'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Running tests...</p>
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg shadow overflow-hidden">
              <div className={`p-4 ${
                value.error ? 'bg-red-100' : 
                value.status === 200 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {value.error ? '❌' : value.status === 200 ? '✅' : '⚠️'}
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Status: {value.status || 'Error'}
                </p>
              </div>
              <div className="p-4">
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}