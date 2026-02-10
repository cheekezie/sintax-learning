import { Component, type ErrorInfo, type ReactNode } from 'react';
// import { logger } from '../../services/logger.service';
import type { ApiError } from '../../types/error.types';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const isApiError = (error: any): error is ApiError => {
  if (!error) return false;
  return error.name === 'ApiError' || typeof error.statusCode === 'number' || typeof error.code === 'number';
};

// These are “expected” failures that should be handled in UI (toasts/forms), not crash screens.
const isExpectedApiFailure = (error: any) => {
  const status = error?.statusCode ?? error?.code;
  return status === 400 || status === 401 || status === 403 || status === 404 || status === 409 || status === 422;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Always log
    if (isApiError(error)) {
      // logger.apiError('ErrorBoundary', 'RENDER', {
      //   message: error.message,
      //   stack: error.stack,
      //   componentStack: errorInfo.componentStack,
      //   statusCode: (error as any).statusCode,
      //   code: (error as any).code,
      //   endpoint: (error as any).endpoint,
      //   method: (error as any).method,
      // });
    } else {
      // logger.error('ErrorBoundary caught a render error', error, {
      //   componentStack: errorInfo.componentStack,
      // });
    }

    this.props.onError?.(error, errorInfo);

    /**
     * Important:
     * If an API error was thrown during render (usually because someone did `throw error`),
     * don't show the crash screen for expected API failures. Let the app continue and handle
     * it via UI (snackbar / inline errors).
     */
    if (isApiError(error) && isExpectedApiFailure(error)) {
      // Prevent the crash UI from rendering.
      // (This is a safety net; the better fix is to stop throwing API errors in render.)
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.props.fallback) return this.props.fallback;

    // Dev logging (optional)
    if (import.meta.env.DEV && this.state.error) {
    }

    return (
      <div className='min-h-screen bg-white flex items-center justify-center p-4'>
        <div className='bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center'>
          <div className='mb-6'>
            <svg
              className='w-16 h-16 mx-auto text-primary'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z'
              />
            </svg>
          </div>

          <h1 className='text-2xl font-bold text-gray-800 mb-2'>Oops! Something went wrong</h1>

          <p className='text-gray-600 mb-6'>Don't worry, it's not your fault. Please try again.</p>

          <div className='flex flex-col lg:flex-row gap-5 justify-center'>
            <button
              onClick={this.handleReset}
              className='w-full lg:w-auto bg-primary text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-out hover:bg-primary/90 active:translate-y-px'
              type='button'
            >
              Try Again
            </button>
          </div>

          <div className='mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500'>
            <p>
              If this persists, contact{' '}
              <a href='mailto:support@saukipay.net' className='text-primary hover:underline'>
                support@saukipay.net
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
