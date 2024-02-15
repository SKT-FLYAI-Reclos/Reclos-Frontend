import cls from '@/libs/cls';

export type TSelectionBoxOption<T> = {
  label: string;
  value: T;
};

export default function SelectionBox<T>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: TSelectionBoxOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className='flex border-2 border-solid border-green-500 overflow-hidden rounded-4'>
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => onChange(option.value)}
          className={cls(
            'text-16 py-10 px-20 border-0',
            value === option.value ? 'bg-green-500 text-white' : 'bg-white text-green-500',
            i !== 0 ? 'border-l-2 border-solid border-l-green-500' : ''
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
