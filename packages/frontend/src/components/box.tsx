import { cn } from '../lib/tailwind-util';

export interface BoxProps {
  className?: string;
  children?: React.ReactNode;
  label?: string;
}

export function Box(props: BoxProps) {
  return (
    <div
      className={cn([
        'relative p-4 border-[6px] border-double border-primary/60 bg-material',
        props.className,
      ])}
    >
      {props.label && (
        <div className="bg-material text-primary px-1 w-fit absolute -top-3 left-2 text-sm h-4 flex justify-center items-center">
          {props.label}
        </div>
      )}
      {props.children}
    </div>
  );
}
