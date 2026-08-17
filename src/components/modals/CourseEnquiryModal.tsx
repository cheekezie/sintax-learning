import { useCreateCourseEnquiry } from '@/features/course/course.query';
import { getCourseEnquirySchema } from '@/schemas/course.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationSuccess, Select, Textarea } from '../ui';
import TextInput from '../ui/TextInput';
import ModalWrapper from './ModalWrapper';

interface props {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
  tracks?: string[];
}

const CourseEnquiryModal = ({ isOpen, onClose, courseId, tracks = [] }: props) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const hasTracks = tracks.length > 0;
  const schema = useMemo(() => getCourseEnquirySchema(hasTracks), [hasTracks]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleClose = async () => {
    onClose();
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    onClose();
  };

  const { mutate, isPending } = useCreateCourseEnquiry((message) => setSuccessMessage(message ?? ''));

  const onSubmit = async () => {
    const payload = {
      ...getValues(),
      courseId,
    };
    mutate(payload);
  };

  if (successMessage) {
    return (
      <RegistrationSuccess
        title='Enquiry Sent!'
        subtitle="We've received your message"
        message={successMessage}
        onClose={handleSuccessClose}
      />
    );
  }

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
          {hasTracks && (
            <Select
              label='Track'
              id='track'
              required
              options={tracks}
              placeholder='-- Please select --'
              className='mb-4'
              {...register('track')}
              error={errors.track}
            />
          )}

          <Textarea label='Message' placeholder='your enquiry here' {...register('message')} error={errors.message} />
        </form>
      </ModalWrapper>
    </>
  );
};

export default CourseEnquiryModal;
