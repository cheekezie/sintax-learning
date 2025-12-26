import courseService from '@/services/course.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    select: (res) => res.data,
  });
}
