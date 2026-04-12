import { type InputHTMLAttributes, forwardRef } from "react"

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> &{
  label?: string
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({id, placeholder, type, className, ...field}, ref)=>
    <label htmlFor = {id} className={className}>
        <input id={id} placeholder={placeholder} type={type} ref={ref}  {...field} />
    </label>
)

CustomInput.displayName = 'CustomInput';
export default CustomInput;
    
