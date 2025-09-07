'use client';

import * as React from 'react';
import {
  Checkbox as CheckboxPrimitive,
} from '@headlessui/react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

function Checkbox(props: CheckboxProps) {
  const { className, ...rest } = props;

  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      {...rest}
      className={cn(
        'peer size-5 flex items-center justify-center shrink-0 rounded-sm bg-input transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary data-[checked]:text-primary-foreground hover:scale-105 active:scale-95 transition-transform',
        className,
      )}
    >
      {({ checked }) => (
        <motion.svg
          data-slot="checkbox-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3.5"
          stroke="currentColor"
          className="size-3.5"
          initial="unchecked"
          animate={checked ? 'checked' : 'unchecked'}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            variants={{
              checked: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  duration: 0.2,
                  delay: 0.2,
                } as any,
              },
              unchecked: {
                pathLength: 0,
                opacity: 0,
                transition: {
                  duration: 0.2,
                } as any,
              },
            }}
          />
        </motion.svg>
      )}
    </CheckboxPrimitive>
  );
}

export { Checkbox, type CheckboxProps };
