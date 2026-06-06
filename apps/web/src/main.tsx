import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import "./index.css";
import App from "./App.tsx";
import GraphPage from "./pages/GraphPage.tsx";
import Landing from "./pages/Landing.tsx";
import SignIn from "./pages/SignIn.tsx";
import BetaTest from "./pages/BetaTest.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import EmailSent from "./pages/EmailSent.tsx";
import Event from "./pages/Event.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import GoalsPage from "./pages/GoalsPage.tsx";
import GoalPage from "./pages/GoalPage.tsx";
import ReportPage from "./pages/ReportPage.tsx";
import ExperimentsPage from "./pages/ExperimentsPage.tsx";
import Experiment from "./pages/Experiment.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import MBTITestPage from "./pages/MBTITestPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import RecordsPage from "./pages/RecordsPage.tsx";
import NotebookEntriesPage from "./pages/NotebookEntriesPage.tsx";
import DevelopmentPage from "./pages/DevelopmentPage.tsx";
import MemoirsPage from "./pages/MemoirsPage.tsx";
import VirtualFieldsPage from "./pages/VirtualFieldsPage.tsx";
import { NotFoundPage } from "./pages/NotFound.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NavigationPage from "./pages/NavigationPage.tsx";
import { DesktopApp } from "./DesktopApp.tsx";
import { DesktopRedirect } from "./components/DesktopRedirect.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <NuqsAdapter>
        <DesktopApp>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <DesktopRedirect />
                  <Landing />
                </>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/beta-test" element={<BetaTest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route
              path="/navigation"
              element={
                <ProtectedRoute>
                  <NavigationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route
              path="/graph"
              element={
                <ProtectedRoute>
                  <GraphPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/:id"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute>
                  <RecordsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/records/notebook/:notebookId"
              element={
                <ProtectedRoute>
                  <NotebookEntriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/development"
              element={
                <ProtectedRoute>
                  <DevelopmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals/:id"
              element={
                <ProtectedRoute>
                  <GoalPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiments"
              element={
                <ProtectedRoute>
                  <ExperimentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/virtual-fields"
              element={
                <ProtectedRoute>
                  <VirtualFieldsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiment/:id"
              element={
                <ProtectedRoute>
                  <Experiment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experiment"
              element={
                <ProtectedRoute>
                  <Experiment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/memoirs"
              element={
                <ProtectedRoute>
                  <MemoirsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mbti-test"
              element={
                <ProtectedRoute>
                  <MBTITestPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </DesktopApp>
      </NuqsAdapter>
    </BrowserRouter>
  </React.StrictMode>,
);
