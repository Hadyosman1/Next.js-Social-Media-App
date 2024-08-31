import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function getTimeAgo(articleCreatedAt: Date): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const articleDate = toZonedTime(articleCreatedAt, userTimeZone);
  const timeAgo = formatDistanceToNow(articleDate, {
    addSuffix: true,
    includeSeconds: true,
  });

  const shortTimeAgo = timeAgo
    .replace("about ", "") //
    .replace("a few seconds", "s")
    .replace(/(\d+) seconds?/, "$1s")
    .replace(/(\d+) minute?s?/, "$1m")
    .replace(/(\d+) hour?s?/, "$1h")
    .replace(/(\d+) day?s?/, "$1d")
    .replace(/(\d+) month?s?/, "$1mo")
    .replace(/(\d+) year?s?/, "$1y");

  return shortTimeAgo;
}
