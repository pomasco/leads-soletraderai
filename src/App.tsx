import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AgentTemplate from './pages/Agents/AgentTemplate';
import AgentPage from './pages/Dashboard/AgentPage';
import Dashboard from './pages/Dashboard';
import AgentsPage from './pages/Dashboard/Agents/index';
import Pricing from './pages/Pricing';
import Agents from './pages/Agents';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents/:agentSlug" element={<AgentTemplate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/agents" element={<AgentsPage />} />
        <Route path="/dashboard/agents/:agentSlug" element={<AgentPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/agents" element={<Agents />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <AppContent />
    </Router>
  );
}

export default App;