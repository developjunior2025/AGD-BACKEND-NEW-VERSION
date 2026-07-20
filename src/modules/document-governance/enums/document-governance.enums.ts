export enum DocumentApprovalDecision {
  APROBADO = 'aprobado',
  RECHAZADO = 'rechazado',
  OBSERVADO = 'observado',
}

export enum DocumentObservationStatus {
  ABIERTA = 'abierta',
  EN_SUBSANACION = 'en_subsanacion',
  CERRADA = 'cerrada',
}

export enum RemediationStatus {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
}

export enum WorkflowAssignmentStatus {
  PENDIENTE = 'pendiente',
  COMPLETADO = 'completado',
}

export enum WorkflowStepAction {
  REVISAR = 'revisar',
  APROBAR = 'aprobar',
  FIRMAR = 'firmar',
  PUBLICAR = 'publicar',
}

export enum GovernanceAction {
  CREAR = 'crear',
  EDITAR = 'editar',
  APROBAR = 'aprobar',
  CONSULTAR = 'consultar',
  AUDITAR = 'auditar',
  ELIMINAR_EXCEPCION = 'eliminar_excepcion',
}

export enum GovernanceAccessLevel {
  TOTAL = 'total',
  PERMITIDO = 'permitido',
  PARCIAL = 'parcial',
  LIMITADO = 'limitado',
  NO_PERMITIDO = 'no_permitido',
  NO_APLICA = 'no_aplica',
}

export enum ControlledDeleteStatus {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
}
