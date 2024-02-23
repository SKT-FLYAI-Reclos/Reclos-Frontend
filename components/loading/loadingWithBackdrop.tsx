import BackDrop from '../modal/backdrop';
import LoadingSpinner from './loadingSpinner';

export default function LoadingWithBackdrop({ title = 'Loading...' }: { title?: string }) {
  return (
    <BackDrop>
      <div className='flex justify-center items-center gap-10'>
        <LoadingSpinner width={40} height={40} />
        <span className='text-white text-16'>{title}</span>
      </div>
    </BackDrop>
  );
}
