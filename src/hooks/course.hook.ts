import courseService from '@/services/course.service';
import { formatDuration } from '@/utils/dateFormatter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from './alert.hook';
import type { CourseEnquiryPayloadI } from '@/interface';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: courseService.getCoursePublic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course'] });
    },
  });
};

export function useCoursePublic() {
  return useQuery({
    queryKey: ['course'],
    queryFn: () => courseService.getCoursePublic(),
    select: (res) => {
      return {
        ...res.data,
        courses: res.data.courses.map((course) => ({
          ...course,
          duration: formatDuration(course.cohortStartDate, course.cohortEndDate),
          units: course.curriculum.length,
          totalLessons: course.curriculum.reduce((total, section) => total + (section.outline?.length || 0), 0),
        })),
      };
    },
  });
}

export function useCourseDetail(courseId: string) {
  const { data, isLoading, isFetching, isError, error } = useCoursePublic();

  const course = useMemo(() => {
    if (!data?.courses) return null;
    return data.courses.find((c) => c._id === courseId) ?? null;
  }, [data, courseId]);

  return {
    course,
    cohorts: data?.cohorts,
    nextCohort: data?.nextCohort,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

export function useCreateCourseEnquiry(onSuccessClose?: () => void) {
  const { modalAlert, snackbar } = useAlert();

  return useMutation({
    mutationFn: (payload: CourseEnquiryPayloadI) => courseService.createEnquiry(payload),

    onSuccess: (res) => {
      modalAlert({
        type: 'success',
        message: res.message,
      });

      onSuccessClose?.(); // ✅ close modal
    },

    onError: (err: any) => {
      snackbar({
        type: 'error',
        title: 'Request failed',
        message: err?.message ?? 'Failed to submit enquiry',
      });
    },
  });
}

export function useEnrolCourse(onSuccessClose?: () => void) {
  const navigate = useNavigate();
  const { modalAlert, snackbar } = useAlert();

  return useMutation({
    mutationFn: (payload: any) => courseService.enrolCourse(payload),

    onSuccess: (res) => {
      modalAlert({
        type: 'success',
        message: res.message,
      });

      onSuccessClose?.(); // ✅ close modal

      // redirect to billing
      navigate('/billing', {
        replace: true,
      });

      // Save users login session
    },

    onError: (err: any) => {
      snackbar({
        type: 'error',
        title: 'Request failed',
        message: err?.message ?? 'Failed to submit enquiry',
      });
    },
  });
}
