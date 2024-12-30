import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FaLaptopCode, FaUsers, FaRegClock, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; 
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[90vh] flex items-center justify-center text-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/phs3D1YseeI?autoplay=1&mute=1&loop=1&start=47&end=72&playlist=phs3D1YseeI"
            title="YouTube video background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-8">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span>Zara.ai</span>
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Collaborate, code, and innovate with AI-powered tools designed for teams and individuals.
          </p>
          <Button className="bg-blue-100 text-blue-700 hover:bg-blue-100 font-bold text-md px-6 py-3">
            <Link to="/login">Get Started for free</Link>
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-8 px-4 bg-[#111827]">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Zara.ai?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-[#1F2937] shadow-lg border-none">
            <CardContent className="text-center flex flex-col justify-center items-center">
              <FaLaptopCode className="text-[#6366F1] text-6xl mb-4 mt-7" />
              <h3 className="text-xl font-bold m-2 text-gray-100">AI-Driven Coding</h3>
              <p className="text-gray-400">
                Get instant AI assistance for coding tasks, from server creation to debugging.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#1F2937] shadow-lg border-none">
            <CardContent className="text-center flex flex-col justify-center items-center">
              <FaUsers className="text-6xl text-[#6366F1] mb-4 mt-7" />
              <h3 className="text-xl font-bold text-gray-100 m-2">Collaborate Seamlessly</h3>
              <p className="text-gray-400">
                Invite team members, manage roles, and build projects together in real-time.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#1F2937] shadow-lg border-none">
            <CardContent className="text-center flex flex-col justify-center items-center mt-7">
              <FaRegClock className="text-6xl text-[#6366F1] mb-4" />
              <h3 className="text-xl font-bold text-gray-100 m-2">Streamline Workflows</h3>
              <p className="text-gray-400">
                Save time with ready-to-use templates, live previews, and one-click deployment.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-8 bg-gray-800 ">
        <h2 className="text-5xl text-center mb-8">Frequently Asked Questions</h2>
        <p className="text-gray-100 text-center">Find answers to common questions about service, features, and more.</p>
        <Accordion type="single" collapsible className="space-y-4 ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl text-gray-100">
              What is Zara.ai?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Zara.ai is an AI-powered platform that helps developers collaborate, code, and innovate with advanced AI tools.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl text-gray-100">
              How do I get started with Zara.ai?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Simply sign up, create a project, and start collaborating with your team. You can use AI-powered tools to assist in coding and development.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl text-gray-100">
              Can I collaborate with my team in real-time?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes, Zara.ai allows seamless real-time collaboration with your team members. You can manage roles, share code, and work together.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl text-gray-100">
              Is there a free plan available?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes, Zara.ai offers a free plan to get started. You can explore the basic features and collaborate with your team without any cost.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl font-bold text-[#6366F1] mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-400">
              Create your account and set up your profile to get started.
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#6366F1] mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">Start a Project</h3>
            <p className="text-gray-400">
              Create a new project and invite collaborators to join.
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#6366F1] mb-4">3</div>
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
        <Button className="bg-gray-100 text-blue-700 font-bold text-md hover:bg-gray-100 px-6 py-3">
          <Link to="/register">Create Account</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Footer Column 1: Zara.ai Intro */}
            <div className="text-center md:text-left mx-8">
              <h3 className="text-3xl font-bold text-[#672ACC] mb-6">Zara.ai</h3>
              <p className="text-gray-400 leading-relaxed">
                Zara.ai is an AI-powered platform that helps developers collaborate, code, and innovate with advanced AI tools.
              </p>
            </div>

            {/* Footer Column 2: Navigation Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-100 mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li className="hover:border-b-2 border-gray-400 w-fit">
                  <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                </li>
                <li className="hover:border-b-2 border-gray-400 w-fit">
                  <Link to="/features" className="text-gray-400 hover:text-white">Features</Link>
                </li>
                <li className="hover:border-b-2 border-gray-400 w-fit">
                  <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
                </li>
                <li className="hover:border-b-2 border-gray-400 w-fit">
                  <Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
                </li>
              </ul>
            </div>

            {/* Footer Column 3: Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold text-gray-100 mb-6">Follow Us</h4>
              <div className="flex space-x-6">
                <Link to="https://instagram.com" className="text-[#672ACC] text-2xl hover:text-[#4737CA]">
                  <FaInstagram />
                </Link>
                <Link to="https://twitter.com" className="text-[#672ACC] text-2xl hover:text-[#4737CA]">
                  <FaTwitter />
                </Link>
                <Link to="https://linkedin.com" className="text-[#672ACC] text-2xl hover:text-[#4737CA]">
                  <FaLinkedin />
                </Link>
                <Link to="https://github.com" className="text-[#672ACC] text-2xl hover:text-[#4737CA]">
                  <FaGithub />
                </Link>
              </div>
            </div>

            {/* Footer Column 4: Contact Information */}
            <div>
              <h4 className="text-xl font-semibold text-gray-100 mb-6">Contact Us</h4>
              <p className="text-gray-400 leading-relaxed">
                Email: <a href="mailto:support@zara.ai" className="text-[#672ACC] hover:text-[#4737CA]">support@zara.ai</a>
              </p>
              <p className="text-gray-400 leading-relaxed mt-4">
                Phone: <a href="tel:+1234567890" className="text-[#672ACC] hover:text-[#4737CA]">+1 234 567 890</a>
              </p>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="shadow-lg text-center mt-12 mb-8 border border-gray-700 rounded-3xl h-[80px] w-[70%] flex items-center justify-center mx-auto">
            <p className="text-gray-400 text-xl">
              &copy; {new Date().getFullYear()} Zara.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
