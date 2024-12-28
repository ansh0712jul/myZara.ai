import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React from "react";


const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-8 text-center">
      <h1 className="text-5xl font-bold mb-4 ">
        Welcome to <span className="text-blue-300">Zara.ai</span>
      </h1>       
       <p className="text-lg text-gray-400 mb-6">
          Collaborate, code, and innovate with AI-powered tools designed for teams and individuals.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
          <Link to="/login">Get Started</Link>
        </Button>
      </header>

      {/* Features Section */}
      <section className="py-8 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Zara.AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gray-700 shadow border-none">
            <CardContent>
              <h3 className="text-xl font-bold m-2 text-gray-100 shadow">AI-Driven Coding</h3>
              <p className="text-gray-400">
                Get instant AI assistance for coding tasks, from server creation to debugging.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-none">
            <CardContent>
              <h3 className="text-xl font-bold text-gray-100 m-2">Collaborate Seamlessly</h3>
              <p className="text-gray-400">
                Invite team members, manage roles, and build projects together in real-time.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-700 border-none">
            <CardContent>
              <h3 className="text-xl font-bold text-gray-100 m-2">Streamline Workflows</h3>
              <p className="text-gray-400">
                Save time with ready-to-use templates, live previews, and one-click deployment.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-400">
              Create your account and set up your profile to get started.
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">Start a Project</h3>
            <p className="text-gray-400">
              Create a new project and invite collaborators to join.
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">Code with AI</h3>
            <p className="text-gray-400">
              Use AI tools to write, review, and deploy your code effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-8 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-400 mb-6">
          Join thousands of developers collaborating with Zara.AI.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
          <Link to="/register">Create Account</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Zara.AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
