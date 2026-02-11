type EmptyStateProps = {
  title?: string
  description?: string
}

export const EmptyState = ({
  title = 'Нет загруженных изображений',
  description = 'Выберите или перетащите изображения для начала анализа цветов',
}: EmptyStateProps) => (
  <div className="text-center py-16 px-4">
    <div className="max-w-md mx-auto space-y-3">
      <p className="text-xl font-medium text-gray-300">{title}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </div>
)
