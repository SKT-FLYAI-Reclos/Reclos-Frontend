import { TBeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEventType';
import { useEffect } from 'react';

export default function AndroidInstallPrompt({ event }: { event: TBeforeInstallPromptEvent }) {
  useEffect(() => {
    alert('AndroidInstallPrompt');
  }, []);
  return null;
}
