import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import PostList from './components/PostList/PostList';
import UpdatePost from './components/UpdatePost/UpdatePost'; // Import UpdatePost component
import CreatePost from './components/CreatePost/CreatePost'; // Import CreatePost component
import NavBar from './components/Navbar/NavBar';
// import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          {/* SignIn Route (Displayed at "/") */}
          <Route
            path="/"
            element={
              <SignedOut>
                <SignIn redirectUrl="/posts" /> {/* Redirect to posts after successful sign in */}
              </SignedOut>
            }
          />

          {/* Redirect SignedIn users visiting "/" to /posts */}
          <Route
            path="/"
            element={
              <SignedIn>
                <Navigate to="/posts" />
              </SignedIn>
            }
          />

          {/* Posts Route (Only accessible after signing in) */}
          <Route
            path="/posts"
            element={
              <SignedIn>
                <PostList />
              </SignedIn>
            }
          />

          {/* Update Post Route (Only accessible after signing in) */}
          <Route
            path="/update-post/:id"
            element={
              <SignedIn>
                <UpdatePost />
              </SignedIn>
            }
          />

          {/* Create Post Route (Only accessible after signing in) */}
          <Route
            path="/create-post"
            element={
              <SignedIn>
                <CreatePost />
              </SignedIn>
            }
          />

          {/* Catch-all Route: Redirect SignedOut users trying to access any page */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
