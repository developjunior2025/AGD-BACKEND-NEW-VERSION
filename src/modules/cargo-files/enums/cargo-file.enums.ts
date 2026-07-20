/** Tipos de carga (§4.5.2). */
export enum CargoType {
  CONTENEDOR_FCL = 'contenedor_fcl',
  CONTENEDOR_LCL = 'contenedor_lcl',
  CARGA_SUELTA = 'carga_suelta',
  CARGA_CONSOLIDADA = 'carga_consolidada',
  GRANEL = 'granel',
  CARGA_PROYECTO = 'carga_proyecto',
  REFRIGERADA = 'refrigerada',
  PERECEDERA = 'perecedera',
  MERCANCIA_PELIGROSA_IMO = 'mercancia_peligrosa_imo',
  SOBREDIMENSIONADA = 'sobredimensionada',
}

/** Tipos de operación (§4.5.2). */
export enum CargoOperationType {
  IMPORTACION = 'importacion',
  EXPORTACION = 'exportacion',
  TRANSITO = 'transito',
  RETIRO = 'retiro',
  ENTREGA_FINAL = 'entrega_final',
}

/** Estados del expediente (§4.5.2, lista exacta de 10 estados). */
export enum CargoFileStatus {
  RECIBIDO = 'recibido',
  EN_REVISION = 'en_revision',
  VALIDADO = 'validado',
  OBSERVADO = 'observado',
  EN_SUBSANACION = 'en_subsanacion',
  APROBADO = 'aprobado',
  EN_TRANSITO = 'en_transito',
  ENTREGADO = 'entregado',
  CERRADO = 'cerrado',
  VENCIDO = 'vencido',
}

export enum CargoMilestoneStatus {
  PENDIENTE = 'pendiente',
  CUMPLIDO = 'cumplido',
  RETRASADO = 'retrasado',
}

export enum AlertSeverity {
  INFO = 'info',
  ADVERTENCIA = 'advertencia',
  CRITICA = 'critica',
}
