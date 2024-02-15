import AlertView from '../modal/alertView';
import BottomNavbar from '../navbar/bottomNavbar';

export default function AppLayout({ showBNB = true, children }: { showBNB?: boolean; children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <body className='font-spoqa relative min-h-screen'>
        {children}
        {showBNB && <BottomNavbar />}
        <AlertView />
      </body>
    </html>
  );
}
