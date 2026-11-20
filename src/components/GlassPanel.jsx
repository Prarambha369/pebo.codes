export default function GlassPanel({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`glass-panel ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
