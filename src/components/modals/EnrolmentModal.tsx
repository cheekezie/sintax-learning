import { useEnrolCourse } from '@/hooks/course.hook';
import { EnrolCourseSchema } from '@/schemas/course.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select } from '../ui';
import TextInput from '../ui/TextInput';
import ModalWrapper from './ModalWrapper';

interface props {
  isOpen: boolean;
  onClose: () => void;
  locations: any[];
  courseId: string;
  currentCohort: string;
  availability: any[];
}

const EnrolmentModal = ({ isOpen, onClose, locations, courseId, availability, currentCohort }: props) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(EnrolCourseSchema),
  });

  const handleClose = async () => {
    onClose();
  };

  const { mutate, isPending } = useEnrolCourse(onClose);

  const onSubmit = async () => {
    const payload = {
      ...getValues(),
      cohort: currentCohort, // TO-DO: Let users select from list of cohorts
      courseId,
    };
    mutate(payload);
  };

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
