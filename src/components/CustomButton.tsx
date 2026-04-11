

export default function CustomButton({children, className, onClick, type}) {
  return (
    <button className={className} onClick={onClick} type={type}>{children}</button>
  )
}
