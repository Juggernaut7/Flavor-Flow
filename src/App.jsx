import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Modal from './components/UI/Modal';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import RecipesPage from './pages/RecipesPage';
import PlannerPage from './pages/PlannerPage';
import ShoppingListPage from './pages/ShoppingListPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/Common/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import Button from './components/UI/Button';


function App() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [modalMessage, setModalMessage] = useState(null);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    window.location.hash = page;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} setModalMessage={setModalMessage} />;
      case 'dashboard':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <DashboardPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
      case 'recipes':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <RecipesPage />
          </ProtectedRoute>
        );
      case 'planner': // Corrected typo here!
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <PlannerPage />
          </ProtectedRoute>
        );
      case 'shopping-list':
        return (
          <ProtectedRoute isAuthenticated={isAuthenticated} onNavigate={handleNavigate}>
            <ShoppingListPage />
          </ProtectedRoute>
        );
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* These CDN links are typically for quick demos or specific environments.
          In a standard React project with Tailwind installed, these are not strictly necessary
          as Tailwind is processed during the build step. However, for the Canvas environment,
          they ensure styles and icons are available. */}
      {/* <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link> */}

      <Navbar onNavigate={handleNavigate} />
      <main className="flex-grow container mx-auto p-4 my-8">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      <Footer />
      <Modal
        isOpen={!!modalMessage}
        onClose={() => setModalMessage(null)}
        title={modalMessage?.type === 'success' ? 'Success!' : 'Error!'}
      >
        <p className={modalMessage?.type === 'success' ? 'text-success' : 'text-error'}>
          {modalMessage?.message}
        </p>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setModalMessage(null)} variant="secondary">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
