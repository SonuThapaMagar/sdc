import React from "react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pet Adoption</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Adopt
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Perfect Pet</h2>
        <p className="text-lg mb-6">
          Discover adorable pets waiting for their forever homes. Start your
          adoption journey today!
        </p>
        <a
          href="#"
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Browse Pets
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Pet Adoption. All rights reserved.</p>
      </footer>
    </div>
  );
}
