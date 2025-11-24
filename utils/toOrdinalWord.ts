export function toOrdinalWord(n: number): string {
  const map: Record<string, string> = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth",
  };
  return map[n] ?? "";
}
