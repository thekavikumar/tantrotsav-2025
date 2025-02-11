import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserDetails from './pages/UserDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Events from './pages/Events';
import RouteGuard from './components/RouteGuard'; // Import the global route guard
import EventDetails from './pages/EventDetails';
import Gallery from './pages/Gallery';
import Failed from './pages/Failed';
import Success from './pages/Success';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route path="/register" element={<UserDetails />} />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Success />} path="/success" />
          <Route element={<Failed />} path="/failed" />
          <Route
            path="/events"
            element={
              <RouteGuard>
                <Events />
              </RouteGuard>
            }
          />
          <Route
            path="/gallery"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path="/support"
            element={
              <RouteGuard>
                <Home />
              </RouteGuard>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <RouteGuard>
                <EventDetails />
              </RouteGuard>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={
                <RouteGuard>
                  <Profile />
                </RouteGuard>
              }
            />
            <Route
              path="/cart"
              element={
                <RouteGuard>
                  <Cart />
                </RouteGuard>
              }
            />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
