import { TBeforeInstallPromptEvent } from './BeforeInstallPromptEventType';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: TBeforeInstallPromptEvent;
  }
}
