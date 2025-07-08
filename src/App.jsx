import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import About from "./components/About";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SignInPage from "./app/(auth)/sign-in/[[...sign-in]]/SignIn";
import Dashboard from "./app/dashboard/Dashboard";
import ProtectedRoute from "./app/(auth)/sign-in/[[...sign-in]]/ProtectedRoute";
import ImageGen from "./app/image-gen/ImageGen";
import Echo from "./app/pdf-to-podcast/Echo";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Story />
              <Contact />
            </>
          }
        />
        <Route path="/sign-in/*" element={<SignInPage />} />

        <Route
          path="/nexus"
          element={
            <ProtectedRoute>
              <ImageGen />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Echo"
          element={
            <ProtectedRoute>
              <Echo />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/oracle"
          element={
            <ProtectedRoute>
              <Oracle />
            </ProtectedRoute>
          }
        />


        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <contact />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
