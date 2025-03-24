type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props : ButtonProps) {
  return (
    <button className='p-3 bg-red-950 border border-rose-950 w-full text-white rounded mt-4 hover:bg-rose-800 transition-all'
    {...props}
    />
  )
}

export default Button