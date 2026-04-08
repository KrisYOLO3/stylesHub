

export default function CustomButton({children, className, onClick}) {
  return (
    <button className={className} type={onClick}>{onClick}</button>
  )
}
