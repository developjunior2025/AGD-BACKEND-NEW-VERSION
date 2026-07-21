export enum FunctionalModuleStatus {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

export enum UseCaseFlowType {
  PRINCIPAL = 'principal',
  ALTERNATIVO = 'alternativo',
  EXCEPCION = 'excepcion',
}

export enum ParameterDataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  JSON = 'json',
}

export enum HealthCheckStatus {
  OK = 'ok',
  DEGRADADO = 'degradado',
  CAIDO = 'caido',
}

export enum BackgroundJobStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  FALLIDO = 'fallido',
}

export enum ScheduledTaskStatus {
  ACTIVA = 'activa',
  PAUSADA = 'pausada',
}

export enum BackupStatus {
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
  FALLIDO = 'fallido',
}

export enum SecurityEventSeverity {
  INFO = 'info',
  ADVERTENCIA = 'advertencia',
  CRITICA = 'critica',
}

export enum SessionStatus {
  ACTIVA = 'activa',
  CERRADA = 'cerrada',
  EXPIRADA = 'expirada',
}
