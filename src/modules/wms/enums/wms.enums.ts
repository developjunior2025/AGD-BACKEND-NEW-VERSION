export enum SerialStatus {
  EN_STOCK = 'en_stock',
  RESERVADO = 'reservado',
  DESPACHADO = 'despachado',
}

export enum ReceiptStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
}

export enum InventoryMovementType {
  RECEPCION = 'recepcion',
  PICKING = 'picking',
  AJUSTE = 'ajuste',
  TRANSFERENCIA = 'transferencia',
  DESPACHO = 'despacho',
}

export enum ReservationStatus {
  ACTIVA = 'activa',
  LIBERADA = 'liberada',
  CONSUMIDA = 'consumida',
}

export enum CycleCountStatus {
  PROGRAMADO = 'programado',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado',
}

export enum OrderStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
}

export enum DispatchOrderStatus {
  PENDIENTE = 'pendiente',
  PREPARADO = 'preparado',
  DESPACHADO = 'despachado',
}

export enum WmsTaskStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADA = 'completada',
}
