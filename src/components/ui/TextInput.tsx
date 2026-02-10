import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: LucideIcon;
}

const getInputMode = (type?: string) => {
  switch (type) {
    case 'number':
      return 'numeric';
    case 'tel':
      return 'tel';
    case 'email':
      return 'email';
    default:
      return undefined;
  }
};

const TextInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = 'text', error, icon: Icon, disabled, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === 'password';
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className='space-y-1 mb-3'>
        {label && (
          <label htmlFor={props.id ?? props.name} className='block text-sm font-medium'>
            {label}
          </label>
        )}

        <div className='relative'>
          {Icon && (
            <Icon
              className={`
                absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4
                ${disabled ? 'text-gray-400' : 'text-gray-500'}
              `}
            />
          )}

          <input
            ref={ref}
            type={resolvedType}
            inputMode={getInputMode(type)}
            disabled={disabled}
            className={`
              w-full rounded-md border px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary
              ${Icon ? 'pl-9' : ''}
              ${isPassword ? 'pr-10' : ''}
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
              ${className ?? ''}
            `}
            {...props}
          />

          {isPassword && !disabled && (
            <button
              type='button'
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
            </button>
          )}
        </div>

        {error && <p className='text-sm text-red-500'>{error.message}</p>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
