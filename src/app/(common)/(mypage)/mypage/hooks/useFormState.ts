import { useCallback, useState } from 'react';

import { MyPageFormData, MyPageFormErrors } from './useMyPageFormTypes';
import { validateForm } from './useMyPageFormValidators';

const INITIAL_FORM_DATA: MyPageFormData = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const INITIAL_ERRORS: MyPageFormErrors = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

/**
 * 폼 데이터 및 에러 상태 관리 Hook
 * - 폼 입력 관리
 * - 유효성 검사
 * - 에러 상태 관리
 */
export function useFormState() {
  const [formData, setFormData] = useState<MyPageFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<MyPageFormErrors>(INITIAL_ERRORS);

  const handleChange = useCallback(
    (field: keyof MyPageFormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: '' }));
      }
    },
    [errors]
  );

  const updateFormData = useCallback((data: Partial<MyPageFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetPasswordFields = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      password: '',
      passwordConfirm: '',
    }));
  }, []);

  const validate = useCallback(() => {
    const { errors: newErrors, isValid } = validateForm(formData);
    setErrors(newErrors);
    return isValid;
  }, [formData]);

  return {
    formData,
    errors,
    handleChange,
    updateFormData,
    resetPasswordFields,
    validate,
  };
}
