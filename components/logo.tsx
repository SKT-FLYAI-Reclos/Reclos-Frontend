import cls from '@/libs/cls';

export default function Logo({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cls('text-indigo-600', props.className ?? '')}>Reclos</div>;
}
