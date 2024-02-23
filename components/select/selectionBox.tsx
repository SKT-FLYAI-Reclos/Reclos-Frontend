import cls from '@/libs/cls';
import { HTMLAttributes } from 'react';

export type TSelectionBoxOption<T> = {
  label: string;
  value: T;
};

export default function SelectionBox<T>({
  value,
  options,
  onValueChange,
  ...props
}: {
  value: T;
  options: TSelectionBoxOption<T>[];
  onValueChange: (value: T) => void;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cls(
        'flex items-center border-2 border-solid border-indigo-600 overflow-hidden rounded-8',
        props.className ?? ''
      )}
    >
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onValueChange(option.value)}
          style={{ width: `${100 / options.length}%` }}
          className={cls(
            'text-16 py-10 border-0 flex justify-center items-center',
            value === option.value ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600',
            i !== 0 ? 'border-l-2 border-solid border-l-indigo-600' : ''
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
