import * as React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  options: any[];
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
  helperText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder = '-- Please select --',
      disabled,
      className,
      valueKey,
      labelKey,
      helperText,
      ...props
    },
    ref
  ) => {
    const isObjectArray = () => {
      return options.length > 0 && typeof options[0] === 'object';
    };

    return (
      <div className='space-y-1'>
        {label && (
          <label htmlFor={props.id ?? props.name} className='block text-sm font-medium'>
            {label}
          </label>
        )}

        <select
          ref={ref}
          disabled={disabled}
          className={`
            w-full rounded-md border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-primary
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
            ${className ?? ''}
          `}
          {...props}
        >
          <option key='placeholder' value=''>
            {placeholder}
          </option>

          {options.map((option, index) => {
            if (isObjectArray()) {
              const value = option[valueKey as keyof typeof option];
              const label = option[labelKey as keyof typeof option];

              return (
                <option key={String(value)} value={String(value)} className='uppercase'>
                  {label?.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())}
                </option>
              );
            }

            return (
              <option key={`option-${index}`} value={String(option)}>
                {option?.toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())}
              </option>
            );
          })}
        </select>

        {error && <p className='text-sm text-red-500'>{error.message}</p>}
        {helperText && !error && <p className='text-xs text-muted-foreground'>{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'FormSelect';

export default Select;
