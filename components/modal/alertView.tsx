'use client';

import React from 'react';
import ModalView from './modalView';
import useAlert from '@/recoil/alert/useAlert';
import AlertAction from './alertAction';
import BackDrop from './backdrop';
import cls from '@/libs/cls';

export default function AlertView() {
  const {
    alert: {
      show,
      alertOptions: { alertViewTitle, alertViewDesc, alertActions, closeWithTouchBackdrop },
    },
    closeAlert,
  } = useAlert();

  return (
    <>
      {show && (
        <BackDrop onBackdropClick={closeWithTouchBackdrop ? closeAlert : undefined}>
          <ModalView className=' w-full max-w-500 mx-20 box-border bg-white rounded-4'>
            <div className={cls('p-16 font-semibold text-16 border-b-1 border-solid border-[#F0F0F5] text-black')}>
              {alertViewTitle}
            </div>
            {alertViewDesc && <div className='mt-15 text-14'>{alertViewDesc}</div>}
            <div className='p-16 pt-24 flex justify-end items-end gap-10'>
              {alertActions.map((action, i) => (
                <AlertAction key={i} {...action} closeAlert={closeAlert} />
              ))}
            </div>
          </ModalView>
        </BackDrop>
      )}
    </>
  );
}
