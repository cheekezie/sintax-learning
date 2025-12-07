import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { ErrorBoundary } from './components/common/ErrorBoundary';
import ModalContainer from './components/modals/ModalContainer';
import { ComponentLoading } from './components/ui/LoadingSpinner';
import {
  AuthProvider,
  GlobalErrorProvider,
  ModalProvider,
  OnboardingProvider,
  OrgProvider,
  ToastProvider,
} from './contexts';

import ReactQueryProvider from './providers/ReactQueryProvider';
import { AppRoutes } from './routes';

function App() {
  return (
    <ErrorBoundary>
      <GlobalErrorProvider>
        <Router>
          <ToastProvider>
            <ModalProvider>
              <AuthProvider>
                <OnboardingProvider>
                  <OrgProvider>
                    <ReactQueryProvider>
                      <AppRoutes />
                      <ModalContainer />
                    </ReactQueryProvider>
                  </OrgProvider>
                </OnboardingProvider>
              </AuthProvider>
            </ModalProvider>
          </ToastProvider>
        </Router>
      </GlobalErrorProvider>
    </ErrorBoundary>
  );
}

export default App;
