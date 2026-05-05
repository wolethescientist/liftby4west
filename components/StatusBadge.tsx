import { Badge, getRelayStageBadgeVariant } from "@/components/ui/Badge";
import { relayStageLabels } from "@/lib/mockData";
import type { BookingStatus } from "@/lib/types";

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  return <Badge variant={getRelayStageBadgeVariant(status)}>{relayStageLabels[status]}</Badge>;
}
