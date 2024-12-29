import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AgentPage from './pages/Dashboard/AgentPage';
import LeadsyPage from './pages/Agents/LeadsyPage';
import LeadsyTemp from './pages/Agents/LeadsyTemp';
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
        <Route path="/agents/leadsy" element={<LeadsyPage />} />
        <Route path="/agents/leadsy-temp" element={<LeadsyTemp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/agents" element={<AgentsPage />} />
        <Route path="/dashboard/agents/:agentId/*" element={<AgentPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/agents" element={<Agents />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
