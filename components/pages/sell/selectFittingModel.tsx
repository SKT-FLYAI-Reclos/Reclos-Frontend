import LoadingSpinner from '@/components/loading/loadingSpinner';
import { TFittingModel } from '@/types/sellFormType';

export default function SelectFittingModel({
  fittingModel,
  setFittingModel,
}: {
  fittingModel: TFittingModel;
  setFittingModel: (model: TFittingModel) => void;
}) {
  return (
    <div className='w-full h-70 rounded-8 bg-indigo-50 mb-20'>
      {fittingModel.status === 'loading' && (
        <div className='flex items-center justify-center gap-7 w-full h-full'>
          <LoadingSpinner width={20} height={20} />
          <span className='text-12 font-normal text-gray-500'>피팅 모델이 생성되고 있어요. 잠시만 기다려주세요...</span>
        </div>
      )}
    </div>
  );
}
