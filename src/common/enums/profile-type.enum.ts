/**
 * Tipos de perfil de cuenta (§7.1 FUR de usuarios del documento de reglas).
 * "Visitante" no aparece aquí porque no requiere cuenta registrada.
 */
export enum ProfileType {
  CLIENTE_POTENCIAL = 'cliente_potencial',
  IMPORTADOR = 'importador',
  EXPORTADOR = 'exportador',
  AGENTE_ADUANA = 'agente_aduana',
  OPERADOR_PORTUARIO = 'operador_portuario',
  OPERADOR_AGD = 'operador_agd',
  OPERADOR_WMS = 'operador_wms',
  TRANSPORTISTA = 'transportista',
  PROVEEDOR_SERVICIOS_LOGISTICOS = 'proveedor_servicios_logisticos',
  ANALISTA_SENIAT_SIDUNEA = 'analista_seniat_sidunea',
  ADMINISTRADOR_DOCUMENTAL = 'administrador_documental',
  SUPERADMINISTRADOR = 'superadministrador',
  PERSONAL_INTERNO = 'personal_interno',
  USUARIO_DELEGADO = 'usuario_delegado',
}
