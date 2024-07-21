import { parseISO, format, formatDistanceToNow } from 'date-fns'


export function commonformatDistanceToNow(isoDateString) { 
    const date = parseISO(isoDateString)
    const timeAgo = formatDistanceToNow(date, { addSuffix: true })
    return timeAgo 
}