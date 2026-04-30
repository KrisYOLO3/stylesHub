import { type ReactNode } from 'react'

type CustomBtnProps = {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CustomButton({children, className, onClick, type, disabled}: CustomBtnProps) {
  return (
    <button className={className} onClick={onClick} type={type} disabled={disabled}>{children}</button>
  )
}
