"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Zoom from "next-image-zoom";

const Home = () => {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleGenerateClick = () => {
    router.push("/generate");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-400 p-8">
      {/* Main Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-white mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ⿻ UIllusion: AI-Powered Wireframe to Code Generator
      </motion.h1>

      {/* Cards displaying benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Card 1 */}
        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Instant Code Generation
          </h3>
          <p className="text-gray-200 text-center">
            Automatically generate high-quality, responsive code from
            wireframes.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Tailored to Your Design
          </h3>
          <p className="text-gray-200 text-center">
            Our AI customizes the generated code based on your wireframe’s
            specifics.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white">Quick & Efficient</h3>
          <p className="text-gray-200 text-center">
            Save time with our rapid and efficient wireframe-to-code conversion
            process.
          </p>
        </motion.div>
      </div>

      {/* How to use section */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
      >
        <h1 className="text-2xl font-light text-white mb-2 text-center">
          How to
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Image Cards */}
        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4 cursor-pointer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Zoom
            src="/screenshot1.png"
            alt="Screenshot 1"
            width={600}
            height={400}
            layout={"responsive"}
          />
        </motion.div>

        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4 cursor-pointer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
        >
          <Zoom
            src="/screenshot2.png"
            alt="Screenshot 2"
            width={600}
            height={400}
            layout={"responsive"}
          />
        </motion.div>

        <motion.div
          className="bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl flex flex-col items-center space-y-4 cursor-pointer"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.9 }}
        >
          <Zoom
            src="/screenshot4.png"
            alt="Screenshot 4"
            width={600}
            height={400}
            layout={"responsive"}
          />
        </motion.div>
      </div>

      {/* Call to Action Button */}
      <motion.button
        onClick={handleGenerateClick}
        className="bg-purple-700 text-white px-8 py-3 rounded-lg shadow-xl hover:bg-purple-800 transition duration-300 ease-in-out mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Start Generating Code
      </motion.button>

      {/* Information Section */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
        className="bg-black mt-10 bg-opacity-60 p-8 rounded-lg shadow-lg text-center w-full sm:w-1/2"
      >
        <p className="text-white text-center font-light">
          Currently, the code generator produces JSX with TailwindCSS, enabling
          seamless integration with modern frontend frameworks. However,
          upcoming updates will expand its capabilities to support multiple
          technologies.
        </p>
      </motion.div>

      {/* Developer Section */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.9 }}
        className="bg-black mt-10 bg-opacity-60 p-8 rounded-lg shadow-lg text-center w-full sm:w-1/2"
      >
        <Link href="https://fjerbi.github.io/">
          <Image
            src="/firasjerbiv2.png"
            alt="Developer"
            className="w-32 h-32 rounded-full mx-auto mb-4"
            height={200}
            width={200}
          />
        </Link>
        <h2 className="text-2xl font-bold text-white mb-2">
          Developed by Firas Jerbi
        </h2>
        <p className="text-gray-200 mb-4">
          This is an open-source project created to help you generate code from
          wireframes using AI. Feel free to use, modify, and contribute!
        </p>

        {/* Buy me a coffee section */}
        <a
          className="flex items-center justify-center bg-yellow-500 text-black py-2 rounded-lg shadow-lg mt-6 hover:bg-orange-700 transition duration-300"
          target="_blank"
          href="https://www.buymeacoffee.com/firasjerbi"
        >
          <Image
            className=" mr-3"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            height={20}
            width={20}
          />
          <span className="font-semibold">Buy me a coffee</span>
        </a>

        {/* Contribute Section */}
        <p className="text-gray-200 mb-4 mt-6">
          Interested in contributing to this project? Check out the repository
          on GitHub.
        </p>
        <a
          href="https://github.com/fjerbi/UIllusion" // Replace with your GitHub repository link
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Contribute on GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default Home;
