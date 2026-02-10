import { useCreateCourseEnquiry } from '@/hooks/course.hook';
import { CourseEnquirySchema } from '@/schemas/course.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui';
import TextInput from '../ui/TextInput';
import ModalWrapper from './ModalWrapper';

interface props {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const CourseEnquiryModal = ({ isOpen, onClose, courseId }: props) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(CourseEnquirySchema),
  });

  const handleClose = async () => {
    onClose();
  };

  const { mutate, isPending } = useCreateCourseEnquiry(onClose);

  const onSubmit = async () => {
    const payload = {
      ...getValues(),
      courseId,
    };
    mutate(payload);
  };

  return (
    <>
      <ModalWrapper
        title='Send Course Enquiry'
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isOpen}
        isLoading={isPending}
        btnDisabled={isPending}
      >
        <form>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
            <TextInput
              label='First Name'
              type='text'
              placeholder='Ikenna'
              {...register('firstName')}
              error={errors.firstName}
            />
            <TextInput
              label='Other Name'
              type='text'
              placeholder='Femi'
              {...register('otherName')}
              error={errors.otherName}
            />
            <TextInput
              label='Last Name'
              type='text'
              placeholder='Smith'
              {...register('lastName')}
              error={errors.lastName}
            />
          </div>
          <TextInput
            label='Email'
            type='email'
            placeholder='you@example.com'
            {...register('email')}
            error={errors.email}
          />

          <TextInput
            label='Phone Number'
            type='text'
            placeholder='23470620662'
            {...register('phone')}
            error={errors.phone}
          />
          <Textarea label='Message' placeholder='your enquiry here' {...register('message')} error={errors.message} />
        </form>
      </ModalWrapper>
    </>
  );
};

export default CourseEnquiryModal;
