import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'btn inline-flex items-center justify-center rounded-full text-sm font-medium focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-400 text-black hover:bg-primary-500 ',
        secondary: 'bg-tertiary-400 text-black hover:bg-tertiary-500',
      },
      size: {
        medium: 'h-10 py-4 px-6',
        small: 'h-9 px-2 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
