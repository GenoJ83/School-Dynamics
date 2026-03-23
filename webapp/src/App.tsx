import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ParentAuthProvider } from './context/ParentAuthContext'
import { SchoolDataProvider } from './context/SchoolDataContext'
import { AppShell } from './components/AppShell'
import { ParentShell } from './components/ParentShell'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProtectedParentRoute } from './components/ProtectedParentRoute'
import { Login } from './pages/Login'
import { DashboardHome } from './pages/DashboardHome'
import { Students } from './pages/Students'
import { StudentDetail } from './pages/StudentDetail'
import { Fees } from './pages/Fees'
import { Attendance } from './pages/Attendance'
import { Exams } from './pages/Exams'
import { Messages } from './pages/Messages'
import { Settings } from './pages/Settings'
import { ParentLogin } from './pages/parent/ParentLogin'
import { ParentHome } from './pages/parent/ParentHome'
import { ParentFees } from './pages/parent/ParentFees'
import { ParentAttendance } from './pages/parent/ParentAttendance'
import { ParentGrades } from './pages/parent/ParentGrades'
import { LandingPage } from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <SchoolDataProvider>
        <ParentAuthProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/parents/login" element={<ParentLogin />} />
              <Route
                path="/parents"
                element={
                  <ProtectedParentRoute>
                    <ParentShell />
                  </ProtectedParentRoute>
                }
              >
                <Route index element={<Navigate to="/parents/home" replace />} />
                <Route path="home" element={<ParentHome />} />
                <Route path="fees" element={<ParentFees />} />
                <Route path="attendance" element={<ParentAttendance />} />
                <Route path="grades" element={<ParentGrades />} />
                <Route path="*" element={<Navigate to="/parents/home" replace />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppShell />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="students" element={<Students />} />
                <Route path="students/:id" element={<StudentDetail />} />
                <Route path="fees" element={<Fees />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="exams" element={<Exams />} />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </ParentAuthProvider>
      </SchoolDataProvider>
    </BrowserRouter>
  )
}
