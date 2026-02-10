import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { ErrorBoundary } from './components/common/ErrorBoundary';
import ModalContainer from './components/modals/ModalContainer';
import { GlobalErrorProvider, ModalProvider, OnboardingProvider, OrgProvider, ToastProvider } from './contexts';

import ReactQueryProvider from './providers/ReactQueryProvider';
import { AppRoutes } from './routes';
import { AuthProvider } from './contexts/AuthProvider';
import { AlertProvider } from './contexts/AlertProvider';
import { AlertBridge } from './utils/alert-bridge';

function App() {
  return (
    <ErrorBoundary>
      <GlobalErrorProvider>
        <Router>
          <AlertProvider>
            <AlertBridge />
            <ModalProvider>
              <AuthProvider>
                <ReactQueryProvider>
                  <AppRoutes />
                  <ModalContainer />
                </ReactQueryProvider>
              </AuthProvider>
            </ModalProvider>
          </AlertProvider>
        </Router>
      </GlobalErrorProvider>
    </ErrorBoundary>
  );
}

export default App;
