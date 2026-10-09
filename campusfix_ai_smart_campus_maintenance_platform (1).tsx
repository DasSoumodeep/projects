import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, Wifi, Zap, Droplets, AlertTriangle, CheckCircle2, Clock, 
  MapPin, ShieldAlert, Sparkles, Search, Filter, Bell, ArrowRight, 
  FileText, User, ChevronRight, BarChart3, TrendingUp, Layers, 
  ThumbsUp, RefreshCw, Eye, MessageSquare, Star, Check, X, Send,
  Cpu, Activity, CheckSquare, Upload, HelpCircle, Flame, Navigation,
  ChevronDown, ExternalLink, Play, Award, Smartphone, Sun, Moon,
  Wrench, ShieldCheck, Copy, Info, CheckCircle, RotateCcw
} from 'lucide-react';

const INITIAL_COMPLAINTS = [
  {
    id: "CMP-1024",
    title: "Wi-Fi access point down in Block A corridors",
    description: "Signal completely dropped on 2nd and 3rd floors since morning lectures started.",
    category: "Wi-Fi / Internet",
    location: "Block A - Level 2 Hallway",
    building: "Block A",
    room: "Corridor 200",
    priority: "HIGH",
    priorityReason: "Impacts 4 lecture halls and continuous online academic assessments.",
    department: "IT Department",
    assignedStaff: "Alex Kumar (Senior Network Eng.)",
    status: "In Progress",
    createdAt: "2026-10-08 09:15",
    expectedResolution: "Today, 02:00 PM",
    studentName: "Priya Sharma",
    studentEmail: "student@campusfix.demo",
    duplicateCount: 3,
    timeline: [
      { status: "Submitted", time: "09:15 AM", note: "Reported via mobile portal" },
      { status: "AI Analyzed", time: "09:15 AM", note: "Categorized as IT / HIGH (96% conf.)" },
      { status: "Assigned", time: "09:22 AM", note: "Assigned to Alex Kumar" },
      { status: "In Progress", time: "09:40 AM", note: "Technician inspecting PoE switch" }
    ]
  },
  {
    id: "CMP-1042",
    title: "Broken ceiling projector and HDMI port",
    description: "Projector flickers and shuts off after 2 minutes. We have a major presentation tomorrow.",
    category: "Classroom",
    location: "Academic Block B - Room 204",
    building: "Block B",
    room: "Room 204",
    priority: "HIGH",
    priorityReason: "Scheduled faculty presentations and class instruction blocked.",
    department: "Technical Maintenance",
    assignedStaff: "Rohan Varma",
    status: "Assigned",
    createdAt: "2026-10-09 08:30",
    expectedResolution: "Today, 04:30 PM",
    studentName: "Arjun Mehta",
    studentEmail: "arjun@campusfix.demo",
    duplicateCount: 0,
    timeline: [
      { status: "Submitted", time: "08:30 AM", note: "Complaint logged by student" },
      { status: "AI Analyzed", time: "08:30 AM", note: "Identified high-priority classroom hardware" },
      { status: "Assigned", time: "08:45 AM", note: "Routed to Academic Technical team" }
    ]
  },
  {
    id: "CMP-1011",
    title: "Exposed live wiring near water dispenser",
    description: "Wall socket housing is cracked open right above the cold water fountain.",
    category: "Electricity",
    location: "STEM Complex - Ground Floor",
    building: "STEM Lab Complex",
    room: "GF Lobby",
    priority: "CRITICAL",
    priorityReason: "Immediate shock & fire hazard: water proximity + exposed 230V terminals.",
    department: "Electrical Department",
    assignedStaff: "Suresh Patil (Lead Electrician)",
    status: "In Progress",
    createdAt: "2026-10-09 07:10",
    expectedResolution: "Within 60 mins",
    studentName: "Prof. Ananya Sen",
    studentEmail: "staff@campusfix.demo",
    duplicateCount: 1,
    timeline: [
      { status: "Submitted", time: "07:10 AM", note: "Urgent safety report" },
      { status: "AI Analyzed", time: "07:10 AM", note: "Classified CRITICAL safety risk" },
      { status: "Assigned", time: "07:12 AM", note: "Instant emergency dispatch" },
      { status: "In Progress", time: "07:20 AM", note: "Power isolated; conduit repair underway" }
    ]
  },
  {
    id: "CMP-0998",
    title: "Heavy water leakage from washroom ceiling",
    description: "Continuous dripping water causing slippery floor and drywall dampness.",
    category: "Sanitation",
    location: "Central Library - 1st Floor Restroom",
    building: "Central Library",
    room: "Restroom 1B",
    priority: "MEDIUM",
    priorityReason: "Slips/falls risk, facility dampness, non-emergency plumbing fault.",
    department: "Plumbing Department",
    assignedStaff: "Manoj Singh",
    status: "Resolved",
    createdAt: "2026-10-07 14:00",
    resolvedAt: "2026-10-08 11:30",
    expectedResolution: "Completed",
    studentName: "Kabir Das",
    studentEmail: "student@campusfix.demo",
    studentFeedback: { rating: 5, comment: "Quick fix and area was dried properly!" },
    timeline: [
      { status: "Submitted", time: "Oct 7, 02:00 PM", note: "Reported" },
      { status: "Assigned", time: "Oct 7, 02:30 PM", note: "Assigned to Manoj Singh" },
      { status: "In Progress", time: "Oct 8, 09:00 AM", note: "Replacing overhead valve seal" },
      { status: "Resolved", time: "Oct 8, 11:30 AM", note: "Repaired and confirmed watertight" }
    ]
  },
  {
    id: "CMP-0985",
    title: "Broken armrest and loose screws on desk 14",
    description: "Lecture hall row 3 desk wobbles badly and armrest detached.",
    category: "Furniture",
    location: "Block A - Hall 102",
    building: "Block A",
    room: "Hall 102",
    priority: "LOW",
    priorityReason: "Cosmetic / ergonomic issue with other seats available.",
    department: "Civil/Maintenance Department",
    assignedStaff: "Dinesh Carpenter",
    status: "Closed",
    createdAt: "2026-10-06 11:00",
    resolvedAt: "2026-10-07 16:00",
    studentName: "Neha Gupta",
    studentEmail: "student@campusfix.demo",
    studentFeedback: { rating: 4, comment: "Fixed cleanly." },
    timeline: [
      { status: "Submitted", time: "Oct 6", note: "Logged" },
      { status: "Resolved", time: "Oct 7", note: "Repaired desk" },
      { status: "Closed", time: "Oct 7", note: "Student verified" }
    ]
  }
];

const CAMPUS_HEATMAP_DATA = [
  { id: "A", name: "Academic Block A", count: 34, critical: 2, high: 14, medium: 12, low: 6, trend: "+42% above avg", risk: "high", coords: { x: 22, y: 35 } },
  { id: "B", name: "Science & Eng Block B", count: 18, critical: 1, high: 6, medium: 8, low: 3, trend: "Normal level", risk: "medium", coords: { x: 50, y: 28 } },
  { id: "C", name: "STEM Lab Complex", count: 23, critical: 4, high: 9, medium: 7, low: 3, trend: "+18% this week", risk: "high", coords: { x: 74, y: 40 } },
  { id: "LIB", name: "Central Library", count: 7, critical: 0, high: 1, medium: 4, low: 2, trend: "-15% improvement", risk: "low", coords: { x: 38, y: 65 } },
  { id: "HOSTEL", name: "Student Hostels (H1-H4)", count: 29, critical: 3, high: 11, medium: 10, low: 5, trend: "High night volume", risk: "high", coords: { x: 80, y: 72 } }
];

function runCampusAIClassifier(text) {
  const lower = text.toLowerCase();
  
  let category = "Infrastructure";
  let department = "Civil/Maintenance Department";
  let priority = "MEDIUM";
  let priorityReason = "Standard physical campus infrastructure assessment.";
  let suggestedAction = "Dispatch routine facilities crew for physical inspection.";

  if (lower.includes("wifi") || lower.includes("wi-fi") || lower.includes("internet") || lower.includes("network") || lower.includes("router") || lower.includes("slow speed")) {
    category = "Wi-Fi / Internet";
    department = "IT Department";
    priority = (lower.includes("lab") || lower.includes("exam") || lower.includes("presentation") || lower.includes("entire")) ? "HIGH" : "MEDIUM";
    priorityReason = priority === "HIGH" ? "Academic facility internet loss disrupts scheduled sessions." : "Localized connectivity disruption.";
    suggestedAction = "Check wireless access points, PoE switch power, and gateway DNS status.";
  } else if (lower.includes("electric") || lower.includes("wire") || lower.includes("spark") || lower.includes("shock") || lower.includes("smoke") || lower.includes("blackout") || lower.includes("switch")) {
    category = "Electricity";
    department = "Electrical Department";
    if (lower.includes("spark") || lower.includes("shock") || lower.includes("smoke") || lower.includes("fire") || lower.includes("live wire") || lower.includes("water")) {
      priority = "CRITICAL";
      priorityReason = "Immediate life-safety and fire hazard detected near students/staff.";
      suggestedAction = "Trip relevant circuit breaker immediately and send emergency electrician with insulated PPE.";
    } else {
      priority = "HIGH";
      priorityReason = "Electrical supply failure impeding classroom and facility utilities.";
      suggestedAction = "Inspect local distribution board and test fuse circuits.";
    }
  } else if (lower.includes("water") || lower.includes("leak") || lower.includes("tap") || lower.includes("pipe") || lower.includes("plumbing") || lower.includes("flood")) {
    category = "Water";
    department = "Plumbing Department";
    priority = (lower.includes("flood") || lower.includes("heavy") || lower.includes("electric")) ? "CRITICAL" : "MEDIUM";
    priorityReason = priority === "CRITICAL" ? "Flooding hazard threatening structural safety or electrical assets." : "Plumbing malfunction leading to resource waste.";
    suggestedAction = "Shut off isolation line valve and replace faulty seals/pipe joints.";
  } else if (lower.includes("projector") || lower.includes("screen") || lower.includes("board") || lower.includes("mic") || lower.includes("speaker") || lower.includes("classroom")) {
    category = "Classroom";
    department = "Academic/Technical Maintenance";
    priority = lower.includes("presentation") || lower.includes("tomorrow") || lower.includes("exam") ? "HIGH" : "MEDIUM";
    priorityReason = "Classroom audiovisual failure impacting ongoing instructional lectures.";
    suggestedAction = "Test HDMI cabling, lamp life, and reboot AV transmitter module.";
  } else if (lower.includes("sanitation") || lower.includes("toilet") || lower.includes("washroom") || lower.includes("smell") || lower.includes("garbage") || lower.includes("trash")) {
    category = "Sanitation";
    department = "Sanitation Department";
    priority = lower.includes("overflow") || lower.includes("unusable") ? "HIGH" : "MEDIUM";
    priorityReason = "Sanitary standard degradation affecting hygiene.";
    suggestedAction = "Dispatch deep-clean sanitization team with disinfectant reagents.";
  } else if (lower.includes("desk") || lower.includes("chair") || lower.includes("bench") || lower.includes("furniture") || lower.includes("table")) {
    category = "Furniture";
    department = "Civil/Maintenance Department";
    priority = "LOW";
    priorityReason = "Cosmetic or single-seat ergonomic defect with low risk.";
    suggestedAction = "Queue work order for campus carpentry workshop schedule.";
  }

  let detectedBuilding = "Academic Block A";
  let detectedRoom = "General Area";
  if (lower.includes("lab 3") || lower.includes("lab3")) {
    detectedBuilding = "STEM Lab Complex";
    detectedRoom = "Lab 3";
  } else if (lower.includes("room 204") || lower.includes("204")) {
    detectedBuilding = "Block B";
    detectedRoom = "Room 204";
  } else if (lower.includes("library")) {
    detectedBuilding = "Central Library";
    detectedRoom = "Reading Hall";
  } else if (lower.includes("hostel")) {
    detectedBuilding = "Hostel H2";
    detectedRoom = "Common Area";
  } else if (lower.includes("block a")) {
    detectedBuilding = "Block A";
    detectedRoom = "Lecture Wing";
  }

  const words = text.split(/\s+/).filter(w => w.length > 3).slice(0, 5);

  return {
    category,
    department,
    priority,
    priorityReason,
    suggestedAction,
    location: `${detectedBuilding} - ${detectedRoom}`,
    building: detectedBuilding,
    room: detectedRoom,
    keywords: words,
    confidence: {
      category: Math.floor(92 + Math.random() * 7),
      priority: Math.floor(89 + Math.random() * 8),
      department: Math.floor(94 + Math.random() * 5)
    }
  };
}

export default function CampusFixApp() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('campusfix_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('campusfix_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('campusfix_theme', 'light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [isDarkMode]);

  // Views: 'landing' | 'student' | 'staff' | 'admin' | 'submit' | 'detail'
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState('Student');
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState(INITIAL_COMPLAINTS[0]);

  // Banner toast message system replacing alert()
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your complaint CMP-1024 has been assigned to Alex Kumar (IT).", time: "10m ago", read: false },
    { id: 2, text: "Urgent issue CMP-1011 routed to Electrical Department.", time: "1h ago", read: false },
    { id: 3, text: "Complaint CMP-0998 resolved. Please confirm resolution.", time: "Yesterday", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // New complaint form state
  const [formText, setFormText] = useState("");
  const [formCategory, setFormCategory] = useState("Wi-Fi / Internet");
  const [formBuilding, setFormBuilding] = useState("Block A");
  const [formRoom, setFormRoom] = useState("");
  const [formContact, setFormContact] = useState("student@campusfix.demo");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);
  const [potentialDuplicate, setPotentialDuplicate] = useState(null);

  // Resolution modal & Feedback
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [staffNoteModalOpen, setStaffNoteModalOpen] = useState(false);
  const [pendingResolutionId, setPendingResolutionId] = useState(null);
  const [staffProofText, setStaffProofText] = useState("Replaced hardware component, verified signal and voltage.");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");

  // Hackathon Demo Mode
  const [demoStep, setDemoStep] = useState(0);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Submitted' || c.status === 'Assigned').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length;
    const critical = complaints.filter(c => c.priority === 'CRITICAL').length;
    return { total, pending, inProgress, resolved, critical };
  }, [complaints]);

  const handleRoleSwitch = (role) => {
    setUserRole(role);
    if (role === 'Student') setCurrentView('student');
    if (role === 'Staff') setCurrentView('staff');
    if (role === 'Admin') setCurrentView('admin');
  };

  const handleAnalyzeText = () => {
    if (!formText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = runCampusAIClassifier(formText);
      setAiAnalysisResult(result);
      setFormCategory(result.category);
      setFormBuilding(result.building);
      setFormRoom(result.room);

      const dup = complaints.find(c => 
        c.category === result.category && 
        (c.building.toLowerCase().includes(result.building.toLowerCase()) || result.building.toLowerCase().includes(c.building.toLowerCase())) &&
        c.status !== 'Closed'
      );
      if (dup) {
        setPotentialDuplicate({
          existing: dup,
          similarity: 92
        });
      } else {
        setPotentialDuplicate(null);
      }
      setIsAnalyzing(false);
    }, 600);
  };

  const handleFinalSubmit = (asMerged = false) => {
    if (asMerged && potentialDuplicate) {
      setComplaints(prev => prev.map(c => {
        if (c.id === potentialDuplicate.existing.id) {
          return {
            ...c,
            duplicateCount: (c.duplicateCount || 1) + 1,
            timeline: [
              ...c.timeline,
              { status: "Duplicate Merged", time: "Just now", note: `Additional report by ${formContact}: "${formText.substring(0, 40)}..."` }
            ]
          };
        }
        return c;
      }));
      showToast(`Merged into active ticket ${potentialDuplicate.existing.id}. Priority auto-escalated!`, 'success');
      setCurrentView('student');
      return;
    }

    const newId = `CMP-${Math.floor(1050 + Math.random() * 899)}`;
    const analysis = aiAnalysisResult || runCampusAIClassifier(formText || "Unspecified facility defect");

    const newComplaint = {
      id: newId,
      title: formText.length > 50 ? formText.substring(0, 50) + "..." : (formText || "Reported Issue"),
      description: formText || "No additional description entered.",
      category: formCategory || analysis.category,
      location: `${formBuilding} - ${formRoom || 'Unassigned room'}`,
      building: formBuilding,
      room: formRoom || "Room 101",
      priority: analysis.priority,
      priorityReason: analysis.priorityReason,
      department: analysis.department,
      assignedStaff: analysis.department === 'IT Department' ? 'Alex Kumar' : (analysis.department === 'Electrical Department' ? 'Suresh Patil' : 'Unassigned Dispatch'),
      status: "Submitted",
      createdAt: "Just now",
      expectedResolution: "Within 24 Hours",
      studentName: "Current User",
      studentEmail: formContact,
      duplicateCount: 0,
      timeline: [
        { status: "Submitted", time: "Just now", note: "Created via Smart NLP intake" },
        { status: "AI Analyzed", time: "Just now", note: `AI Routed to ${analysis.department} (${analysis.priority} Priority)` }
      ]
    };

    setComplaints([newComplaint, ...complaints]);
    setSelectedComplaint(newComplaint);
    setNotifications([
      { id: Date.now(), text: `Ticket ${newId} created and routed to ${analysis.department}.`, time: "Just now", read: false },
      ...notifications
    ]);

    setFormText("");
    setAiAnalysisResult(null);
    setPotentialDuplicate(null);
    setCurrentView('detail');
    showToast(`Ticket ${newId} successfully dispatched!`, 'success');
  };

  const handleUpdateStatus = (id, newStatus, note) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = [
          ...c.timeline,
          { status: newStatus, time: "Just now", note: note || `Status updated to ${newStatus}` }
        ];
        return {
          ...c,
          status: newStatus,
          timeline: updatedTimeline,
          resolvedAt: newStatus === 'Resolved' ? 'Just now' : c.resolvedAt
        };
      }
      return c;
    }));

    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => ({
        ...prev,
        status: newStatus,
        timeline: [...prev.timeline, { status: newStatus, time: "Just now", note: note || `Status changed to ${newStatus}` }]
      }));
    }
  };

  const handleStudentConfirmResolution = (isFixed) => {
    if (!selectedComplaint) return;
    if (isFixed) {
      setResolutionModalOpen(true);
    } else {
      handleUpdateStatus(selectedComplaint.id, "In Progress", "Student verified: 'Still Not Fixed'. Ticket reopened with escalation tag.");
      showToast("Ticket reopened and flagged for immediate technician follow-up.", "warning");
    }
  };

  const handleSaveFeedback = () => {
    if (!selectedComplaint) return;
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedComplaint.id) {
        return {
          ...c,
          status: "Closed",
          studentFeedback: { rating: feedbackRating, comment: feedbackComment }
        };
      }
      return c;
    }));
    setSelectedComplaint(prev => ({
      ...prev,
      status: "Closed",
      studentFeedback: { rating: feedbackRating, comment: feedbackComment }
    }));
    setResolutionModalOpen(false);
    showToast("Feedback submitted. Ticket formally closed!", "success");
  };

  const runHackathonStep = (stepNumber) => {
    setDemoStep(stepNumber);
    if (stepNumber === 1) {
      setCurrentView('submit');
      setFormText("The Wi-Fi in Lab 3 is not working. We have an important lab session today.");
    } else if (stepNumber === 2) {
      setCurrentView('submit');
      setFormText("The Wi-Fi in Lab 3 is not working. We have an important lab session today.");
      handleAnalyzeText();
    } else if (stepNumber === 3) {
      handleFinalSubmit(false);
    } else if (stepNumber === 4) {
      setUserRole('Staff');
      setCurrentView('staff');
    } else if (stepNumber === 5) {
      const target = complaints[0];
      handleUpdateStatus(target.id, 'Resolved', 'Replaced faulty PoE cable on ceiling switch AP-301. Network full speed.');
      setUserRole('Student');
      setCurrentView('detail');
    } else if (stepNumber === 6) {
      setUserRole('Admin');
      setCurrentView('admin');
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 ${
          toastMessage.type === 'success' ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20' :
          toastMessage.type === 'warning' ? 'bg-amber-600 text-white border-amber-500 shadow-amber-500/20' :
          'bg-slate-900 text-white border-slate-700'
        }`}>
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Hackathon Interactive Presentation Ribbon */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-800 text-white px-4 py-2.5 text-xs font-medium shadow-md sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/30">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold tracking-wide uppercase text-indigo-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            Hackathon Live Demo Engine:
          </span>
          <span className="hidden sm:inline text-indigo-200">Follow the 6-step end-to-end evaluation scenario:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {[
            { step: 1, label: "1. Student Complaint" },
            { step: 2, label: "2. AI Analysis" },
            { step: 3, label: "3. Ticket Tracking" },
            { step: 4, label: "4. Staff Workbench" },
            { step: 5, label: "5. Resolution & Feedback" },
            { step: 6, label: "6. Admin Heatmap" }
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => runHackathonStep(item.step)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1 whitespace-nowrap shadow-sm ${
                demoStep === item.step 
                  ? 'bg-amber-400 text-slate-950 font-bold scale-105 shadow-amber-400/40 ring-2 ring-white/50' 
                  : 'bg-white/15 hover:bg-white/30 text-white hover:text-white'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          {demoStep > 0 && (
            <button
              onClick={() => setDemoStep(0)}
              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white ml-1"
              title="Reset Demo Steps"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-[41px] z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                  CampusFix AI
                </span>
                <span className="bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  v2.4 Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Report. Resolve. Improve.
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'landing' 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { setUserRole('Student'); setCurrentView('student'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'student' && userRole === 'Student'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => { setUserRole('Staff'); setCurrentView('staff'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'staff'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Staff Workbench
            </button>
            <button
              onClick={() => { setUserRole('Admin'); setCurrentView('admin'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'admin'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin & Heatmap
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800 relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">Live Campus Alerts</span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {notifications.filter(n => !n.read).length} unread
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setNotifications(notifications.map(n => ({ ...n, read: true })));
                      setShowNotifications(false);
                    }}
                    className="w-full mt-2 py-1.5 text-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
              <span className="hidden lg:inline px-2 text-slate-500 dark:text-slate-400 text-[11px]">Role:</span>
              <button
                onClick={() => handleRoleSwitch('Student')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'Student' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => handleRoleSwitch('Staff')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'Staff' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => handleRoleSwitch('Admin')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  userRole === 'Admin' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={() => { setCurrentView('submit'); setAiAnalysisResult(null); }}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dynamic View Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ========================================================= */}
        {/* VIEW 1: LANDING PAGE */}
        {/* ========================================================= */}
        {currentView === 'landing' && (
          <div className="space-y-16 py-4 animate-in fade-in duration-300">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white p-8 sm:p-14 border border-indigo-500/20 shadow-2xl">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute right-40 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="max-w-3xl relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Next-Generation Intelligent Campus Infrastructure</span>
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                  Report in seconds.<br />
                  <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">
                    Resolved with AI precision.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  CampusFix AI automatically understands natural speech, detects physical locations, assesses safety priority, eliminates duplicate complaints, and coordinates university maintenance teams in real-time.
                </p>

                {/* High Contrast Hero CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => { setCurrentView('submit'); setAiAnalysisResult(null); }}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-500/25 active:scale-95 transition-all"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Report an Issue Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setUserRole('Student'); setCurrentView('student'); }}
                    className="flex items-center gap-2 bg-slate-800/80 hover:bg-white text-slate-100 hover:text-slate-900 font-semibold px-6 py-3.5 rounded-2xl border border-slate-700 hover:border-white shadow-lg active:scale-95 transition-all"
                  >
                    <Search className="w-4 h-4 text-blue-400" />
                    <span>Track My Complaints</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-slate-300 pl-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>24/7 Live Campus Dispatch</span>
                  </div>
                </div>

                {/* Role Switcher Demo Cards */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Launch Prototype As:</span>
                  <button
                    onClick={() => handleRoleSwitch('Student')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/25 text-white text-xs font-semibold transition-all border border-white/15 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-blue-300" />
                    Student: student@campusfix.demo
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('Staff')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/25 text-white text-xs font-semibold transition-all border border-white/15 flex items-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5 text-amber-300" />
                    Staff: staff@campusfix.demo
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('Admin')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/25 text-white text-xs font-semibold transition-all border border-white/15 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                    Admin: admin@campusfix.demo
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                  Intelligent Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Why CampusFix AI outperforms traditional forms
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Moving from slow administrative tickets to autonomous triage, semantic clustering, and closed-loop resolution.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
                {[
                  {
                    icon: <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
                    title: "AI Complaint Classification",
                    desc: "Parses free-form student text into accurate category classifications (Wi-Fi, Electrical, AV, Plumbing) with 95%+ confidence scores."
                  },
                  {
                    icon: <ShieldAlert className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
                    title: "Smart Priority Detection",
                    desc: "Identifies life-safety risks (bare electrical wiring, water leaks near circuits) instantly promoting them to CRITICAL priority."
                  },
                  {
                    icon: <Navigation className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
                    title: "Automatic Department Routing",
                    desc: "Zero manual clerk sorting. Wi-Fi issues route directly to IT, water faults to Plumbing, and AV issues to Academic Tech."
                  },
                  {
                    icon: <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
                    title: "Duplicate Complaint Detection",
                    desc: "Discovers semantic overlap across tickets (e.g., 'No Wi-Fi Block A' vs 'Internet down Block A') and merges them with upvoted severity."
                  },
                  {
                    icon: <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
                    title: "Live Milestone Tracking",
                    desc: "Real-time timeline tracking: Submitted → AI Analyzed → Dispatched → In Progress → Student Verified Resolution."
                  },
                  {
                    icon: <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                    title: "Campus Analytics & Heatmap",
                    desc: "Visual geospatial clustering shows recurring problem spots across buildings, empowering preventative campus maintenance."
                  }
                ].map((feat, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all space-y-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {feat.icon}
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{feat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <div className="text-center">
                <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">1.8 hrs</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Avg. Resolution Speed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">96.4%</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">AI Classification Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-amber-500 dark:text-amber-400">42%</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Duplicate Merge Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">4.8 / 5</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Student Satisfaction</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: STUDENT DASHBOARD */}
        {/* ========================================================= */}
        {currentView === 'student' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Welcome back, Priya
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    Student Portal
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track your reported campus tickets and verify repairs once maintenance concludes.
                </p>
              </div>

              {/* Student Action Buttons with Guaranteed Contrast on Hover */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setCurrentView('submit'); setAiAnalysisResult(null); }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Report New Issue</span>
                </button>
                
                <button
                  onClick={() => {
                    const el = document.getElementById('complaints-table');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Track My Complaints</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Reports</p>
                <p className="text-2xl font-black mt-2 text-slate-900 dark:text-slate-100">{stats.total}</p>
                <p className="text-[11px] text-slate-400 mt-1">Across all semesters</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pending / Queued</p>
                <p className="text-2xl font-black mt-2 text-amber-600 dark:text-amber-400">{stats.pending}</p>
                <p className="text-[11px] text-slate-400 mt-1">Awaiting dispatch</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">In Progress</p>
                <p className="text-2xl font-black mt-2 text-blue-600 dark:text-blue-400">{stats.inProgress}</p>
                <p className="text-[11px] text-slate-400 mt-1">Technicians actively on-site</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Resolved</p>
                <p className="text-2xl font-black mt-2 text-emerald-600 dark:text-emerald-400">{stats.resolved}</p>
                <p className="text-[11px] text-slate-400 mt-1">Fixed & closed</p>
              </div>
            </div>

            <div id="complaints-table" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">My Registered Complaints</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Click any complaint to inspect timeline logs or confirm completion.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search title or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Ticket ID</th>
                      <th className="py-3.5 px-4">Problem Summary</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Location</th>
                      <th className="py-3.5 px-4">Priority</th>
                      <th className="py-3.5 px-4">Department</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {complaints
                      .filter(c => searchQuery === "" || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((ticket) => (
                        <tr 
                          key={ticket.id} 
                          onClick={() => { setSelectedComplaint(ticket); setCurrentView('detail'); }}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            {ticket.id}
                            {ticket.duplicateCount > 0 && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300" title="Merged duplicate reports">
                                +{ticket.duplicateCount}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-medium max-w-xs truncate text-slate-900 dark:text-slate-100">
                            {ticket.title}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                              {ticket.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-slate-500 dark:text-slate-400">
                            {ticket.location}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase ${
                              ticket.priority === 'CRITICAL' ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-300/40' :
                              ticket.priority === 'HIGH' ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300' :
                              ticket.priority === 'MEDIUM' ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' :
                              'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                            {ticket.department}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ticket.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' :
                              ticket.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 animate-pulse' :
                              ticket.status === 'Assigned' ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300' :
                              ticket.status === 'Closed' ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' :
                              'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline inline-flex items-center gap-0.5">
                              Details <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: SMART COMPLAINT SUBMISSION (AI NLP ENGINE) */}
        {/* ========================================================= */}
        {currentView === 'submit' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Smart Complaint Intake
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Describe what broke in your own words. CampusFix AI handles categorizing, routing, and priority detection.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('student')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Back to Dashboard
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Describe the issue (Natural Language)</span>
                  <span className="text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Powered by AI Classifier
                  </span>
                </label>
                <textarea
                  rows={4}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="e.g., 'The Wi-Fi in Lab 3 is completely dead and our instructor needs online access for the lab exam starting in 15 minutes.'"
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400">Quick Test Samples:</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormText("The Wi-Fi in Lab 3 is not working. We have an important lab session today.");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-medium hover:bg-indigo-100 transition-colors"
                >
                  Wi-Fi Outage in Lab 3
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormText("Live wire sparking near the second floor water cooler in Academic Block A!");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-medium hover:bg-rose-100 transition-colors"
                >
                  Electrical Sparking Hazard (Critical)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormText("The projector in Room 204 keeps turning off during lecture presentation.");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium hover:bg-blue-100 transition-colors"
                >
                  Classroom Projector Fault
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleAnalyzeText}
                  disabled={!formText.trim() || isAnalyzing}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI Analyzing Semantics...</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4 text-amber-300" />
                      <span>Run AI Semantic Analysis</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] text-slate-400">Extracts category, room, safety risk & department automatically</span>
              </div>
            </div>

            {aiAnalysisResult && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white border border-indigo-500/30 shadow-xl space-y-6 animate-in slide-in-from-top-3 duration-300">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-extrabold text-base tracking-tight text-white">AI Diagnostic Assessment</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    High Confidence
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Identified Category</span>
                    <p className="text-base font-black mt-1 text-white">{aiAnalysisResult.category}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">Confidence: {aiAnalysisResult.confidence.category}%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">Assigned Priority</span>
                    <p className="text-base font-black mt-1 text-amber-300">{aiAnalysisResult.priority}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">Confidence: {aiAnalysisResult.confidence.priority}%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Target Department</span>
                    <p className="text-base font-black mt-1 text-white">{aiAnalysisResult.department}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold mt-1">Confidence: {aiAnalysisResult.confidence.department}%</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs bg-black/30 p-4 rounded-2xl border border-white/10">
                  <div>
                    <span className="font-bold text-indigo-300">Priority Logic: </span>
                    <span className="text-slate-200">{aiAnalysisResult.priorityReason}</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-300">Routing Recommendation: </span>
                    <span className="text-slate-200">{aiAnalysisResult.suggestedAction}</span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-bold text-slate-400">Extracted Keywords:</span>
                    {aiAnalysisResult.keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/15 text-white font-mono text-[10px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {potentialDuplicate && (
                  <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span className="font-bold text-sm text-white">Possible Duplicate Detected!</span>
                      <span className="ml-auto text-xs font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded">
                        {potentialDuplicate.similarity}% Match
                      </span>
                    </div>
                    <p className="text-xs text-amber-200">
                      An active complaint <strong className="text-white underline">{potentialDuplicate.existing.id}</strong> ("{potentialDuplicate.existing.title}") already exists in <strong className="text-white">{potentialDuplicate.existing.location}</strong>.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleFinalSubmit(true)}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow"
                      >
                        Merge Complaint (Escalates Priority)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFinalSubmit(false)}
                        className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                      >
                        Create Separate Complaint
                      </button>
                    </div>
                  </div>
                )}

                {!potentialDuplicate && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleFinalSubmit(false)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Dispatch Ticket</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Location & Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Campus Building</label>
                  <select
                    value={formBuilding}
                    onChange={(e) => setFormBuilding(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
                  >
                    <option value="Block A">Academic Block A</option>
                    <option value="Block B">Science & Eng Block B</option>
                    <option value="STEM Lab Complex">STEM Lab Complex</option>
                    <option value="Central Library">Central Library</option>
                    <option value="Hostel H1">Student Hostel H1</option>
                    <option value="Hostel H2">Student Hostel H2</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Room / Sector</label>
                  <input
                    type="text"
                    value={formRoom}
                    onChange={(e) => setFormRoom(e.target.value)}
                    placeholder="e.g. Lab 3 or Room 204"
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Your Email / ID</label>
                  <input
                    type="email"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {!aiAnalysisResult && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleFinalSubmit(false)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                  >
                    Direct Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 4: COMPLAINT DETAIL & TRACKING TIMELINE */}
        {/* ========================================================= */}
        {currentView === 'detail' && selectedComplaint && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentView(userRole === 'Staff' ? 'staff' : (userRole === 'Admin' ? 'admin' : 'student'))}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                ← Back to {userRole} Dashboard
              </button>

              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                Ticket: {selectedComplaint.id}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                      selectedComplaint.priority === 'CRITICAL' ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300' :
                      selectedComplaint.priority === 'HIGH' ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300' :
                      'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                    }`}>
                      {selectedComplaint.priority} PRIORITY
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {selectedComplaint.category}
                    </span>
                    <span className="text-xs text-slate-400">Reported {selectedComplaint.createdAt}</span>
                  </div>

                  <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                    {selectedComplaint.title}
                  </h1>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedComplaint.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 min-w-[200px] space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Location</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedComplaint.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Responsible Dept.</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedComplaint.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Assigned Staff</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedComplaint.assignedStaff}</span>
                  </div>
                </div>
              </div>

              {selectedComplaint.priorityReason && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-900 dark:text-indigo-300">AI Priority Reasoning: </span>
                    <span className="text-indigo-800 dark:text-indigo-200">{selectedComplaint.priorityReason}</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Resolution Lifecycle Timeline</span>
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {selectedComplaint.timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                        index === selectedComplaint.timeline.length - 1 ? 'bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950' : 'bg-slate-400'
                      }`}></div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.status}</span>
                        <span className="text-[11px] font-mono text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedComplaint.status === 'Resolved' && (
                <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Maintenance Staff has marked this issue as Resolved!</span>
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Please inspect the physical site and confirm whether the repair meets campus standards:
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleStudentConfirmResolution(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      ✓ Issue Fixed (Confirm & Rate)
                    </button>
                    <button
                      onClick={() => handleStudentConfirmResolution(false)}
                      className="bg-rose-100 dark:bg-rose-900/60 hover:bg-rose-200 text-rose-700 dark:text-rose-300 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                    >
                      ✗ Still Not Fixed (Reopen Ticket)
                    </button>
                  </div>
                </div>
              )}

              {selectedComplaint.studentFeedback && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(selectedComplaint.studentFeedback.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="ml-2 font-bold text-slate-700 dark:text-slate-300">
                      Student Rating: {selectedComplaint.studentFeedback.rating}/5
                    </span>
                  </div>
                  {selectedComplaint.studentFeedback.comment && (
                    <p className="text-slate-600 dark:text-slate-400 italic">"{selectedComplaint.studentFeedback.comment}"</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 5: MAINTENANCE STAFF WORKBENCH */}
        {/* ========================================================= */}
        {currentView === 'staff' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Technician Dispatch Workbench
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    Staff Portal
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Accept dispatched work orders, transition job status, and publish resolution notes with image proof.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Logged in as:</span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  Alex Kumar (IT Department)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="text-slate-400 mr-1">Filter Queue:</span>
              {['All', 'Assigned', 'In Progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    filterStatus === st 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {complaints
                .filter(c => filterStatus === 'All' || c.status === filterStatus)
                .map(ticket => (
                  <div 
                    key={ticket.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:border-blue-400 dark:hover:border-blue-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">{ticket.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            ticket.priority === 'CRITICAL' ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300' :
                            ticket.priority === 'HIGH' ? 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300' :
                            'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                          }`}>
                            {ticket.priority}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mt-1">{ticket.title}</h3>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ticket.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' :
                        ticket.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300' :
                        'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {ticket.description}
                    </p>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{ticket.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Department:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{ticket.department}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-100 dark:border-slate-800">
                      {ticket.status === 'Submitted' && (
                        <button
                          onClick={() => {
                            handleUpdateStatus(ticket.id, 'Assigned', 'Claimed by technician on workbench');
                            showToast(`Claimed work order ${ticket.id}`, 'info');
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                        >
                          Accept Ticket
                        </button>
                      )}

                      {ticket.status === 'Assigned' && (
                        <button
                          onClick={() => {
                            handleUpdateStatus(ticket.id, 'In Progress', 'Technician on-site inspecting failure');
                            showToast(`Status updated: In Progress on ${ticket.id}`, 'info');
                          }}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          <span>Start Work</span>
                        </button>
                      )}

                      {ticket.status === 'In Progress' && (
                        <button
                          onClick={() => {
                            setPendingResolutionId(ticket.id);
                            setStaffNoteModalOpen(true);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark Resolved</span>
                        </button>
                      )}

                      <button
                        onClick={() => { setSelectedComplaint(ticket); setCurrentView('detail'); }}
                        className="ml-auto text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        View Full Log
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 6: ADMINISTRATOR DASHBOARD & CAMPUS HEATMAP */}
        {/* ========================================================= */}
        {currentView === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Campus Operations & Intelligence Hub
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                    Administrator
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  High-level SLA velocity, category distributions, problem hot zones, and automated predictive insights.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
                  Campus SLA Health: 94.2%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</span>
                <p className="text-2xl font-black mt-1 text-slate-900 dark:text-slate-100">{stats.total}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Pending</span>
                <p className="text-2xl font-black mt-1 text-amber-500">{stats.pending}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">In Progress</span>
                <p className="text-2xl font-black mt-1 text-blue-500">{stats.inProgress}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Resolved</span>
                <p className="text-2xl font-black mt-1 text-emerald-500">{stats.resolved}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-rose-500 tracking-wider">Critical</span>
                <p className="text-2xl font-black mt-1 text-rose-500">{stats.critical}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="text-[10px] uppercase font-bold text-purple-500 tracking-wider">Avg Fix Time</span>
                <p className="text-2xl font-black mt-1 text-purple-600 dark:text-purple-400">1.8h</p>
              </div>
            </div>

            {/* CAMPUS PROBLEM HEATMAP SECTION */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-rose-500" />
                    <span>Campus Problem Concentration Heatmap</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Geospatial visualization of maintenance density by campus block.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-rose-600 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High Density
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold ml-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Moderate
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-bold ml-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low
                  </span>
                </div>
              </div>

              <div className="relative w-full h-80 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 border border-slate-300 dark:border-slate-800 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {CAMPUS_HEATMAP_DATA.map((loc) => (
                  <div
                    key={loc.id}
                    style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  >
                    <div className={`relative flex items-center justify-center rounded-2xl p-3 shadow-lg transition-transform hover:scale-110 border ${
                      loc.risk === 'high' ? 'bg-rose-500/90 text-white border-rose-300 ring-4 ring-rose-500/20' :
                      loc.risk === 'medium' ? 'bg-amber-500/90 text-white border-amber-300 ring-4 ring-amber-500/20' :
                      'bg-emerald-500/90 text-white border-emerald-300 ring-4 ring-emerald-500/20'
                    }`}>
                      <div className="text-center">
                        <span className="font-extrabold text-xs block">{loc.name}</span>
                        <span className="text-[11px] font-bold opacity-90">{loc.count} tickets</span>
                      </div>
                    </div>

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl bg-slate-900 text-white text-[11px] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      <p className="font-bold text-amber-300">{loc.name}</p>
                      <p className="mt-1">Critical: {loc.critical} | High: {loc.high} | Med: {loc.medium}</p>
                      <p className="text-emerald-300 font-semibold mt-0.5">{loc.trend}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <strong>Key Spatial Finding: </strong>
                  Block A has <span className="font-bold underline">42% more complaints</span> than the campus baseline. Recurring issues focus heavily on corridor Wi-Fi repeaters and aging classroom desks.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Volume Breakdown by Category
                </h3>

                <div className="space-y-3 pt-2">
                  {[
                    { label: "Wi-Fi / Internet", count: 82, pct: 82, color: "bg-indigo-600" },
                    { label: "Electricity & Safety", count: 61, pct: 61, color: "bg-rose-500" },
                    { label: "Classroom AV & Tech", count: 43, pct: 43, color: "bg-blue-500" },
                    { label: "Sanitation & Water", count: 31, pct: 31, color: "bg-emerald-500" },
                    { label: "Infrastructure & Furniture", count: 19, pct: 19, color: "bg-amber-500" }
                  ].map((cat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">{cat.label}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">{cat.count} complaints</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>AI Campus Insights & Recommendations</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded">
                    Autonomous
                  </span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs space-y-1">
                    <p className="font-bold text-indigo-900 dark:text-indigo-300">
                      ⚡ Wi-Fi complaints surged by +28% this week
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Concentrated in Block A & STEM Labs. Recommending firmware audit on Cisco PoE AP switches.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60 text-xs space-y-1">
                    <p className="font-bold text-rose-900 dark:text-rose-300">
                      ⚠️ Electrical repairs have highest average downtime (3.2h)
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Due to secondary requisition of circuit breaker components. Consider stocking extra 16A relays on site.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 text-xs space-y-1">
                    <p className="font-bold text-emerald-900 dark:text-emerald-300">
                      🎯 23 student complaints avoided via Duplicate Merging
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Staff dispatch dispatch queues were freed by 34%, eliminating repetitive redundant site inspections.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic pt-1">
                  * Generated by CampusFix AI Pattern Classifier. For operational guidance only.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL 1: RESOLUTION FEEDBACK MODAL (STUDENT CONFIRMATION) */}
      {/* ========================================================= */}
      {resolutionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Rate Maintenance Quality</h3>
              <button 
                onClick={() => setResolutionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your feedback is used to evaluate department SLAs and technician reliability ratings.
            </p>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedbackRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star className={`w-8 h-8 ${star <= feedbackRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Optional Comments</label>
              <textarea
                rows={3}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Was the technician punctual? Is the equipment working properly now?"
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResolutionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveFeedback}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
              >
                Submit & Close Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: STAFF RESOLUTION NOTE MODAL (REPLACES PROMPT) */}
      {/* ========================================================= */}
      {staffNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Publish Resolution Log</span>
              </h3>
              <button 
                onClick={() => setStaffNoteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide technician proof notes and action steps taken to resolve this ticket.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Work Performed / Diagnostic Note</label>
              <textarea
                rows={3}
                value={staffProofText}
                onChange={(e) => setStaffProofText(e.target.value)}
                className="w-full mt-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStaffNoteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pendingResolutionId) {
                    handleUpdateStatus(pendingResolutionId, 'Resolved', staffProofText);
                    showToast(`Work order ${pendingResolutionId} marked as Resolved!`, 'success');
                  }
                  setStaffNoteModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300">CampusFix AI — Smart Campus Complaint & Maintenance Management System</p>
        <p className="mt-1">Hackathon Prototype Edition • Report. Resolve. Improve.</p>
      </footer>
    </div>
  );
}