export enum TradeDocumentType {
  FACTURA_PROFORMA = 'factura_proforma',
  FACTURA_COMERCIAL = 'factura_comercial',
  PACKING_LIST = 'packing_list',
  BILL_OF_LADING = 'bill_of_lading',
  AIR_WAYBILL = 'air_waybill',
  CERTIFICADO_ORIGEN = 'certificado_origen',
  INSTRUCCIONES_DESPACHO = 'instrucciones_despacho',
  NOTA_CREDITO = 'nota_credito',
  NOTA_DEBITO = 'nota_debito',
}

export enum TradeDocumentStatus {
  BORRADOR = 'borrador',
  EMITIDO = 'emitido',
  ANULADO = 'anulado',
}

export enum InvoiceStatus {
  PENDIENTE = 'pendiente',
  PAGADA = 'pagada',
  ANULADA = 'anulada',
}
