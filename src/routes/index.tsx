import MyCourseDetails from '@/pages/course/MyCourseDetails';
import { ComponentLoading } from '@/components/ui/LoadingSpinner';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/NotFound'));
const FaqPage = React.lazy(() => import('../pages/FaqPage'));
const NotFound = React.lazy(() => import('../pages/NotFound'));
const CourseList = React.lazy(() => import('../pages/course/CourseList'));
const CourseDetailPage = React.lazy(() => import('../pages/course/CourseDetails'));
const DashboardLayout = React.lazy(() => import('../navigation/DashboardLayout'));
const DashboardHome = React.lazy(() => import('../components/dashboard/DashboardHome'));
const Billing = React.lazy(() => import('../pages/payment/Billing'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Lessons = React.lazy(() => import('../pages/course/Lessons'));

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

      {/* Dashboard Routes */}
      <Route
        path='/dashboard'
        element={
          <LazyRoute>
            <DashboardLayout />
          </LazyRoute>
        }
      >
        {/* Dashboard Home */}
        <Route
          index
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
          path='lessons'
          element={
            <LazyRoute>
              <Lessons />
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
