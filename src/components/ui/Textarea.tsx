import * as React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    return (
      <div className='space-y-1 mb-3'>
        {label && (
          <label htmlFor={props.id ?? props.name} className='block text-sm font-medium'>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          className={`
          w-full rounded-md border px-4 py-3 text-sm resize-none
          focus:outline-none focus:ring-2 focus:ring-primary
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
          ${className ?? ''}
        `}
          {...props}
        />

        {error && <p className='text-sm text-red-500'>{error.message}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
