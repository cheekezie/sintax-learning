import { useState, useCallback, useMemo } from 'react';
import type { ObjectSchema } from 'joi';

interface FormData {
  [key: string]: unknown;
}

interface ValidationErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

interface UseFormValidationReturn {
  formData: FormData;
  errors: ValidationErrors;
  touched: TouchedFields;
  isValid: boolean;
  updateField: (field: string, value: unknown) => void;
  updateFieldWithValidation: (field: string, value: unknown, schema: ObjectSchema) => void;
  handleBlur: (field: string, schema: ObjectSchema) => void;
  validateField: (field: string, schema: ObjectSchema) => void;
  validateForm: (schema: ObjectSchema) => boolean;
  clearErrors: () => void;
  clearTouched: () => void;
  setFormData: (data: FormData) => void;
  setTouched: (field: string) => void;
}

export const useFormValidation = (initialData: FormData = {}): UseFormValidationReturn => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [allErrors, setAllErrors] = useState<ValidationErrors>({});
  const [touched, setTouchedState] = useState<TouchedFields>({});
  const [lastSchema, setLastSchema] = useState<ObjectSchema | null>(null);
  const errors = useMemo(() => {
    const visibleErrors: ValidationErrors = {};
    Object.keys(allErrors).forEach((key) => {
      if (touched[key]) {
        visibleErrors[key] = allErrors[key];
      }
    });
    return visibleErrors;
  }, [allErrors, touched]);

  const updateField = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateFieldWithValidation = useCallback(
    (field: string, value: unknown, schema: ObjectSchema) => {
      setLastSchema(schema);

      setFormData((prev) => {
        const updated = { ...prev, [field]: value };

        if (touched[field]) {
          const { error } = schema.validate(updated, { abortEarly: false });

          setAllErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (error) {
              error.details.forEach((detail) => {
                const fieldPath = detail.path[0] as string;
                newErrors[fieldPath] = detail.message;
              });
              Object.keys(newErrors).forEach((key) => {
                if (!error.details.some((detail) => detail.path[0] === key)) {
                  delete newErrors[key];
                }
              });
            } else {
              delete newErrors[field];
            }
            return newErrors;
          });
        }

        return updated;
      });
    },
    [touched]
  );

  const handleBlur = useCallback(
    (field: string, schema: ObjectSchema) => {
      setLastSchema(schema);
      setTouchedState((prev) => ({ ...prev, [field]: true }));
      const { error } = schema.validate(formData, { abortEarly: false });

      setAllErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          const fieldError = error.details.find((detail) => detail.path[0] === field);
          if (fieldError) {
            newErrors[field] = fieldError.message;
          } else {
            delete newErrors[field];
          }
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });
    },
    [formData]
  );

  const validateField = useCallback(
    (field: string, schema: ObjectSchema) => {
      setTouchedState((prev) => ({ ...prev, [field]: true }));

      const { error } = schema.validate(formData, { abortEarly: false });

      setAllErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          const fieldError = error.details.find((detail) => detail.path[0] === field);
          if (fieldError) {
            newErrors[field] = fieldError.message;
          } else {
            delete newErrors[field];
          }
        } else {
          delete newErrors[field];
        }
        return newErrors;
      });

      return !error || !error.details.some((detail) => detail.path[0] === field);
    },
    [formData]
  );

  const validateForm = useCallback(
    (schema: ObjectSchema): boolean => {
      setLastSchema(schema);

      setTouchedState((prev) => {
        const newTouched: TouchedFields = {};
        Object.keys(formData).forEach((key) => {
          newTouched[key] = true;
        });
        return { ...prev, ...newTouched };
      });

      const { error } = schema.validate(formData, { abortEarly: false });

      if (error) {
        const newErrors: ValidationErrors = {};
        error.details.forEach((detail) => {
          const field = detail.path[0] as string;
          newErrors[field] = detail.message;
        });
        setAllErrors(newErrors);
        return false;
      }

      setAllErrors({});
      return true;
    },
    [formData]
  );

  const clearErrors = useCallback(() => {
    setAllErrors({});
  }, []);

  const clearTouched = useCallback(() => {
    setTouchedState({});
  }, []);

  const setTouched = useCallback((field: string) => {
    setTouchedState((prev) => ({ ...prev, [field]: true }));
  }, []);

  const isValid = useMemo((): boolean => {
    if (Object.keys(allErrors).length > 0) {
      return false;
    }

    if (lastSchema) {
      const { error } = lastSchema.validate(formData, { abortEarly: false });
      return !error;
    }

    return true;
  }, [formData, allErrors, lastSchema]);

  return {
    formData,
    errors,
    touched,
    isValid,
    updateField,
    updateFieldWithValidation,
    handleBlur,
    validateField,
    validateForm,
    clearErrors,
    clearTouched,
    setFormData,
    setTouched,
  };
};
