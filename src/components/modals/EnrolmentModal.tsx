import { useEnrolCourse } from '@/features/course/course.query';
import { getEnrolCourseSchema } from '@/schemas/course.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationSuccess, Select } from '../ui';
import TextInput from '../ui/TextInput';
import ModalWrapper from './ModalWrapper';

interface props {
  isOpen: boolean;
  onClose: () => void;
  locations: any[];
  courseId: string;
  currentCohort: string;
  availability: any[];
  tracks?: string[];
}

const EnrolmentModal = ({ isOpen, onClose, locations, courseId, availability, currentCohort, tracks = [] }: props) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const hasTracks = tracks.length > 0;
  const schema = useMemo(() => getEnrolCourseSchema(hasTracks), [hasTracks]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { deliveryMode: 'online' },
  });

  const handleClose = async () => {
    onClose();
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    onClose();
  };

  const { mutate, isPending } = useEnrolCourse((message) => setSuccessMessage(message ?? ''));

  const onSubmit = async () => {
    const payload = {
      ...getValues(),
      cohort: currentCohort, // TO-DO: Let users select from list of cohorts when multiple cohorts
      courseId,
    };
    mutate(payload);
  };

  if (successMessage) {
    return (
      <RegistrationSuccess
        title='Enrollment Successful!'
        subtitle="You're all set"
        message={successMessage}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <>
      <ModalWrapper
        title='Join Course'
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        isOpen={isOpen}
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

          <Select
            label='Class Format'
            id='classFormat'
            required
            options={availability}
            placeholder='-- Please select --'
            className='mb-4'
            {...register('deliveryMode')}
            error={errors.deliveryMode}
          />

          {availability.includes('in-person') && (
            <Select
              label='Location'
              id='location'
              required
              options={locations}
              valueKey='city'
              labelKey='city'
              placeholder='-- Please select --'
              className='mb-4'
              {...register('city')}
              error={errors.city}
            />
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default EnrolmentModal;
