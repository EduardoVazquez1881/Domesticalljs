type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props : ButtonProps) {
  return (
    <button className='p-3 bg-blue-600 w-full text-white rounded mt-2'
    {...props}
    />
  )
}

export default Button