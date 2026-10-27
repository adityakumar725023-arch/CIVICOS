import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { ReportIssueForm } from './components/citizen/ReportIssueForm';
import { ComplaintSuccessModal } from './components/citizen/ComplaintSuccessModal';
import { PublicFeed } from './components/feed/PublicFeed';
import { IssueDetailModal } from './components/feed/IssueDetailModal';
import { CivicMap } from './components/map/CivicMap';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StatusUpdateModal } from './components/admin/StatusUpdateModal';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { AboutView } from './components/about/AboutView';
import { Toast } from './components/common/Toast';
import { storageService } from './services/storageService';
import { DEMO_PRESETS } from './constants/constants';

export function App() {
  const [complaints, setComplaints] = useState([]);
  const [userRole, setUserRole] = useState('citizen'); // 'citizen' | 'admin'
  const [currentTab, setCurrentTab] = useState('feed'); // 'feed' | 'report' | 'map' | 'admin' | 'analytics' | 'about'
  
  // Modals state
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [statusUpdateComplaint, setStatusUpdateComplaint] = useState(null);
  const [successComplaint, setSuccessComplaint] = useState(null);
  const [toast, setToast] = useState(null);

  // Load complaints on mount
  useEffect(() => {
    const data = storageService.getComplaints();
    setComplaints(data);
  }, []);

  // Compute live analytics
  const analytics = storageService.getAnalytics(complaints);

  // Show toast helper
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  // Create new complaint
  const handleCreateComplaint = (formData) => {
    const newComplaint = storageService.createComplaint(formData);
    setComplaints(storageService.getComplaints());
    setSuccessComplaint(newComplaint);
    showToast(
      'success',
      'Complaint Lodged!',
      `Ticket #${newComplaint.id} has been recorded and routed.`
    );
  };

  // Update status (Admin)
  const handleUpdateStatus = (complaintId, updateData) => {
    const updated = storageService.updateStatus(complaintId, updateData);
    setComplaints(updated);

    // If modal is open for this complaint, update selected complaint
    if (selectedComplaint && selectedComplaint.id === complaintId) {
      const refreshed = updated.find(c => c.id === complaintId);
      setSelectedComplaint(refreshed);
    }

    showToast(
      'success',
      'Case File Updated',
      `Complaint #${complaintId} status updated to ${updateData.status}.`
    );
  };

  // Upvote complaint
  const handleToggleUpvote = (complaintId) => {
    const result = storageService.toggleUpvote(complaintId);
    setComplaints(result.complaints);

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      const refreshed = result.complaints.find(c => c.id === complaintId);
      setSelectedComplaint(refreshed);
    }

    if (result.isUpvoted) {
      showToast('info', 'Issue Endorsed', 'Your upvote helps elevate municipal urgency.');
    }
  };

  // Add comment
  const handleAddComment = (complaintId, commentData) => {
    const updated = storageService.addComment(complaintId, commentData);
    setComplaints(updated);

    if (selectedComplaint && selectedComplaint.id === complaintId) {
      const refreshed = updated.find(c => c.id === complaintId);
      setSelectedComplaint(refreshed);
    }

    showToast('success', 'Comment Added', 'Your remark is now visible on the public ledger.');
  };

  // Reset to initial demo data
  const handleResetData = () => {
    if (window.confirm('Reset all civic complaints to clean demo data?')) {
      const reset = storageService.resetToDemoData();
      setComplaints(reset);
      setSelectedComplaint(null);
      setStatusUpdateComplaint(null);
      showToast('info', 'Demo Data Reset', 'Platform restored to initial sample cases.');
    }
  };

  // 1-Click Demo Scenario for Judges
  const handleQuickPreset = () => {
    const randomPreset = DEMO_PRESETS[Math.floor(Math.random() * DEMO_PRESETS.length)];
    const newDemoComplaint = storageService.createComplaint({
      categoryId: randomPreset.categoryId,
      title: randomPreset.title,
      description: randomPreset.description,
      ward: randomPreset.ward,
      locationText: randomPreset.locationText,
      coordinates: { lat: randomPreset.lat, lng: randomPreset.lng },
      priority: randomPreset.priority,
      image: randomPreset.image,
      isAnonymous: false,
      reportedBy: 'Hackathon Judge Demo',
      contactPhone: '+91 98990 11223',
      contactEmail: 'demo@hackathon.org'
    });

    setComplaints(storageService.getComplaints());
    setSelectedComplaint(newDemoComplaint);
    showToast(
      'success',
      'Demo Scenario Loaded!',
      `Created sample case #${newDemoComplaint.id}. Opened detailed audit view.`
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    storageService.exportCSV();
    showToast('info', 'Report Generated', 'Complaints spreadsheet downloaded successfully.');
  };

  // Change view role toggle
  const handleSetRole = (role) => {
    setUserRole(role);
    if (role === 'admin' && currentTab !== 'admin' && currentTab !== 'analytics') {
      setCurrentTab('admin');
    } else if (role === 'citizen' && currentTab === 'admin') {
      setCurrentTab('feed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Top Navbar */}
      <Navbar
        userRole={userRole}
        setUserRole={handleSetRole}
        onResetData={handleResetData}
        onQuickPreset={handleQuickPreset}
        onExportCSV={handleExportCSV}
        pendingCount={analytics.pending}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          userRole={userRole}
          setUserRole={handleSetRole}
          stats={analytics}
        />

        {/* Dynamic Content Views */}
        <main className="flex-1 min-w-0 bg-slate-50/60 pb-12">
          {currentTab === 'report' && (
            <ReportIssueForm
              onSubmitSuccess={(formData) => {
                handleCreateComplaint(formData);
              }}
              onCancel={() => setCurrentTab('feed')}
            />
          )}

          {currentTab === 'feed' && (
            <PublicFeed
              complaints={complaints}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onToggleUpvote={handleToggleUpvote}
              onNavigateReport={() => setCurrentTab('report')}
            />
          )}

          {currentTab === 'map' && (
            <CivicMap
              complaints={complaints}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
            />
          )}

          {currentTab === 'admin' && (
            <AdminDashboard
              complaints={complaints}
              analytics={analytics}
              onSelectComplaint={(c) => setSelectedComplaint(c)}
              onOpenStatusUpdate={(c) => setStatusUpdateComplaint(c)}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsDashboard
              analytics={analytics}
              complaints={complaints}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentTab === 'about' && (
            <AboutView
              onNavigateReport={() => setCurrentTab('report')}
              onNavigateFeed={() => setCurrentTab('feed')}
            />
          )}
        </main>

      </div>

      {/* Global Modals */}
      {selectedComplaint && (
        <IssueDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onToggleUpvote={handleToggleUpvote}
          onAddComment={handleAddComment}
          onOpenStatusUpdate={(c) => {
            setSelectedComplaint(null);
            setStatusUpdateComplaint(c);
          }}
          userRole={userRole}
        />
      )}

      {statusUpdateComplaint && (
        <StatusUpdateModal
          complaint={statusUpdateComplaint}
          onClose={() => setStatusUpdateComplaint(null)}
          onSave={handleUpdateStatus}
        />
      )}

      {successComplaint && (
        <ComplaintSuccessModal
          complaint={successComplaint}
          onClose={() => setSuccessComplaint(null)}
          onViewFeed={() => setCurrentTab('feed')}
          onViewMap={() => setCurrentTab('map')}
        />
      )}

      {/* Notification Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
