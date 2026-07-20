export enum VehicleStatus {
  DISPONIBLE = 'disponible',
  EN_USO = 'en_uso',
  MANTENIMIENTO = 'mantenimiento',
}

export enum DriverStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
  SUSPENDIDO = 'suspendido',
}

export enum CredentialStatus {
  VIGENTE = 'vigente',
  VENCIDO = 'vencido',
}

export enum TransportOrderStatus {
  SOLICITADA = 'solicitada',
  ASIGNADA = 'asignada',
  EN_EJECUCION = 'en_ejecucion',
  COMPLETADA = 'completada',
  CANCELADA = 'cancelada',
}

export enum TripStatus {
  PROGRAMADO = 'programado',
  EN_CURSO = 'en_curso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
}

export enum RouteStopType {
  RETIRO = 'retiro',
  ENTREGA = 'entrega',
  ESCALA = 'escala',
}

export enum TripMilestoneStatus {
  PENDIENTE = 'pendiente',
  CUMPLIDO = 'cumplido',
  RETRASADO = 'retrasado',
}

export enum IncidentSeverity {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta',
}

export enum IncidentStatus {
  PENDIENTE = 'pendiente',
  RESUELTO = 'resuelto',
}

export enum TripSettlementStatus {
  PENDIENTE = 'pendiente',
  LIQUIDADO = 'liquidado',
}
