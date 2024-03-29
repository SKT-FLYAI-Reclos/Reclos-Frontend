'use client';

import IHeartIcon from '../../public/icons/heart.svg';

export default function HeartIcon({ ...props }) {
  return <IHeartIcon {...props} fill={props.fill ?? 'none'} />;
}
