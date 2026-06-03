export function riskColor(risk: string): string {
  switch (risk) {
    case 'High':
      return '#DC2626';
    case 'Medium':
      return '#D97706';
    case 'Low':
    default:
      return '#16A34A';
  }
}

export function confidenceChipColor(level: string): string {
  switch (level) {
    case 'High':
      return '#16A34A';
    case 'Medium':
      return '#D97706';
    case 'Low':
    default:
      return '#6B7280';
  }
}
