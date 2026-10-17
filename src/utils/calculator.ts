export function getPositionSize(accountBalance: number, maxRiskPercent: number, leverage: number, stopLossPercent: number): number {
  const riskAmount = accountBalance * maxRiskPercent;
  const positionSize = riskAmount / (stopLossPercent * leverage);
  return positionSize;
}

export function getPositionRisk(accountBalance: number, leverage: number, stopLossPercent: number, positionSize: number): number {
  const riskAmount = positionSize * stopLossPercent * leverage;
  const riskPercent = riskAmount / accountBalance;
  return riskPercent;
}

