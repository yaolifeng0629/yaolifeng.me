import { format, formatDistance, roundToNearestMinutes } from 'date-fns'

export function RelativeDate({ date }: { date: string }) {
  return (
    <span
      title={format(roundToNearestMinutes(new Date(date)), 'yyyy-MM-dd')}
    >
      {formatDistance(
        new Date(date),
        roundToNearestMinutes(new Date()),
        { addSuffix: true },
      )}
    </span>
  )
}
