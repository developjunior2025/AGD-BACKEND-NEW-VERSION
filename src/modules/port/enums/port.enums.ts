export enum ArrivalStatus {
  SOLICITADO = 'solicitado',
  CONFIRMADO = 'confirmado',
  EN_PUERTO = 'en_puerto',
}

export enum BerthRequestStatus {
  PENDIENTE = 'pendiente',
  ASIGNADO = 'asignado',
  RECHAZADO = 'rechazado',
}

export enum OperatingWindowStatus {
  PROGRAMADA = 'programada',
  EN_CURSO = 'en_curso',
  FINALIZADA = 'finalizada',
}

export enum ManifestStatus {
  PRESENTADO = 'presentado',
  EN_CONCILIACION = 'en_conciliacion',
  CONCILIADO = 'conciliado',
}

export enum ContainerStatus {
  EN_BUQUE = 'en_buque',
  DESCARGADO = 'descargado',
  EN_PATIO = 'en_patio',
  RETIRADO = 'retirado',
}

export enum EquipmentStatus {
  DISPONIBLE = 'disponible',
  EN_USO = 'en_uso',
  MANTENIMIENTO = 'mantenimiento',
}

export enum DischargeOrderStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
}

export enum YardSlotStatus {
  LIBRE = 'libre',
  OCUPADO = 'ocupado',
}

export enum GateEventType {
  GATE_IN = 'gate_in',
  GATE_OUT = 'gate_out',
}

export enum ReconciliationStatus {
  CONFORME = 'conforme',
  CON_DISCREPANCIAS = 'con_discrepancias',
}

export enum DiscrepancyStatus {
  PENDIENTE = 'pendiente',
  RESUELTA = 'resuelta',
}
