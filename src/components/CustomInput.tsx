import { type InputHTMLAttributes, forwardRef } from "react"

type CustomInputProps = InputHTMLAttributes<HTMLInputElement> &{
  label?: string
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({id, placeholder, type, label, ...field}, ref)=>
    <label htmlFor = {label}>
        <input id={id} placeholder={placeholder} type={type} ref={ref} {...field}/>
    </label>
)

CustomInput.displayName = 'CustomInput';
export default CustomInput;
    
