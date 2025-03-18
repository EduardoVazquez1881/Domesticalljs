type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props : InputProps) {
  return (
    <input className='p-3 rounded block mb-2 bg-gray-900 text-slate-300 w-full'
    {...props}
    />
  )
}

export default Input
