import { ComponentLoading } from '@/components/ui/LoadingSpinner';
import MyCourseDetails from '@/pages/course/MyCourseDetails';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));
const Login = React.lazy(() => import('../pages/auth/Login'));
const FaqPage = React.lazy(() => import('../pages/FaqPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const CourseList = React.lazy(() => import('../pages/course/CourseList'));
const CourseDetailPage = React.lazy(() => import('../pages/course/CourseDetails'));
const DashboardLayout = React.lazy(() => import('../navigation/DashboardLayout'));
const DashboardHome = React.lazy(() => import('../pages/dashboard/DashboardHome'));
const Billing = React.lazy(() => import('../pages/payment/Billing'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Lessons = React.lazy(() => import('../pages/course/Lessons'));
const MyCourseDatail = React.lazy(() => import('../pages/course/MyCourseDetails'));

// Business Pages
const Business = React.lazy(() => import('../pages/business/BusinessTraining'));

// Instructor
const BecomeInstructor = React.lazy(() => import('../pages/instructor/BecomeInstructor'));

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
