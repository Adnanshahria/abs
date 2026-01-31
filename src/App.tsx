import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminCandidates from './pages/AdminCandidates';
import AdminCenters from './pages/AdminCenters';
import AdminUpdates from './pages/AdminUpdates';
import AdminRumors from './pages/AdminRumors';
import AdminIncidents from './pages/AdminIncidents';
import AdminTrainAI from './pages/AdminTrainAI';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VoteCenter from './pages/VoteCenter';
import CastVote from './pages/CastVote';
import CandidateList from './pages/CandidateList';
import SignUp from './pages/SignUp';
import NIDVerification from './pages/NIDVerification';
import Status from './pages/Status';
import VideoTutorials from './pages/VideoTutorials';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import ReportIncident from './pages/ReportIncident';
// import CandidateDetails from './pages/CandidateDetails';
// import VoterGuide from './pages/VoterGuide';
// import FAQ from './pages/FAQ';
// import ElectionRules from './pages/ElectionRules';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import TermsOfService from './pages/TermsOfService';
// import Volunteer from './pages/Volunteer';
// import PressKit from './pages/PressKit';
// import Accessibility from './pages/Accessibility';
import ObserverInfo from './pages/ObserverInfo';
import PastResults from './pages/PastResults';
// import CompareCandidates from './pages/CompareCandidates';
import CivicBadge from './pages/CivicBadge';
import Placeholder from './pages/Placeholder';
import NavigationMap from './components/NavigationMap';
import './index.css';
import ElectionUpdates from './pages/ElectionUpdates';
import Course from './pages/Course';
import RumorCheck from './pages/RumorCheck';
import Creator from './lib/Copyright';
import Chat from './pages/Chat';

import { useEffect } from 'react';
import { checkConnection } from './lib/db';

import SEO from './components/SEO';

function App() {
  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <SEO /> {/* Default SEO */}
          <div className="min-h-screen flex flex-col relative">
            {/* Background Image */}
            <div className="bg-nirbachon"></div>

            {/* Green Overlay */}
            <div className="green-overlay"></div>

            {/* Base gradient background */}
            <div className="fixed inset-0 -z-2 bg-gradient-to-br from-green-50/80 via-white/90 to-green-100/80"></div>

            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vote-center" element={<VoteCenter />} />
              <Route path="/cast-vote" element={<CastVote />} />
              <Route path="/candidate-list" element={<CandidateList />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/verify-nid" element={<NIDVerification />} />
              <Route path="/status" element={<Status />} />
              <Route path="/video-tutorials" element={<VideoTutorials />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Admin Routes */}
              <Route path="/adm" element={<AdminRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="candidates" element={<AdminCandidates />} />
                <Route path="centers" element={<AdminCenters />} />
                <Route path="updates" element={<AdminUpdates />} />
                <Route path="rumors" element={<AdminRumors />} />
                <Route path="incidents" element={<AdminIncidents />} />
                <Route path="train-ai" element={<AdminTrainAI />} />
              </Route>

              {/* New Pages */}
              {/* <Route path="/candidate-details" element={<CandidateDetails />} />
              <Route path="/voter-guide" element={<VoterGuide />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/rules" element={<ElectionRules />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/press" element={<PressKit />} />
              <Route path="/accessibility" element={<Accessibility />} /> */}
              <Route path="/report" element={<ReportIncident />} />
              <Route path="/observers" element={<ObserverInfo />} />
              <Route path="/archive" element={<PastResults />} />

              {/* Chatbot */}
              <Route path="/chat" element={<Chat />} />

              {/* Menu Pages from Image */}
              <Route path="/election-updates" element={<ElectionUpdates />} />
              <Route path="/course" element={<Course />} />
              <Route path="/compare" element={<Navigate to="/candidate-list" replace />} />
              <Route path="/rumor-check" element={<RumorCheck />} />
              <Route path="/civic-badge" element={<CivicBadge />} />
              <Route path="/creator" element={<Creator />} />

              <Route path="*" element={<Placeholder />} />
            </Routes>

            {/* Navigation Map Floating Button */}
            <NavigationMap />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
