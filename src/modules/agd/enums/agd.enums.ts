export enum EntryRequestStatus {
  SOLICITADO = 'solicitado',
  PROGRAMADO = 'programado',
  RECIBIDO = 'recibido',
  RECHAZADO = 'rechazado',
}

export enum ReceptionStatus {
  PENDIENTE = 'pendiente',
  COMPLETADA = 'completada',
}

export enum CustodyLotStatus {
  EN_CUSTODIA = 'en_custodia',
  RETIRADO = 'retirado',
}

export enum CustodyMovementType {
  INGRESO = 'ingreso',
  SALIDA = 'salida',
  AJUSTE = 'ajuste',
  TRANSFERENCIA = 'transferencia',
}

export enum TitleStatus {
  VIGENTE = 'vigente',
  ENDOSADO = 'endosado',
  LIBERADO = 'liberado',
  VENCIDO = 'vencido',
}

export enum TitleType {
  CERTIFICADO = 'certificado',
  BONO = 'bono',
}

export enum PickingOrderStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
}

export enum DispatchOrderStatus {
  PENDIENTE = 'pendiente',
  PREPARADO = 'preparado',
  DESPACHADO = 'despachado',
}
