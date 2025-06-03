export default function Logo() {
  return (
    <div className="bg-white px-4 py-5 rounded">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
          </div>
        </div>
        <div>
          <div className="text-blue-600 font-bold text-sm">The Future Grooming</div>
          <div className="text-blue-600 text-xs">School</div>
        </div>
      </div>
    </div>
  )
}
