import KakaoChatIcon from '../public/icons/kakao_chat.svg';

export default function KakaoLoginBtn({ ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='bg-[#FEE500] relative flex justify-center items-center w-300 py-20 rounded-12 text-16 font-normal'
      {...props}
    >
      <KakaoChatIcon className=' absolute left-20' />
      카카오로 시작하기
    </button>
  );
}
