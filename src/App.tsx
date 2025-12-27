import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { ErrorBoundary } from './components/common/ErrorBoundary';
import ModalContainer from './components/modals/ModalContainer';
import { GlobalErrorProvider, ModalProvider, OnboardingProvider, OrgProvider, ToastProvider } from './contexts';

import ReactQueryProvider from './providers/ReactQueryProvider';
import { AppRoutes } from './routes';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <ErrorBoundary>
      <GlobalErrorProvider>
        <Router>
          <ToastProvider>
            <ModalProvider>
              <AuthProvider>
                <ReactQueryProvider>
                  <AppRoutes />
                  <ModalContainer />
                </ReactQueryProvider>
              </AuthProvider>
            </ModalProvider>
          </ToastProvider>
        </Router>
      </GlobalErrorProvider>
    </ErrorBoundary>
  );
}

export default App;
