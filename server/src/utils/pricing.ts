export function computeNights(checkIn: string, checkOut: string) {
  const inDate = new Date(checkIn + "T00:00:00Z");
  const outDate = new Date(checkOut + "T00:00:00Z");
  const msPerNight = 24 * 60 * 60 * 1000;
  const nights = Math.round((outDate.getTime() - inDate.getTime()) / msPerNight);
  return nights;
}

export function computeTotalCents(nights: number, basePriceCents: number) {
  return nights * basePriceCents;
}