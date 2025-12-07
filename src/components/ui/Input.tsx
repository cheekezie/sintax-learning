import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { InputProps } from '../../interface';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  icon: Icon,
  maxLength,
  required = false,
  disabled = false,
  error,
  helperText,
  className = '',
  touched,
  autoComplete,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (type === 'tel') {
      newValue = formatPhoneInput(newValue);
    }

    if (type === 'password' && (name === 'password' || name === 'pin' || name === 'confirmPin')) {
      newValue = formatNumericInput(newValue);
    }

    onChange(newValue);
  };

  const formatPhoneInput = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    return digits.substring(0, 11);
  };

  const formatNumericInput = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    return digits.substring(0, 6);
  };

  // Enhanced security for password fields
  const getPasswordFieldType = () => {
    if (type !== 'password') return type;

    // Always mask password fields when not actively viewing
    if (showPassword) return 'text';

    // For PIN fields, consider showing the type as "text" with inputMode="numeric"
    // to allow better password manager integration while maintaining security
    if (name === 'pin' || name === 'confirmPin') {
      return 'text'; // Use text type with inputMode=numeric for better UX
    }

    return 'password';
  };

  // Better autocomplete hints for password managers
  const getAutoComplete = () => {
    if (autoComplete) return autoComplete;

    // Provide better hints for password managers
    if (name === 'phoneNumber' || name === 'phone') return 'username';
    if (name === 'pin' && type === 'password') return 'current-password';
    if (name === 'password') return 'current-password';
    if (name === 'newPassword' || name === 'confirmPassword') return 'new-password';

    return undefined;
  };

  // Better input mode for different field types
  const getInputMode = () => {
    if (type === 'tel') return 'tel';
    if (type === 'password' && (name === 'password' || name === 'pin' || name === 'confirmPin')) {
      return 'numeric';
    }
    return undefined;
  };

  const isPasswordField = type === 'password';
  const isPinField = name === 'pin' || name === 'confirmPin';
  const displayType = getPasswordFieldType();
  const enhancedAutoComplete = getAutoComplete();
  const enhancedInputMode = getInputMode();

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={name} className='block text-sm font-medium text-foreground'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div className='relative'>
        <input
          id={name}
          name={name}
          type={displayType}
          value={value}
          onChange={handleChange}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={(e) => {
            setIsFocused(true);
            if (!isPasswordField) {
              e.target.removeAttribute('readonly');
            }
          }}
          placeholder={placeholder}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          autoComplete={enhancedAutoComplete}
          inputMode={enhancedInputMode}
          // Security enhancement: prevent autofill on non-password fields
          readOnly={isPasswordField ? undefined : false}
          className={`
            w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary
            ${Icon ? 'pl-12' : 'pl-4'}
            ${isPasswordField ? 'pr-12' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : isFocused ? 'border-primary' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            ${isPinField ? 'tracking-widest font-mono' : ''}
          `}
          // Additional security attributes for password fields
          {...(isPasswordField
            ? {
                'data-lpignore': isPinField ? 'true' : undefined, // LastPass ignore for PINs
                'data-1p-ignore': isPinField ? 'true' : undefined, // 1Password ignore for PINs
              }
            : {})}
        />

        {Icon && (
          <Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none' />
        )}

        {isPasswordField && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            // Prevent form submission when toggling password visibility
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowPassword(!showPassword);
              }
            }}
          >
            {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
          </button>
        )}
      </div>

      {error && touched && <p className='text-red-500 text-sm flex items-center gap-1'>{error}</p>}

      {helperText && !error && <p className='text-xs text-muted-foreground'>{helperText}</p>}
    </div>
  );
};

export default Input;
