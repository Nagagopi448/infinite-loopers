import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { useAuth } from './contexts/AuthContext';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import CourseList from './components/Courses/CourseList';
import CourseDetail from './components/Courses/CourseDetail';
import StudentCourseList from './components/Student/StudentCourseList';
import AssignmentSubmission from './components/Student/AssignmentSubmission';
import Achievements from './components/Student/Achievements';
import CreateCourse from './components/Courses/CreateCourse';
import AssignmentList from './components/Assignments/AssignmentList';
import CreateAssignment from './components/Assignments/CreateAssignment';
import SubmissionList from './components/Assignments/SubmissionList';
import SubmitAssignment from './components/Assignments/SubmitAssignment';
import GradesList from './components/Grades/GradesList';
import DiscussionForum from './components/Forum/DiscussionForum';
import CourseMaterials from './components/Materials/CourseMaterials';
import FloatingActionButton from './components/UI/FloatingActionButton';
import ScrollToTop from './components/UI/ScrollToTop';
import Navbar from './components/Layout/Navbar';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          } />
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/create-course" element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          } />
          <Route path="/assignments" element={
            <ProtectedRoute>
              <AssignmentList />
            </ProtectedRoute>
          } />
          <Route path="/create-assignment" element={
            <ProtectedRoute>
              <CreateAssignment />
            </ProtectedRoute>
          } />
          <Route path="/submissions/:assignmentId" element={
            <ProtectedRoute>
              <SubmissionList />
            </ProtectedRoute>
          } />
          <Route path="/submit/:assignmentId" element={
            <ProtectedRoute>
              <SubmitAssignment />
            </ProtectedRoute>
          } />
          <Route path="/forum/:courseId" element={
            <ProtectedRoute>
              <DiscussionForum />
            </ProtectedRoute>
          } />
          <Route path="/materials/:courseId" element={
            <ProtectedRoute>
              <CourseMaterials />
            </ProtectedRoute>
          } />
          <Route path="/grades" element={
            <ProtectedRoute>
              <GradesList />
            </ProtectedRoute>
          } />
          <Route path="/achievements" element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Learning Progress</h2>
                <p>Detailed progress tracking page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>My Profile</h2>
                <p>Profile management page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Account Settings</h2>
                <p>Settings page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/forums" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Discussion Forums</h2>
                <p>Forums page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/certificates" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>My Certificates</h2>
                <p>Certificates page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/help" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Help & Support</h2>
                <p>Help page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Teaching Analytics</h2>
                <p>Analytics page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/manage-courses" element={
            <ProtectedRoute>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Course Management</h2>
                <p>Course management page coming soon!</p>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>
      
      {/* Interactive UI Components */}
      <FloatingActionButton />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
