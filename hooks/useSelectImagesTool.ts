import useAlert from '@/recoil/alert/useAlert';
import { useState } from 'react';

type TMode = 'normal' | 'add' | 'delete';

export default function useSelectImagesTool(maxLength: number) {
  const [selectedImgs, setSelectedImgs] = useState<File[]>([]);
  const [mode, setMode] = useState<TMode>('normal');

  const { showAlert } = useAlert();

  function changeMode(mode: TMode) {
    switch (mode) {
      case 'normal':
        setMode('normal');
        break;
      case 'add':
        if (selectedImgs.length >= maxLength) {
          showAlert({
            alertViewTitle: `최대 ${maxLength}개까지만 선택할 수 있습니다.`,
            alertActions: [{ title: '확인', style: 'primary', handler: null }],
          });
          return;
        }
        setMode('add');
        break;
      case 'delete':
        if (selectedImgs.length === 0) {
          showAlert({
            alertViewTitle: `삭제할 이미지가 없습니다.`,
            alertActions: [{ title: '확인', style: 'primary', handler: null }],
          });
          return;
        }
        setMode('delete');
        break;
    }
  }

  return { config: { selectedImgs, setSelectedImgs, setMode, mode }, selectedImgs, mode, changeMode };
}
