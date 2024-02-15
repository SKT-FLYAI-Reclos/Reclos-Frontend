'use client';

import { TBeforeInstallPromptEvent } from '@/types/BeforeInstallPromptEventType';
import { useEffect, useState } from 'react';
import { isIOS, isAndroid } from 'react-device-detect';
import IosInstallPrompt from './iosInstallPrompt';
import AndroidInstallPrompt from './androidInstallPrompt';

export default function AppInstallPrompt() {
  const [androidInstallPromptEvent, setAndroidInstallPromptEvent] = useState<TBeforeInstallPromptEvent | null>(null);
  function showIOSInstallPrompt() {
    return isIOS;
  }

  function handleBeforeInstallPrompt(e: TBeforeInstallPromptEvent) {
    e.preventDefault();
    // setAndroidInstallPromptEvent(e);
    alert('handleBeforeInstallPrompt');
    e.prompt();
  }
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  if (showIOSInstallPrompt()) {
    return <IosInstallPrompt />;
  }

  // if (androidInstallPromptEvent) {
  //   return <AndroidInstallPrompt event={androidInstallPromptEvent} />;
  // }

  return null;
}
