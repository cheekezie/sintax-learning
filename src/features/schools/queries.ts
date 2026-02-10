import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { notify } from '@/utils/alert-bridge';
import { storeCookie } from '@/utils/cookieStorage';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authslice';

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: any) => api.login(payload),
    meta: { toastError: false },
    onSuccess: (res) => {
      console.log(res);

      notify.snackbar({
        type: 'success',
        title: 'Sucessful !',
        message: 'Sign in successful',
      });

      const decoded = res.data.token;
      console.log({ decodedQfn: decoded });

      storeCookie({ key: 'AUTH_TOKEN', value: res.data.token });
      dispatch(setUser(jwtDecode(decoded)));

      // redirect to dashboard
      // navigate('/dashboard');

      // Save users login session
    },

    onError: (err: any) => {
      notify.modal({
        type: 'error',
        title: 'Request failed',
        message: err?.message ?? 'Failed to submit enquiry',
      });
    },
  });
};
