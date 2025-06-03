export default function NotificationBadge({ Icon, count, color }) {
  return (
    <div className="relative">
      <Icon className="w-6 h-6" />
      <span
        className={`absolute -top-2 -right-2 ${color} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}
      >
        {count}
      </span>
    </div>
  )
}
