import ProfileFillIcon from '@/components/icons/profileFillIcon';
import SettingIcon from '@/components/icons/settingIcon';
import AppLayout from '@/components/layouts/appLayout';
import NoticeIcon from '@/components/navbar/notice';
import TopNavbar from '@/components/navbar/topNavbar';
import cls from '@/libs/cls';
import { getDateDiff } from '@/libs/getDateDiff';

type TChatting = {
  id: number;
  nickname: string;
  lastChat: string;
  lastChatTime: string;
  // profileImg: string;
  unreadChatCnt: number; // 안 읽은 채팅 수
  location: string;
};

const DUMMY_CHATTINGS: TChatting[] = [
  {
    id: 1,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 0,
    location: '남가좌동',
  },
  {
    id: 2,
    nickname: '푸들',
    lastChat: '6시 이후 가능합니다',
    lastChatTime: '2023-01-15 17:00',
    unreadChatCnt: 3,
    location: '남가좌동',
  },
  {
    id: 3,
    nickname: '홍범순',
    lastChat: '저 게임하러 가야돼서 빨리 보내주세요',
    lastChatTime: '2022-03-09 15:00',
    unreadChatCnt: 2,
    location: '망원동',
  },
  {
    id: 4,
    nickname: '한도현',
    lastChat: '넵! 알겠습니다!',
    lastChatTime: '2021-06-27 12:00',
    unreadChatCnt: 0,
    location: '창천동',
  },
  {
    id: 5,
    nickname: 'Final',
    lastChat: '그쪽도 특이점을 아세요?',
    lastChatTime: '2024-01-30 17:00',
    unreadChatCnt: 1,
    location: '혜화동',
  },
  {
    id: 6,
    nickname: '차형석',
    lastChat: '나갑니다~',
    lastChatTime: '2023-11-08 09:00',
    unreadChatCnt: 0,
    location: '성산동',
  },
  {
    id: 7,
    nickname: '김지수',
    lastChat: '상품 전달은 잘 되었나요?',
    lastChatTime: '2023-11-08 11:30',
    unreadChatCnt: 1,
    location: '역삼동',
  },
  {
    id: 8,
    nickname: '박준혁',
    lastChat: '감사합니다~',
    lastChatTime: '2023-11-07 16:45',
    unreadChatCnt: 0,
    location: '서초동',
  },
  {
    id: 9,
    nickname: '이하늘',
    lastChat: '확인 부탁드립니다',
    lastChatTime: '2023-11-08 09:20',
    unreadChatCnt: 0,
    location: '가산동',
  },
  {
    id: 10,
    nickname: '최윤아',
    lastChat: '시간 언제 가능하세요?',
    lastChatTime: '2023-11-08 10:05',
    unreadChatCnt: 3,
    location: '논현동',
  },
];

export default function Chatting() {
  return (
    <AppLayout
      tnb={
        <TopNavbar
          left={<span className='text-16 font-medium'>채팅</span>}
          right={
            <div className='flex justify-center items-center gap-20'>
              <NoticeIcon width='20' height='21' unread />
              <SettingIcon />
            </div>
          }
        />
      }
      showBNB
    >
      <main className='px-20 pt-10 flex flex-col gap-20'>
        {DUMMY_CHATTINGS.sort((a, b) => new Date(b.lastChatTime).getTime() - new Date(a.lastChatTime).getTime()).map(
          (chatting) => (
            <article key={chatting.id} className='flex items-center gap-10 relative'>
              <ProfileFillIcon width='35' height='35' />
              <div className='flex flex-col justify-center'>
                <div className='flex items-center gap-5'>
                  <span className='text-14 text-black'>{chatting.nickname}</span>
                  <span className='text-12 text-gray-400'>
                    {chatting.location} · {getDateDiff(new Date(), chatting.lastChatTime)}전
                  </span>
                </div>
                <span className={cls('text-14', chatting.unreadChatCnt ? 'text-black' : 'text-gray-400')}>
                  {chatting.lastChat}
                </span>
              </div>
              {chatting.unreadChatCnt > 0 && (
                <div className='absolute right-0 top-3 w-16 h-16 flex justify-center items-center box-border bg-indigo-600 text-10 rounded-full text-white font-mono'>
                  {chatting.unreadChatCnt}
                </div>
              )}
            </article>
          )
        )}
      </main>
    </AppLayout>
  );
}
