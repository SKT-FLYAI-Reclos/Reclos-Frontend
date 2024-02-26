'use client';

import { likeBoard } from '@/apis/likeBoardApi';
import HeartIcon from '@/components/icons/heartIcon';
import { useState } from 'react';

export default function LikeBtn({ isLiked, boardId }: { isLiked: boolean; boardId: number }) {
  const [like, setLike] = useState(isLiked);
  function handleLikeBtnClick() {
    setLike((prev) => !prev); // FIXME: 좋아요 기능 api 수정 필요
    likeBoard(boardId);
  }
  return (
    <button onClick={handleLikeBtnClick}>
      <HeartIcon color='#4F46E5' width='30' height='27' fill={like ? '#4F46E5' : 'none'} />
    </button>
  );
}
