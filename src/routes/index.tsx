import { ComponentLoading } from '@/components/ui/LoadingSpinner';
import MyCourseDetails from '@/features/course/pages/MyCourseDetails';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../features/Home'));
const Login = React.lazy(() => import('../features/auth/Login'));
const FaqPage = React.lazy(() => import('../features/FaqPage'));
const NotFound = React.lazy(() => import('../features/NotFound'));
const CourseList = React.lazy(() => import('../features/course/pages/CourseList'));
const CourseDetailPage = React.lazy(() => import('../features/course/pages/CourseDetails'));
const DashboardLayout = React.lazy(() => import('../navigation/DashboardLayout'));
const DashboardHome = React.lazy(() => import('../features/dashboard/DashboardHome'));
const Billing = React.lazy(() => import('../features/payment/Billing'));
const Profile = React.lazy(() => import('../features/Profile'));
const Lessons = React.lazy(() => import('../features/course/pages/Lessons'));
const MyCourseDatail = React.lazy(() => import('../features/course/pages/MyCourseDetails'));

// Business Pages
const Business = React.lazy(() => import('../features/business/BusinessTraining'));

// Instructor
const BecomeInstructor = React.lazy(() => import('../features/instructor/BecomeInstructor'));

// Helper component to wrap lazy components with Suspense
const LazyRoute = ({ children }: { children: React.ReactElement }) => (
  <React.Suspense fallback={<ComponentLoading size='lg' fullScreen={true} />}>{children}</React.Suspense>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <LazyRoute>
            <Home />
          </LazyRoute>
        }
      />

      <Route
        path='/login'
        element={
          <LazyRoute>
            <Login />
          </LazyRoute>
        }
      />
      <Route
        path='/courses'
        element={
          <LazyRoute>
            <CourseList />
          </LazyRoute>
        }
      />

      <Route
        path='/course/:id'
        element={
          <LazyRoute>
            <CourseDetailPage />
          </LazyRoute>
        }
      />

      <Route
        path='/faq'
        element={
          <LazyRoute>
            <FaqPage />
          </LazyRoute>
        }
      />

      <Route
        path='/business'
        element={
          <LazyRoute>
            <Business />
          </LazyRoute>
        }
      />

      <Route
        path='/instructor'
        element={
          <LazyRoute>
            <BecomeInstructor />
          </LazyRoute>
        }
      />

      {/* Dashboard Routes */}
      <Route
        element={
          <LazyRoute>
            <DashboardLayout />
          </LazyRoute>
        }
      >
        {/* <Route index element={<Navigate to='my-courses' replace />} /> */}

        {/* Dashboard Home  / My courses*/}
        <Route
          path='my-courses'
          element={
            <LazyRoute>
              <DashboardHome />
            </LazyRoute>
          }
        />
        <Route
          path='billing'
          element={
            <LazyRoute>
              <Billing />
            </LazyRoute>
          }
        />
        <Route
          path='profile'
          element={
            <LazyRoute>
              <Profile />
            </LazyRoute>
          }
        />
        <Route
          path='my-courses/lessons'
          element={
            <LazyRoute>
              <Lessons />
            </LazyRoute>
          }
        />
        <Route
          path='my-courses/:id'
          element={
            <LazyRoute>
              <MyCourseDatail />
            </LazyRoute>
          }
        />
        <Route
          path='course/:id'
          element={
            <LazyRoute>
              <MyCourseDetails />
            </LazyRoute>
          }
        />
      </Route>

      {/* Catch-all for other Wildcard routes */}
      <Route
        path='*'
        element={
          <LazyRoute>
            <NotFound />
          </LazyRoute>
        }
      />
    </Routes>
  );
};
