'use client';

import SearchIcon from '../../public/icons/search.svg';

export default function Search({ ...props }) {
  return (
    <button>
      <SearchIcon {...props} />
    </button>
  );
}
