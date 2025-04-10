import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mt-16">
        <Navbar/>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Shorten Links. Track Clicks. Gain Insights.</h2>
        <p className="text-gray-600 max-w-2xl mb-6">
          Create branded short URLs and get real-time analytics on clicks, devices, browsers, and more.
        </p>
        <div className='flex mx-auto space-x-4'>
        <Link
          to="/dashboard"
          className="text-white bg-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
        <br />
        <Link
          to="/shortUrl"
          className="text-white bg-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
            Short Link
        </Link>

        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Short Link Generator</h3>
            <p className="text-gray-600">Easily turn long URLs into short, shareable links with optional custom aliases.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Click Analytics</h3>
            <p className="text-gray-600">Track total clicks over time with insightful line and bar charts.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Device & Browser Insights</h3>
            <p className="text-gray-600">Understand your audience with pie charts showing device and browser breakdown.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-100 text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} LinkSnap. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
