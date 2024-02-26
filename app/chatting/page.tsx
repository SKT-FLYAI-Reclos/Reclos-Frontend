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
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 2,
    location: '망원동',
  },
  {
    id: 4,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 0,
    location: '망원동',
  },
  {
    id: 5,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 0,
    location: '망원동',
  },
  {
    id: 6,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 6,
    location: '망원동',
  },
  {
    id: 7,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 0,
    location: '망원동',
  },
  {
    id: 8,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 0,
    location: '망원동',
  },
  {
    id: 9,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 1,
    location: '망원동',
  },
  {
    id: 10,
    nickname: '멈미',
    lastChat: '아아 넵',
    lastChatTime: '2023-12-15 14:00',
    unreadChatCnt: 4,
    location: '망원동',
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
        {DUMMY_CHATTINGS.map((chatting) => (
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
        ))}
      </main>
    </AppLayout>
  );
}
