import HeartIcon from '@/components/icons/heartIcon';
import { defaultUrl } from '@/constants/defaultUrl';
import { getDateDiff } from '@/libs/getDateDiff';
import TClothImage, { TClothKind } from '@/types/clothImageType';
import Image from 'next/image';
import Link from 'next/link';

type TUser = {
  id: number;
  is_superuser: boolean;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  date_joined: string;
  last_login: string;
  groups: [];
  user_permissions: [];
};
type TProduct = {
  author: TUser;
  id: number;
  images: TClothImage[];
  likes: TUser[];
  title: string;
  content: string;
  category: string;
  price: number;
  created_at: string;
};

export default async function Products() {
  const products: TProduct[] = await fetch(defaultUrl + 'api/board', { cache: 'no-store' }).then((res) => res.json());
  const onlyFittingProducts = products.map((product) => ({
    ...product,
    images: product.images.filter((img) => img.kind === 'fitting'),
  }));

  return (
    <main className=' h-full'>
      <div className='flex flex-wrap justify-between items-center gap-15 px-10'>
        {onlyFittingProducts.map((product) => (
          <Link href={`/boards/${product.id}`} key={product.id} className='mb-20'>
            <div className='relative w-[calc(100vw/2-10px-10px)] h-220 flex justify-center mb-10 rounded-4 overflow-hidden'>
              <Image
                src={product.images.length ? product.images[0].image : ''}
                alt={product.title + '에 대한 상품 이미지'}
                fill
                objectFit='cover'
              />
            </div>
            <span className='block text-16 mb-2'>{product.title}</span>
            <span className='block text-16 font-semibold mb-5'>{product.price}원</span>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <HeartIcon color='#9CA3AF' width='16' height='14' />
                <span className='text-14 text-slate-400'>{product.likes.length}</span>
              </div>
              <span className='text-14 text-gray-500'>{getDateDiff(new Date(), product.created_at)}전</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
