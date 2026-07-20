export enum CustomsDeclarationStatus {
  BORRADOR = 'borrador',
  PRESENTADA = 'presentada',
  EN_REVISION = 'en_revision',
  OBSERVADA = 'observada',
  LEVANTE_AUTORIZADO = 'levante_autorizado',
  CERRADA = 'cerrada',
}

export enum BrokerAuthorizationStatus {
  VIGENTE = 'vigente',
  VENCIDA = 'vencida',
  SUSPENDIDA = 'suspendida',
}

export enum SelectivityChannel {
  VERDE = 'verde',
  AMARILLO = 'amarillo',
  ROJO = 'rojo',
}

export enum RiskLevel {
  BAJO = 'bajo',
  MEDIO = 'medio',
  ALTO = 'alto',
}

export enum RequirementStatus {
  PENDIENTE = 'pendiente',
  CUMPLIDO = 'cumplido',
  VENCIDO = 'vencido',
}

export enum CustomsObservationStatus {
  ABIERTA = 'abierta',
  CERRADA = 'cerrada',
}

export enum TaxSettlementStatus {
  PENDIENTE = 'pendiente',
  PAGADO = 'pagado',
}

export enum InspectionStatus {
  PROGRAMADA = 'programada',
  REALIZADA = 'realizada',
  CANCELADA = 'cancelada',
}

export enum InspectionResultOutcome {
  CONFORME = 'conforme',
  NO_CONFORME = 'no_conforme',
  OBSERVADO = 'observado',
}
