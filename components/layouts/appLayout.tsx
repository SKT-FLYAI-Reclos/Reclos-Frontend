import cls from '@/libs/cls';
import AppInstallPrompt from '../appInstallPrompt/appInstallPrompt';
import AlertView from '../modal/alertView';
import BottomNavbar from '../navbar/bottomNavbar';

export default function AppLayout({
  tnb = null,
  showBNB = true,
  children,
}: {
  tnb?: React.ReactNode | null;
  showBNB?: boolean;
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={'font-spoqa relative min-h-screen'}>
        {tnb}
        <div className={cls(tnb ? 'pt-64' : '', showBNB ? 'pb-60' : '')}>
          {children}
          {showBNB && <BottomNavbar />}
          <AlertView />
          <AppInstallPrompt />
        </div>
      </body>
    </html>
  );
}
