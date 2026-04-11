import { type InputHTMLAttributes, forwardRef } from "react"

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> &{
  label?: string
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({id, placeholder, type, className, ...field}, ref)=>
    <label htmlFor = {id}>
        <input id={id} placeholder={placeholder} type={type} ref={ref} className={className} {...field} />
    </label>
)

CustomInput.displayName = 'CustomInput';
export default CustomInput;
    
