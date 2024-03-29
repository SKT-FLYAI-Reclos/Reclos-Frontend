'use client';

import { SetStateAction, useRef } from 'react';
import Image from 'next/image';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import useSelectImagesTool from '@/hooks/useSelectImagesTool';
import cls from '@/libs/cls';
import { TFittingModel, TSellForm } from '@/types/sellFormType';
import TopNavbar from '../../navbar/topNavbar';
import PrevBtn from '../../navbar/prevBtn';
import SelectFittingModel from './selectFittingModel';
import SelectImagesTool from '@/components/utils/selectImagesTool';
import PhotoAddIcon from '../../../public/icons/photo--add.svg';
import { useMutation } from '@tanstack/react-query';
import uploadSellForm from '@/apis/uploadSellForm';
import { useRouter } from 'next/navigation';
import useAlert from '@/recoil/alert/useAlert';
import LoadingWithBackdrop from '@/components/loading/loadingWithBackdrop';

const MAX_ORIGINAL_IMG_COUNT = 5; // 원본 옷 사진 최대 개수

export default function Write({
  sellForm,
  setSellForm,
  toPrev,
  retryGenFittingModel,
}: {
  sellForm: TSellForm;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
  toPrev: () => void;
  retryGenFittingModel: () => void;
}) {
  const {
    config: OriginalImgToolConfig,
    selectedImgs: selectedOriginalImgs,
    mode: OriginalImgToolMode,
    changeMode: OriginalImgToolChangeMode,
  } = useSelectImagesTool(MAX_ORIGINAL_IMG_COUNT, sellForm.originalClothImgs || [], 1);

  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const uploadSellFormMutation = useMutation({ mutationFn: uploadSellForm });
  const router = useRouter();
  const { showAlert } = useAlert();

  function handleSubmit() {
    const selectedFittingModels = sellForm.fittingModel.images.filter((_, i) =>
      sellForm.fittingModel.selectedIdx.includes(i)
    );
    const title = titleRef.current?.value?.trim();
    const price = priceRef.current?.value?.trim();
    const description = descriptionRef.current?.value?.trim();

    if (Number.isNaN(Number(price))) {
      alert('가격은 숫자로 입력해주세요.');
      return;
    }

    if (selectedFittingModels.length === 0) {
      alert('피팅 모델을 선택해주세요.');
      return;
    }

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!price) {
      alert('가격을 입력해주세요.');
      return;
    }

    if (!description) {
      alert('설명을 입력해주세요.');
      return;
    }
    const form: TSellForm = {
      gender: sellForm.gender,
      size: sellForm.size,
      title,
      price: Number(price),
      description,
      originalClothImgs: selectedOriginalImgs,
      correctedCloth: sellForm.correctedCloth,
      fittingModel: { ...sellForm.fittingModel, images: selectedFittingModels },
    };

    uploadSellFormMutation.mutate(form, {
      onSuccess: ({ data: { id } }) => {
        console.log(id);
        showAlert({
          alertViewTitle: '게시글이 성공적으로 업로드되었습니다.',
          alertActions: [
            {
              title: '확인',
              style: 'primary',
              handler: () => router.push(`/boards/${id}`),
            },
          ],
        });
      },
      onError: (err) => {
        alert(err);
      },
    });
  }
  return (
    <>
      {uploadSellFormMutation.isPending && <LoadingWithBackdrop title='게시글 업로드 중..' />}
      <TopNavbar left={<PrevBtn onClick={toPrev} />} title='판매글 작성하기' showBorder={false} />
      <main className='h-[calc(100vh-64px)] pt-84 px-10 overflow-y-scroll'>
        <SelectFittingModel retryGenFittingModel={retryGenFittingModel} sellForm={sellForm} setSellForm={setSellForm} />

        {/* 원본 사진 & 상품 사진 */}
        <section className='flex gap-10 mb-20'>
          <div className='grow max-w-[calc(100%-100px-10px)]'>
            <div className='flex items-center mb-10'>
              <h4 className='text-16 text-black font-medium mr-5'>원본 사진</h4>
              <div className='px-5 py-2 mr-10 font-normal text-12 text-indigo-600 bg-indigo-50 rounded-4'>
                {selectedOriginalImgs.length}/{MAX_ORIGINAL_IMG_COUNT}
              </div>
              {selectedOriginalImgs.length > 0 && (
                <>
                  <button
                    onClick={() => OriginalImgToolChangeMode('add')}
                    disabled={
                      OriginalImgToolMode === 'delete' || selectedOriginalImgs.length === MAX_ORIGINAL_IMG_COUNT
                    }
                    className={
                      'mr-5 text-12 text-indigo-600 font-medium px-5 py-2 border-1 border-solid border-indigo-600 rounded-4 disabled:opacity-30'
                    }
                  >
                    추가하기
                  </button>
                  <button
                    onClick={() => OriginalImgToolChangeMode(OriginalImgToolMode === 'delete' ? 'normal' : 'delete')}
                    className={cls(
                      'mr-5 text-12 font-medium px-5 py-2 border-1 border-solid border-indigo-600 rounded-4',
                      OriginalImgToolMode === 'delete' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
                    )}
                  >
                    {OriginalImgToolMode === 'delete' ? '완료' : '편집'}
                  </button>
                </>
              )}
            </div>
            <SelectImagesTool
              {...OriginalImgToolConfig}
              maxLength={MAX_ORIGINAL_IMG_COUNT}
              className=' bg-indigo-50 h-80 rounded-8'
              placeHolder={
                <div className='flex items-center gap-10'>
                  <PhotoAddIcon />
                  <span className='text-14 text-gray-500'>여기를 눌러서 상의를 선택해주세요.</span>
                </div>
              }
              imgWidth={60}
              imgHeight={60}
              displayMode='xflex'
            />
          </div>
          <div className='shrink-0 basis-100 w-100'>
            <span className='text-16 font-medium text-black block mb-10'>상품 사진</span>
            <div className='w-80 h-80 bg-indigo-50 rounded-8 flex justify-center items-center'>
              <div className='relative w-80 h-80 rounded-8 overflow-hidden'>
                <Image src={sellForm.correctedCloth.image!} alt='상품 사진' objectFit='contain' fill />
              </div>
            </div>
          </div>
        </section>

        {/* 제목 */}
        <h4 className='text-16 text-black font-medium mb-5'>제목</h4>
        <input
          autoComplete='off'
          spellCheck={false}
          ref={titleRef}
          type='text'
          placeholder='제목을 입력해주세요.'
          className='mb-20 bg-indigo-50 rounded-8 text-14 text-gray-600 w-full p-10 outline-1 outline-solid outline-indigo-400'
        />
        {/* 가격 */}
        <h4 className='text-16 text-black font-medium mb-5'>가격(원)</h4>
        <input
          autoComplete='off'
          spellCheck={false}
          ref={priceRef}
          type='number'
          placeholder='가격을 입력해주세요.'
          className='mb-20 bg-indigo-50 rounded-8 text-14 text-gray-600 w-full p-10 outline-1 outline-solid outline-indigo-400'
        />
        {/* 자세한 설명 */}
        <h4 className='text-16 text-black font-medium mb-5'>자세한 설명</h4>
        <TextareaAutosize
          autoComplete='off'
          spellCheck={false}
          ref={descriptionRef}
          minRows={4}
          placeholder='자세한 설명을 입력해주세요. ex) 스탠다드하면서 간결한 핏의 니트입니다.
          편안하고 부드러운 착용감으로 데일리룩으로 활용하기 좋습니다.
          여유로운 실루엣과 기본 베이지 컬러로 어떤 하의와도 잘 어울립니다.
          사이즈가 맞지 않아서 중고로 내놓게 되었습니다.
          1번밖에 입지 않은 새 옷 같은 상품입니다.'
          className='bg-indigo-50 rounded-8 text-14 text-gray-600 w-full p-10 outline-1 outline-solid outline-indigo-400 resize-none'
        />

        <button
          onClick={handleSubmit}
          disabled={sellForm.fittingModel.selectedIdx.length === 0 || uploadSellFormMutation.isPending}
          className='fixed bottom-10 left-20 w-[calc(100vw-40px)] bg-indigo-600 rounded-8 text-16 text-white py-10 flex justify-center items-center disabled:opacity-50'
        >
          {uploadSellFormMutation.isPending ? '업로드 중...' : '작성 완료'}
        </button>
      </main>
    </>
  );
}
