type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label(props : LabelProps) {
  return (
    <label className='text-slate-500 mb-2 block text-sm'
        {...props}
    />
    
  )
}

export default Label
