# MAPA DEL SITIO COMPLETO DEL MARKETPLACE LOGÍSTICO INTEGRAL

Elaborar el mapa del sitio completo de un **Marketplace Logístico Integral**, utilizando los contenidos funcionales del proyecto, las infografías previamente desarrolladas y la estructura del documento de referencia.

El Marketplace Logístico Integral será una plataforma digital para buscar, comparar, contactar, cotizar, contratar, coordinar, documentar y evaluar servicios relacionados con operaciones aduaneras, portuarias, de almacenamiento, transporte, comercio exterior y cumplimiento documental.

La solución estará orientada a importadores, exportadores, agentes de aduana, operadores portuarios, almacenes generales de depósito —AGD—, operadores WMS, transportistas, proveedores de servicios logísticos, analistas regulatorios, administradores documentales y administradores de gobernanza.

---

## 1. Objetivo general

Diseñar la arquitectura funcional, el mapa del sitio, los perfiles de usuarios, los dashboards privados, los módulos funcionales, las Fichas Únicas de Registro —FUR— y la estructura referencial de base de datos necesaria para desarrollar un Marketplace Logístico Integral.

La solución deberá permitir:

- Registrar importadores, exportadores, agentes de aduana, operadores portuarios, AGD, almacenes, transportistas y proveedores de servicios logísticos.
- Publicar servicios aduaneros, portuarios, de almacenamiento, WMS, transporte, comercio exterior, gestión documental y cumplimiento.
- Buscar proveedores por categoría, ubicación, cobertura, disponibilidad, reputación, certificaciones y experiencia.
- Consultar directorios públicos de agencias aduanales, transportistas, operadores portuarios, almacenes y proveedores especializados.
- Solicitar información, cotizaciones, inspecciones, reservas operativas y servicios logísticos.
- Comparar proveedores, servicios, precios referenciales, tiempos de ejecución, cobertura y valoraciones.
- Registrar y gestionar operaciones de importación, exportación, tránsito, almacenamiento, retiro y entrega.
- Administrar expedientes únicos por carga.
- Asociar documentos comerciales, aduaneros, portuarios, AGD, WMS y de transporte a cada operación.
- Controlar checklists documentales, versiones, aprobaciones, observaciones, subsanaciones y vencimientos.
- Gestionar declaraciones aduaneras, clasificación, valoración, selectividad, tributos y levante.
- Coordinar arribos, atraques, manifiestos, descarga, patios, contenedores y salida portuaria.
- Administrar recepción, custodia, inventario, ubicaciones, picking, packing y despacho.
- Gestionar flota, conductores, viajes, rutas, tracking, retiros, entregas y prueba de entrega —POD—.
- Gestionar solicitudes comerciales, cotizaciones, propuestas, órdenes, contratos, facturación y pagos.
- Mantener trazabilidad por carga, documento, usuario, proveedor, hito y operación.
- Aplicar una matriz transversal de gobernanza documental.
- Garantizar control de acceso basado en roles y permisos.
- Registrar auditoría de todas las acciones críticas.
- Generar reportes operativos, regulatorios, comerciales, documentales y ejecutivos.

---

## 2. Referencias funcionales y visuales

El portal público deberá combinar funcionalidades inspiradas en:

- **Mercado Libre:** buscador principal, categorías, filtros, publicaciones, ofertas, reputación, favoritos, comparación y recepción de oportunidades.
- **Yelp:** directorio geolocalizado, fichas empresariales, valoraciones, reseñas, fotografías, verificación de proveedores y búsqueda por cercanía.
- **Amazon:** catálogo estructurado, recomendaciones, servicios relacionados, historial, reputación y experiencia de navegación.
- **Plataformas B2B logísticas:** solicitud de cotización, gestión de proveedores, trazabilidad, documentación, control de operaciones y seguimiento de servicios.
- **Portales de comercio exterior:** consulta de requisitos, documentos, hitos aduaneros, estados operativos y normativa aplicable.

El diseño gráfico deberá presentar:

- Estilo corporativo, profesional y moderno.
- Fondo claro y tipografía de alta legibilidad.
- Tarjetas para servicios, proveedores, categorías, documentos y operaciones.
- Buscador principal amplio.
- Filtros laterales.
- Paneles de indicadores.
- Líneas de tiempo.
- Calendarios operativos.
- Mapas de cobertura, rutas y ubicación.
- Estados de cumplimiento mediante semáforos.
- Badges de proveedor verificado, mejor valorado y respuesta rápida.
- Llamadas a la acción claramente diferenciadas.
- Diseño adaptable a computadoras, tabletas y dispositivos móviles.

---

## 3. Tecnología de desarrollo

La arquitectura tecnológica estará compuesta por:

- **Frontend:** React.js.
- **Backend:** NestJS sobre Node.js.
- **Base de datos:** MySQL 8.x.
- **API interna:** REST y/o GraphQL.
- **Autenticación:** JWT, Passport.js y control de acceso basado en roles.
- **Documentación de API:** Swagger / OpenAPI.
- **ORM:** TypeORM o Prisma.
- **Gestión de archivos:** almacenamiento local o compatible con S3.
- **Carga de archivos:** Multer.
- **Procesamiento de imágenes:** Sharp.
- **Validación:** class-validator y class-transformer.
- **Seguridad:** Helmet, CORS, bcrypt y rate limiting.
- **Notificaciones:** correo electrónico, notificaciones internas y WebSockets.
- **Procesamiento de tareas:** BullMQ y Redis.
- **Tareas programadas:** @nestjs/schedule.
- **Generación de documentos:** PDFKit, Puppeteer o librerías equivalentes.
- **Reportes:** ExcelJS, SheetJS y herramientas de visualización.
- **Mapas y geolocalización:** Leaflet, Google Maps, Mapbox u OpenStreetMap.
- **Tracking:** WebSockets, geocercas y registro de hitos GPS.
- **Pruebas:** Jest, Supertest y Cypress o Playwright.
- **Control de versiones:** Git.
- **Contenedores:** Docker.
- **Despliegue:** infraestructura web compatible con Node.js, MySQL y Redis.

### 3.1 Librerías recomendadas para React.js

- react-router-dom.
- @tanstack/react-query.
- zustand.
- react-hook-form.
- zod.
- tailwindcss.
- shadcn/ui o Radix UI.
- @tanstack/react-table.
- recharts.
- react-leaflet.
- socket.io-client.
- lucide-react.
- date-fns.

### 3.2 Librerías recomendadas para NestJS

- @nestjs/passport.
- passport-jwt.
- @nestjs/jwt.
- bcrypt.
- @nestjs/swagger.
- class-validator.
- class-transformer.
- typeorm y mysql2, o Prisma.
- @nestjs/bullmq.
- bullmq.
- ioredis.
- @nestjs/schedule.
- @nestjs/websockets.
- socket.io.
- @nestjs/platform-express.
- multer.
- pdfkit o puppeteer.
- @nestjs-modules/mailer.
- nodemailer.
- helmet.
- @nestjs/throttler.
- nestjs-pino o winston.
- jest.
- supertest.

### 3.3 Uso de Odoo

No deberá existir integración electrónica directa entre el Marketplace Logístico Integral y una instalación de Odoo.

Los módulos, modelos y tablas de Odoo se utilizarán exclusivamente como:

- Referencia de normalización.
- Referencia de arquitectura funcional.
- Referencia para el diseño de entidades y relaciones.
- Referencia para nomenclatura de datos.
- Referencia para procesos administrativos, comerciales, documentales, de inventario y seguridad.

La base de datos principal del Marketplace será MySQL. Las tablas propias se crearán cuando los modelos referenciales de Odoo no soporten la lógica especializada del ecosistema logístico.

---

## 4. Arquitectura funcional del ecosistema

El mapa del sitio deberá organizarse, como mínimo, en los siguientes ecosistemas:

### 4.0 Ecosistema general

- Portal público.
- Buscador global.
- Catálogo de categorías.
- Catálogo de servicios logísticos.
- Directorio de proveedores.
- Directorio de agencias aduanales.
- Directorio de transportistas.
- Directorio de operadores portuarios.
- Directorio de AGD y almacenes.
- Fichas públicas de proveedores.
- Fichas públicas de servicios.
- Ofertas y promociones.
- Comparador de proveedores.
- Carrito de servicios.
- Solicitudes de información.
- Solicitudes de cotización.
- Gestión de oportunidades.
- Gestión de operaciones logísticas.
- Expediente único por carga.
- Gestión documental.
- Gobernanza documental.
- Operaciones aduaneras.
- Operaciones portuarias.
- Operaciones AGD.
- Operaciones WMS.
- Transporte y tracking.
- Documentos comerciales.
- Facturación y pagos.
- Reputación y evaluaciones.
- Soporte e incidencias.
- Administración general.
- Administración técnica.
- Reportes y analítica.
- Sistema maestro de Fichas Únicas de Registro.

### 4.1 Portal público

- Home.
- Categorías.
- Servicios.
- Proveedores.
- Agencias aduanales.
- Transportistas.
- Operadores portuarios.
- Almacenes, AGD y WMS.
- Comercio exterior.
- Información aduanera.
- Documentos y requisitos.
- Ofertas y promociones.
- Proveedores destacados.
- Servicios mejor valorados.
- Servicios relacionados.
- Comparador.
- Carrito.
- Solicitar cotización.
- Solicitar información.
- Seguimiento público limitado.
- Preguntas y respuestas.
- Valoraciones y reseñas.
- Casos de éxito.
- Blog y recursos.
- Preguntas frecuentes.
- Centro de ayuda.
- Registro.
- Inicio de sesión.
- Términos y condiciones.
- Política de privacidad.
- Política de contratación.
- Política documental.
- Política de reclamaciones.
- Política de seguridad.

### 4.2 Home del Marketplace

El Home deberá incluir:

- Header.
- Logotipo.
- Buscador global.
- Selector de categorías.
- Registro.
- Inicio de sesión.
- Notificaciones.
- Mensajes.
- Favoritos.
- Carrito o solicitudes.
- Mega menú de categorías.
- Banner principal.
- Propuesta de valor.
- Categorías destacadas.
- Servicios destacados.
- Proveedores verificados.
- Agencias aduanales destacadas.
- Transportistas destacados.
- Almacenes y AGD destacados.
- Operadores portuarios destacados.
- Ofertas y promociones.
- Servicios mejor valorados.
- Proveedores cercanos.
- Casos de éxito.
- Recomendaciones.
- Preguntas frecuentes.
- Newsletter.
- Footer legal y de soporte.

### 4.3 Categorías del ecosistema

Incluir categorías como:

1. SIDUNEA / SENIAT.
2. Aduanas y agentes aduanales.
3. Bolipuertos / TOS.
4. Operaciones portuarias.
5. AGD.
6. WMS y almacenes.
7. Transporte y flota.
8. Documentos comerciales.
9. Comercio exterior.
10. Cumplimiento y reportes.
11. Gestión documental.
12. Marketplace de servicios logísticos.
13. Seguros y certificaciones.
14. Inspecciones y control de calidad.
15. Seguridad logística.
16. Tracking y trazabilidad.
17. Consultoría especializada.
18. Servicios complementarios.

### 4.4 Módulos documentales principales

#### 4.4.1 SIDUNEA / SENIAT

- RIF.
- Registro en SIDUNEA.
- Registro del importador o exportador.
- Registro del agente de aduana.
- Autorización de auxiliar.
- Declaración de Aduanas —DA—.
- Declaración complementaria.
- Clasificación arancelaria.
- Valoración aduanera.
- Liquidación de tributos.
- Comprobante de pago.
- Canal de selectividad.
- Requerimientos.
- Observaciones.
- Actas de reconocimiento.
- Levante.
- Constancia de liberación.
- Expediente aduanero digital.

#### 4.4.2 Portuario / TOS / Bolipuertos

- Solicitud de arribo.
- Aviso de arribo.
- Itinerario.
- Programación de atraque.
- Asignación de muelle.
- Ventana operativa.
- Manifiesto de carga.
- Lista de contenedores.
- Registro de equipos.
- Orden de descarga.
- Parte de descarga.
- Registro de patio.
- Movilización interna.
- Gate in.
- Gate out.
- Conciliación de manifiesto.
- Acta de discrepancias.
- Autorización de retiro.
- Orden de entrega.
- Constancia de salida.
- Cierre operativo de escala.

#### 4.4.3 AGD

- Solicitud de ingreso.
- Orden de recepción.
- Acta de recepción.
- Registro de mercancía.
- Identificación de carga o lote.
- Ubicación de almacén.
- Kardex.
- Movimiento interno.
- Registro de custodia.
- Certificado de Depósito.
- Bono de Prenda.
- Solicitud de emisión de títulos.
- Control de vigencia.
- Historial de endosos.
- Orden de picking.
- Orden de despacho.
- Autorización de retiro.
- Acta de entrega.
- Registro de salida.

#### 4.4.4 WMS / Almacén

- Catálogo SKU / UPN.
- Orden de recepción.
- Aviso de arribo.
- Registro de bultos.
- Registro de pallets.
- Lotes y series.
- Maestro de ubicaciones.
- Zonas y racks.
- Kardex.
- Conteos cíclicos.
- Ajustes de inventario.
- Reglas de putaway.
- Reglas de picking.
- Orden de picking.
- Packing.
- Consolidación.
- Checklist de despacho.
- Orden de despacho.
- Confirmación de carga.
- Registro de salida.
- Evidencia de entrega al siguiente actor.

#### 4.4.5 Transporte

- Solicitud de servicio.
- Orden de transporte.
- Hoja de ruta.
- Programación de retiro.
- Programación de entrega.
- Asignación de unidad.
- Asignación de conductor.
- Carta de porte.
- Guía de remisión.
- Manifiesto de carga.
- Checklist de salida.
- Documentación del vehículo.
- Licencias del conductor.
- Seguros.
- Bitácora de viaje.
- Tracking GPS.
- Geocercas.
- Hitos de ruta.
- Reporte de incidencias.
- Acta de retiro.
- Prueba de entrega —POD—.
- Evidencias fotográficas.
- Liquidación del viaje.
- Cierre operativo.

#### 4.4.6 Documentos comerciales

- Solicitud de cotización —RFQ—.
- Cotización comercial.
- Propuesta económica.
- Propuesta técnica.
- Orden de compra.
- Orden de servicio.
- Factura proforma.
- Factura comercial definitiva.
- Nota de débito.
- Nota de crédito.
- Comprobante de pago.
- Estado de cuenta.
- Packing List.
- Relación de bultos.
- Instrucciones de despacho.
- Certificado de origen.
- BL / Bill of Lading.
- AWB / Air Waybill.
- Carta de porte.
- Confirmación de embarque.
- Evidencia de entrega.
- Acta de cierre comercial.

### 4.5 Módulos transversales de gobernanza documental

#### 4.5.1 Creación de documentos maestros

- Diseñador de plantillas.
- Configuración de campos.
- Reglas de obligatoriedad.
- Dependencias.
- Validaciones.
- Relaciones.
- Workflow de revisión.
- Workflow de aprobación.
- Versionamiento.
- Publicación.
- Distribución.
- Importación.
- Exportación.
- Firmas.
- Sellos.
- Auditoría.
- Historial de cambios.

Estados:

- Borrador.
- En revisión.
- Aprobado.
- Publicado.
- Obsoleto.

#### 4.5.2 Gestión y seguimiento por carga

- Crear expediente único por carga.
- Asociar documentos.
- Validar checklist.
- Monitorear estados.
- Registrar hitos.
- Gestionar alertas.
- Controlar vencimientos.
- Registrar observaciones.
- Gestionar subsanaciones.
- Cerrar operación.
- Auditar trazabilidad.

Tipos de carga:

- Contenedor FCL.
- Contenedor LCL.
- Carga suelta.
- Carga consolidada.
- Granel.
- Carga de proyecto.
- Refrigerada.
- Perecedera.
- Mercancía peligrosa —IMO—.
- Sobredimensionada.
- Importación.
- Exportación.
- Tránsito.
- Retiro.
- Entrega final.

Estados del expediente:

- Recibido.
- En revisión.
- Validado.
- Observado.
- En subsanación.
- Aprobado.
- En tránsito.
- Entregado.
- Cerrado.
- Vencido.

#### 4.5.3 Matriz de gobernanza

La matriz deberá definir:

- Perfil.
- Rol.
- Tipo documental.
- Responsable.
- Revisor.
- Aprobador.
- Consultor.
- Acción permitida.
- Nivel de acceso.
- Regla de aprobación.
- Regla de retención.
- Restricción.
- Excepción.
- Auditoría.
- Trazabilidad.

Acciones:

- Crear.
- Editar.
- Aprobar.
- Consultar.
- Auditar.
- Eliminar bajo excepción controlada.

Niveles:

- Total.
- Permitido.
- Parcial.
- Limitado.
- No permitido.
- No aplica.

Reglas:

- Segregación de funciones.
- Versionado obligatorio.
- Retención documental.
- Restricción de eliminación.
- Bitácora de auditoría.
- Alertas de vencimiento.
- Observaciones y subsanaciones.
- Acceso por operación.
- Acceso mínimo necesario.
- Evidencia de aprobación.

### 4.6 Flujo general de una operación logística

1. Registro del cliente.
2. Creación de solicitud.
3. Registro de datos de la carga.
4. Solicitud de cotización.
5. Comparación de proveedores.
6. Selección de proveedor.
7. Creación del expediente.
8. Carga de documentos comerciales.
9. Validación documental.
10. Gestión aduanera.
11. Programación portuaria.
12. Arribo y descarga.
13. Conciliación de manifiesto.
14. Ingreso a AGD o almacén.
15. Recepción WMS.
16. Custodia o almacenamiento.
17. Preparación del retiro.
18. Asignación de transporte.
19. Validación de documentos de salida.
20. Retiro.
21. Tracking en tránsito.
22. Entrega.
23. Registro de POD.
24. Facturación.
25. Pago.
26. Valoración del proveedor.
27. Cierre y auditoría.

---

## 5. Perfiles públicos

Elaborar el contenido, las funcionalidades y los módulos asociados a cada perfil público.

### 5.1 Visitante

Puede:

- Navegar por el Marketplace.
- Consultar categorías.
- Buscar servicios.
- Buscar proveedores.
- Consultar agencias aduanales.
- Consultar transportistas.
- Consultar operadores portuarios.
- Consultar almacenes y AGD.
- Revisar fichas públicas.
- Revisar reputación.
- Consultar valoraciones.
- Comparar servicios.
- Consultar ofertas.
- Descargar formatos públicos.
- Consultar información regulatoria.
- Consultar hitos públicos limitados.
- Compartir publicaciones.
- Registrarse.
- Solicitar información inicial.

Módulos:

- Exploración y búsqueda.
- Catálogo de categorías.
- Fichas públicas de servicios.
- Directorio de proveedores.
- Ofertas y promociones.
- Carrito y solicitud comercial.
- Registro y onboarding.
- Ayuda y soporte.

Restricciones:

- No puede acceder a expedientes privados.
- No puede consultar información sensible.
- No puede crear, editar, aprobar ni eliminar documentos maestros.
- Debe registrarse para completar una cotización o contratación.

### 5.2 Cliente potencial

Puede:

- Consultar servicios y proveedores.
- Filtrar por categoría.
- Filtrar por ubicación.
- Filtrar por cobertura.
- Filtrar por precio.
- Filtrar por reputación.
- Revisar certificaciones.
- Consultar disponibilidad.
- Comparar proveedores.
- Guardar favoritos.
- Solicitar cotización.
- Solicitar información.
- Agregar servicios al carrito.
- Consultar promociones.
- Preparar su registro como cliente activo.

Módulos:

- Búsqueda avanzada.
- Catálogo.
- Directorio y comparación.
- Cotizaciones.
- Carrito.
- Favoritos.
- Registro y conversión.
- Ayuda.

### 5.3 Proveedor visible

El perfil funcionará como la tienda digital pública del proveedor e incluirá:

- Logotipo.
- Portada.
- Razón social.
- Nombre comercial.
- RIF.
- Descripción.
- Categorías.
- Especialidades.
- Servicios.
- Zonas de cobertura.
- Ubicaciones.
- Sedes.
- Disponibilidad.
- Tarifas referenciales.
- Certificaciones.
- Licencias.
- Pólizas.
- Afiliaciones.
- Portafolio.
- Casos atendidos.
- Evidencias.
- Fotografías.
- Videos.
- Calificación.
- Reseñas.
- Badges de verificación.
- Nivel de cumplimiento.
- Preguntas y respuestas.
- Ofertas.
- Solicitud de información.
- Solicitud de cotización.
- Contacto.
- Conversión a proveedor activo.

Módulos:

- Perfil público.
- Catálogo de servicios.
- Portafolio y evidencias.
- Reputación y confianza.
- Recepción de oportunidades.
- Ofertas y promociones.
- Registro y conversión.
- Ayuda y soporte.

### 5.4 Servicio público

Cada servicio deberá mostrar:

- Código único.
- Nombre.
- Categoría.
- Subcategoría.
- Proveedor responsable.
- Descripción.
- Alcance.
- Actividades incluidas.
- Actividades no incluidas.
- Entregables.
- Requisitos del cliente.
- Documentos requeridos.
- Modalidad.
- Ubicación.
- Área de cobertura.
- Tiempo estimado.
- Precio fijo, referencial o cotizable.
- Recursos incluidos.
- Equipos incluidos.
- Personal requerido.
- Condiciones.
- Garantía.
- Disponibilidad.
- Fotografías.
- Videos.
- Certificaciones.
- Valoraciones.
- Preguntas frecuentes.
- Preguntas y respuestas.
- Servicios relacionados.
- Ofertas aplicables.
- Solicitar información.
- Solicitar cotización.
- Agregar al carrito.
- Contratar.

### 5.5 Directorio público de proveedores

Deberá incluir:

- Vista de lista.
- Vista de tarjetas.
- Vista de mapa.
- Filtros.
- Comparador.
- Distancia.
- Cobertura.
- Categoría.
- Especialidad.
- Calificación.
- Disponibilidad.
- Certificaciones.
- Proveedor verificado.
- Respuesta rápida.
- Mejor valorado.
- Tarifas referenciales.
- Servicios publicados.
- Acceso a perfil.
- Solicitud de cotización.

---

## 6. Perfiles privados y dashboards

Elaborar el dashboard, los indicadores y el listado de módulos funcionales de cada perfil.

### 6.0 Patrón común de dashboard privado

Todos los dashboards operativos deberán considerar:

- Header privado.
- Buscador global.
- Notificaciones.
- Mensajes.
- Perfil.
- Indicadores.
- Línea de tiempo.
- Calendario operativo.
- Tareas pendientes.
- Alertas.
- Accesos rápidos.
- Módulos funcionales.
- Gestión documental.
- Expedientes.
- Matriz de gobernanza.
- Reportes.
- Soporte.
- Configuración.
- Auditoría según permisos.

### 6.1 Importador / Exportador

Indicadores:

- Cargas activas.
- Solicitudes abiertas.
- Cotizaciones en proceso.
- Documentos pendientes.
- Operaciones en aduana.
- Operaciones en puerto.
- Operaciones en almacén.
- Entregas pendientes.
- Pagos pendientes.
- Alertas documentales.

Módulos:

- Dashboard.
- FUR de usuario.
- FUR de empresa.
- Perfil.
- Proveedores.
- Favoritos.
- Solicitudes.
- Cotizaciones.
- Comparador.
- Operaciones de importación.
- Operaciones de exportación.
- Cargas.
- Expedientes.
- Documentos comerciales.
- Documentos aduaneros.
- Seguimiento aduanero.
- Seguimiento portuario.
- AGD y almacenamiento.
- WMS.
- Transporte y entregas.
- Tracking.
- Órdenes.
- Contratos.
- Facturación.
- Pagos.
- Valoraciones.
- Mensajería.
- Notificaciones.
- Soporte.
- Configuración.
- Seguridad.

Flujo:

1. Crear solicitud.
2. Recibir cotizaciones.
3. Seleccionar proveedor.
4. Registrar carga.
5. Cargar documentos.
6. Gestionar aduana.
7. Gestionar puerto y almacén.
8. Coordinar entrega y cierre.

### 6.2 Agente de Aduana

Indicadores:

- Declaraciones en proceso.
- Expedientes pendientes.
- Documentos observados.
- Canales asignados.
- Tributos liquidados.
- Requerimientos SENIAT.
- Levantes pendientes.
- Alertas de cumplimiento.

Módulos:

- Dashboard.
- FUR de agente.
- Clientes.
- Importadores.
- Exportadores.
- Solicitudes.
- Expedientes aduaneros.
- Declaraciones de Aduanas.
- Clasificación arancelaria.
- Valoración aduanera.
- Bases imponibles.
- Documentos.
- Checklist.
- Tributos.
- Liquidaciones.
- Comprobantes.
- Selectividad.
- Inspecciones.
- Requerimientos.
- Observaciones.
- Subsanaciones.
- Levante.
- Coordinación portuaria.
- Coordinación AGD.
- Seguimiento de cargas.
- Reportes.
- Mensajería.
- Notificaciones.
- Auditoría.

Flujo:

1. Recibir solicitud.
2. Validar documentos.
3. Clasificar mercancía.
4. Realizar valoración.
5. Elaborar declaración.
6. Gestionar selectividad.
7. Liquidar tributos y cerrar.

### 6.3 Operador Portuario / Bolipuertos

Indicadores:

- Buques programados.
- Arribos del día.
- Descargas activas.
- Contenedores en patio.
- Manifiestos por conciliar.
- Ventanas operativas.
- Retiros pendientes.
- Alertas de seguridad.

Módulos:

- Dashboard.
- FUR de operador.
- Buques.
- Itinerarios.
- Solicitudes de arribo.
- Programación de atraque.
- Muelles.
- Ventanas operativas.
- Manifiestos.
- Contenedores.
- Equipos.
- Descarga.
- Patio.
- Movimientos internos.
- Gate in.
- Gate out.
- Conciliación.
- Discrepancias.
- Coordinación AGD.
- Coordinación WMS.
- Autorizaciones de retiro.
- Seguridad portuaria.
- Incidencias.
- Reportes.
- Analítica.
- Mensajería.
- Notificaciones.
- Auditoría.

Flujo:

1. Programar buque.
2. Confirmar arribo.
3. Asignar atraque.
4. Recibir manifiesto.
5. Ejecutar descarga.
6. Registrar patio.
7. Conciliar y autorizar retiro.
8. Cerrar escala.

### 6.4 Operador AGD

Indicadores:

- Ingresos programados.
- Mercancía almacenada.
- Ocupación.
- Órdenes de picking.
- Certificados emitidos.
- Bonos de prenda.
- Despachos del día.
- Alertas de inventario.

Módulos:

- Dashboard.
- FUR de AGD.
- Clientes.
- Solicitudes de ingreso.
- Citas.
- Recepción.
- Verificación física.
- Validación documental.
- Inventario.
- Ubicaciones.
- Movimientos.
- Custodia.
- Certificados de Depósito.
- Bonos de Prenda.
- Vigencias.
- Endosos.
- Picking.
- Packing.
- Despacho.
- Retiro.
- Evidencias.
- Incidencias.
- Cumplimiento.
- Reportes.
- Analítica.
- Mensajería.
- Notificaciones.
- Auditoría.

Flujo:

1. Preregistrar ingreso.
2. Recibir carga.
3. Validar documentos.
4. Ubicar mercancía.
5. Registrar custodia.
6. Emitir certificado o bono.
7. Preparar picking y despacho.
8. Cerrar y auditar.

### 6.5 Operador WMS / Almacén

Indicadores:

- Órdenes recibidas.
- Inventario total.
- SKU activos.
- Recepciones pendientes.
- Órdenes en proceso.
- Picking pendiente.
- Packing pendiente.
- Despachos del día.
- Ocupación del almacén.
- Alertas activas.
- Exactitud de inventario.
- Fill rate.
- OTIF.
- Productividad.

Módulos:

- Dashboard.
- FUR de almacén.
- Catálogo SKU / UPN.
- Productos.
- Categorías.
- Lotes.
- Series.
- Ubicaciones.
- Zonas.
- Racks.
- Recepciones.
- Inventario.
- Reservas.
- Transferencias.
- Ajustes.
- Conteos cíclicos.
- Reabastecimiento.
- Reglas de putaway.
- Picking.
- Packing.
- Consolidación.
- Despachos.
- Tracking interno.
- Evidencias.
- Tareas.
- Incidencias.
- Reportes.
- Analítica.
- Auditoría.

### 6.6 Transportista

Indicadores:

- Viajes programados.
- Unidades disponibles.
- Unidades en tránsito.
- Conductores activos.
- Retiros del día.
- Entregas del día.
- Documentos por vencer.
- Alertas de ruta.
- Incidencias.
- POD pendientes.

Módulos:

- Dashboard.
- FUR de transportista.
- Perfil público.
- Flota.
- Vehículos.
- Conductores.
- Licencias.
- Seguros.
- Mantenimiento.
- Solicitudes.
- Órdenes de transporte.
- Viajes.
- Rutas.
- Programación.
- Retiros.
- Entregas.
- Tracking GPS.
- Geocercas.
- Hitos.
- Carta de porte.
- Guía de remisión.
- Documentos.
- Checklist.
- Incidencias.
- Evidencias.
- POD.
- Facturación.
- Liquidaciones.
- Gastos.
- Reportes.
- Analítica.
- Mensajería.
- Notificaciones.

Flujo:

1. Recibir solicitud.
2. Asignar vehículo.
3. Asignar conductor.
4. Validar documentos.
5. Programar retiro.
6. Ejecutar viaje y tracking.
7. Entregar y registrar POD.
8. Liquidar y cerrar.

### 6.7 Proveedor de Servicios Logísticos

Indicadores:

- Servicios publicados.
- Oportunidades recibidas.
- Cotizaciones activas.
- Tasa de conversión.
- Órdenes en ejecución.
- Contratos vigentes.
- Facturación.
- Pagos pendientes.
- Calificación.
- Tiempo de respuesta.
- Documentos por vencer.
- Alertas de cumplimiento.

Módulos:

- Dashboard.
- FUR de proveedor.
- Perfil público.
- Sedes.
- Usuarios internos.
- Roles y permisos.
- Catálogo de servicios.
- FUR de servicios.
- Tarifas.
- Paquetes.
- Ofertas y promociones.
- Portafolio.
- Certificaciones.
- Licencias.
- Pólizas.
- Oportunidades.
- Solicitudes.
- Cotizaciones.
- Propuestas.
- Órdenes.
- Contratos.
- Planificación.
- Recursos.
- Ejecución.
- Hitos.
- Entregables.
- Evidencias.
- Clientes.
- Mensajería.
- Documentos.
- Cumplimiento.
- Facturación.
- Pagos.
- Comisiones.
- Reputación.
- Valoraciones.
- Analítica.
- Reportes.
- Configuración.
- Soporte.

Flujo:

1. Recibir oportunidad.
2. Analizar requerimiento.
3. Elaborar cotización.
4. Negociar.
5. Confirmar orden o contrato.
6. Ejecutar servicio.
7. Registrar evidencias y conformidad.
8. Facturar y cerrar.

### 6.8 Analista SENIAT / SIDUNEA

Indicadores:

- Declaraciones en revisión.
- Expedientes observados.
- Canales asignados.
- Tributos liquidados.
- Requerimientos activos.
- Levantes pendientes.
- Alertas de riesgo.
- Indicadores de cumplimiento.

Módulos:

- Dashboard regulatorio.
- Expedientes asignados.
- Declaraciones.
- Validación documental.
- Clasificación.
- Valoración.
- Selectividad.
- Perfiles de riesgo.
- Tributos.
- Liquidaciones.
- Pagos.
- Requerimientos.
- Observaciones.
- Subsanaciones.
- Inspecciones.
- Actas.
- Levante.
- Auditoría.
- Normativa.
- Indicadores.
- Reportes.
- Mensajería.
- Notificaciones.

Permisos especiales:

- Validar expedientes asignados.
- Revisar declaraciones.
- Aplicar selectividad.
- Gestionar tributos.
- Emitir observaciones.
- Aprobar parcialmente según jerarquía.
- Consultar trazabilidad regulatoria.
- Auditar operaciones asignadas.
- No eliminar documentos regulatorios.

### 6.9 Administrador Documental

Indicadores:

- Documentos totales.
- Documentos activos.
- Pendientes de revisión.
- Pendientes de aprobación.
- Vencidos.
- Obsoletos.
- Sin clasificación.
- Alertas activas.

Módulos:

- Dashboard documental.
- Bandeja de entrada.
- Mis tareas.
- Documentos maestros.
- Plantillas.
- Tipos documentales.
- Catálogos.
- Clasificación.
- Versiones.
- Revisión.
- Aprobación.
- Publicación.
- Vigencias.
- Retención.
- Observaciones.
- Subsanaciones.
- Firmas.
- Expedientes.
- Búsqueda avanzada.
- Reportes.
- Auditoría.
- Bitácora.
- Configuración documental.

Permisos:

- Crear.
- Editar.
- Revisar.
- Aprobar.
- Consultar.
- Auditar.
- No eliminar documentos regulatorios.

### 6.10 Superadministrador / Gobernanza

Indicadores:

- Usuarios activos.
- Organizaciones.
- Proveedores.
- Operaciones.
- Transacciones del día.
- Alertas activas.
- Disponibilidad del sistema.
- Índice de cumplimiento.
- Documentos activos.
- Riesgos.
- No conformidades.
- Almacenamiento utilizado.

Módulos:

- Dashboard global.
- Usuarios.
- Perfiles.
- Roles.
- Permisos.
- Organizaciones.
- Delegaciones.
- Clientes.
- Proveedores.
- Agencias aduanales.
- Operadores portuarios.
- AGD.
- Almacenes.
- Transportistas.
- Categorías.
- Servicios.
- Ofertas.
- Operaciones.
- Cargas.
- Expedientes.
- Documentos maestros.
- Plantillas.
- Matriz de gobernanza.
- Workflows.
- Retención documental.
- Versiones.
- Políticas.
- Normas.
- Cumplimiento.
- Riesgos.
- Controles.
- Auditoría.
- Bitácora.
- Reportes ejecutivos.
- Analítica.
- Exportaciones.
- Estado de módulos.
- Salud del sistema.
- Base de datos.
- Almacenamiento.
- Colas.
- Correos.
- WebSockets.
- Backups.
- Seguridad.
- Sesiones.
- Logs.
- Variables de entorno.
- Parámetros globales.
- Catálogos técnicos.
- Integridad del dato.
- Sistema FUR.
- Casos de uso.
- Tablas de base de datos.
- Configuración.

---

## 7. Sistema maestro de Fichas Únicas de Registro

Cada FUR deberá contener, como mínimo:

- Código único.
- Tipo de registro.
- Nombre.
- Categoría.
- Versión.
- Estado.
- Propietario.
- Fecha de creación.
- Fecha de actualización.
- Origen del registro.
- Descripción.
- Objetivos.
- Información relacionada.
- Documentos.
- Aprobaciones.
- Observaciones.
- Historial de cambios.
- Anexos.
- Estado de publicación.
- Estado de validación.
- Trazabilidad.
- Auditoría.

Desarrollar las siguientes FUR:

### 7.1 FUR de usuarios

- Visitante.
- Cliente potencial.
- Importador.
- Exportador.
- Agente de aduana.
- Operador portuario.
- Operador AGD.
- Operador WMS.
- Transportista.
- Proveedor de servicios logísticos.
- Analista SENIAT / SIDUNEA.
- Administrador documental.
- Superadministrador.
- Personal interno.
- Usuarios delegados.

Campos específicos:

- Datos personales.
- Datos empresariales.
- Contactos.
- Organización.
- Perfil.
- Rol.
- Permisos.
- Estado.
- Verificación.
- Documentos.
- Credenciales.
- Seguridad.
- Sesiones.
- Actividad.
- Preferencias.

### 7.2 FUR de proveedores de servicios

- Datos empresariales.
- Razón social.
- Nombre comercial.
- RIF.
- Sedes.
- Representantes.
- Categorías.
- Especialidades.
- Cobertura.
- Disponibilidad.
- Servicios.
- Tarifas.
- Recursos.
- Equipos.
- Personal.
- Certificaciones.
- Licencias.
- Pólizas.
- Portafolio.
- Documentación.
- Reputación.
- Estado de verificación.
- Estado visible.
- Estado activo.
- Estado suspendido.

### 7.3 FUR de servicios logísticos

- Código.
- Nombre.
- Categoría.
- Subcategoría.
- Proveedor.
- Descripción.
- Alcance.
- Actividades.
- Exclusiones.
- Entregables.
- Requisitos.
- Documentos requeridos.
- Recursos.
- Personal.
- Equipos.
- Duración.
- Precio.
- Modalidad.
- Cobertura.
- Garantía.
- Disponibilidad.
- Condiciones.
- Publicación.
- Estado.
- Valoraciones.
- Servicios relacionados.

### 7.4 FUR de cargas y expedientes

- Código de carga.
- Cliente.
- Importador.
- Exportador.
- Agente de aduana.
- Proveedores asociados.
- Tipo de carga.
- Régimen.
- Origen.
- Destino.
- Puerto.
- Terminal.
- Almacén.
- Descripción de mercancía.
- Clasificación.
- Peso.
- Volumen.
- Bultos.
- Contenedores.
- Peligrosidad.
- Temperatura.
- Documentos asociados.
- Checklist.
- Hitos.
- Estados.
- Observaciones.
- Alertas.
- Fechas.
- Responsables.
- Trazabilidad.
- Cierre.

### 7.5 FUR de documentos maestros

- Código documental.
- Nombre oficial.
- Categoría.
- Tipo.
- Módulo de origen.
- Emisor.
- Responsable.
- Obligatoriedad.
- Vigencia.
- Versión.
- Formato.
- Relación con carga.
- Nivel de acceso.
- Estado.
- Workflow.
- Reglas de aprobación.
- Regla de retención.
- Firmas.
- Sellos.
- Historial.
- Auditoría.

### 7.6 FUR de ofertas y promociones

- Código.
- Nombre.
- Proveedor.
- Servicio.
- Servicios combinados.
- Tipo de promoción.
- Descuento.
- Precio promocional.
- Vigencia.
- Condiciones.
- Cobertura.
- Usuarios beneficiarios.
- Cupos.
- Estado.
- Resultados.
- Conversión.

### 7.7 FUR de módulos funcionales

- Código del módulo.
- Nombre.
- Ecosistema.
- Perfil asociado.
- Objetivo.
- Funciones.
- Entradas.
- Procesos.
- Salidas.
- Reglas.
- Permisos.
- Casos de uso.
- Tablas asociadas.
- API asociada.
- Dependencias.
- Estado.
- Versión.

### 7.8 FUR de casos de uso

- Código.
- Nombre.
- Actor principal.
- Actores secundarios.
- Objetivo.
- Precondiciones.
- Disparador.
- Flujo principal.
- Flujos alternativos.
- Excepciones.
- Reglas de negocio.
- Postcondiciones.
- Tablas.
- Endpoints.
- Permisos.
- Evidencias.
- Auditoría.

Casos de uso principales:

- Explorar servicios.
- Comparar proveedores.
- Solicitar cotización.
- Registrar proveedor.
- Publicar servicio.
- Gestionar operación de importación.
- Gestionar operación de exportación.
- Crear expediente.
- Cargar documentos.
- Validar checklist.
- Elaborar declaración.
- Aplicar selectividad.
- Liquidar tributos.
- Programar arribo.
- Registrar descarga.
- Conciliar manifiesto.
- Ingresar mercancía a AGD.
- Emitir Certificado de Depósito.
- Emitir Bono de Prenda.
- Recibir mercancía en WMS.
- Ejecutar picking.
- Ejecutar despacho.
- Programar transporte.
- Registrar tracking.
- Confirmar entrega.
- Registrar POD.
- Aprobar documento.
- Versionar documento.
- Gestionar observación.
- Gestionar subsanación.
- Publicar oferta.
- Emitir factura.
- Registrar pago.
- Valorar proveedor.
- Auditar operación.

### 7.9 FUR de tablas nativas referenciales de Odoo

- Nombre técnico.
- Nombre funcional.
- Módulo de origen.
- Propósito.
- Campos principales.
- Claves.
- Relaciones.
- Uso referencial en el Marketplace.
- Perfil asociado.
- Proceso soportado.
- Restricciones.
- Estado de adopción.

### 7.10 FUR de tablas propias del Marketplace

- Nombre técnico.
- Nombre funcional.
- Ecosistema.
- Propósito.
- Campos.
- Tipos de datos.
- Clave primaria.
- Claves foráneas.
- Relaciones.
- Índices.
- Reglas de negocio.
- Módulo funcional.
- Perfil asociado.
- API.
- Historial.
- Auditoría.

### 7.11 FUR de matriz de gobernanza

- Código.
- Nombre.
- Tipo documental.
- Perfil.
- Rol.
- Responsable.
- Revisor.
- Aprobador.
- Consultor.
- Acción.
- Nivel de acceso.
- Condiciones.
- Excepciones.
- Regla de aprobación.
- Retención.
- Vigencia.
- Estado.
- Versiones.
- Historial.
- Auditoría.

---

## 8. Uso referencial de módulos y tablas de Odoo

No deberá existir integración electrónica directa entre el Marketplace Logístico Integral y una instalación de Odoo.

Los módulos y tablas de Odoo se utilizarán exclusivamente como referencia de normalización, arquitectura funcional y diseño de datos.

Incluir, cuando apliquen, módulos referenciales como:

- Contacts.
- CRM.
- Sales.
- Purchase.
- Inventory.
- Fleet.
- Documents.
- Sign.
- Accounting.
- Invoicing.
- Helpdesk.
- Website.
- Portal.
- eCommerce.
- Marketing.
- Email Marketing.
- Quality.
- Approvals.
- Maintenance.
- Rating.
- Discuss.
- Employees.
- Multi-company.
- Reporting.

Considerar tablas o modelos nativos referenciales como:

- res_users.
- res_partner.
- res_partner_category.
- res_partner_bank.
- res_company.
- res_groups.
- res_currency.
- crm_lead.
- crm_team.
- sale_order.
- sale_order_line.
- purchase_order.
- purchase_order_line.
- purchase_requisition.
- account_move.
- account_move_line.
- account_payment.
- account_journal.
- account_tax.
- account_analytic_account.
- product_template.
- product_product.
- product_category.
- product_pricelist.
- stock_warehouse.
- stock_location.
- stock_picking.
- stock_picking_type.
- stock_move.
- stock_move_line.
- stock_quant.
- stock_lot.
- stock_package.
- stock_putaway_rule.
- stock_route.
- stock_rule.
- fleet_vehicle.
- fleet_driver.
- fleet_vehicle_log_services.
- fleet_vehicle_odometer.
- maintenance_equipment.
- maintenance_request.
- documents_document.
- documents_folder.
- documents_tag.
- documents_workflow_rule.
- sign_request.
- sign_request_item.
- approval_request.
- approval_category.
- approval_approver.
- quality_point.
- quality_check.
- quality_alert.
- rating_rating.
- mail_message.
- mail_activity.
- mail_followers.
- bus_bus.
- ir_attachment.
- ir_model.
- ir_model_fields.
- ir_model_access.
- ir_rule.
- ir_module_module.
- ir_logging.

Para cada tabla nativa se deberá indicar:

- Módulo de origen.
- Función.
- Campos relevantes.
- Relaciones.
- Perfil que la utiliza.
- Proceso soportado.
- Uso referencial dentro del Marketplace.
- Restricciones.
- Equivalencia o extensión propia.

---

## 9. Tablas propias del Marketplace Logístico Integral

Crear tablas propias cuando los modelos referenciales de Odoo no soporten completamente la lógica especializada del Marketplace.

### 9.1 Usuarios, organizaciones y proveedores

- marketplace_user_profiles.
- marketplace_organizations.
- organization_branches.
- organization_members.
- organization_roles.
- provider_profiles.
- provider_categories.
- provider_specialties.
- provider_service_areas.
- provider_certifications.
- provider_licenses.
- provider_insurances.
- provider_verifications.
- provider_availability.
- provider_portfolios.
- provider_portfolio_items.
- provider_status_history.

### 9.2 Servicios, ofertas y oportunidades

- logistics_services.
- service_categories.
- service_subcategories.
- service_scopes.
- service_requirements.
- service_deliverables.
- service_pricing.
- service_packages.
- service_availability.
- service_related_items.
- quote_requests.
- quote_request_items.
- provider_quotes.
- quote_versions.
- technical_proposals.
- economic_proposals.
- provider_comparisons.
- opportunities.
- logistics_orders.
- marketplace_contracts.
- contract_milestones.
- contract_guarantees.
- promotions.
- promotion_services.
- promotion_conditions.
- favorites.
- reviews.
- ratings.
- provider_reputation.

### 9.3 Aduanas / SIDUNEA / SENIAT

- customs_declarations.
- customs_declaration_items.
- customs_broker_authorizations.
- customs_regimes.
- customs_tariff_classifications.
- customs_valuations.
- customs_tax_settlements.
- customs_tax_items.
- customs_selectivity_channels.
- customs_risk_profiles.
- customs_requirements.
- customs_observations.
- customs_inspections.
- customs_inspection_results.
- customs_release_authorizations.
- customs_status_history.

### 9.4 Operaciones portuarias / TOS / Bolipuertos

- port_vessels.
- port_voyages.
- port_arrivals.
- port_berth_requests.
- port_berth_assignments.
- port_operating_windows.
- port_manifests.
- port_manifest_items.
- port_containers.
- port_equipment.
- port_discharge_orders.
- port_discharge_events.
- port_yards.
- port_yard_slots.
- port_internal_movements.
- port_gate_events.
- port_manifest_reconciliations.
- port_discrepancies.
- port_release_authorizations.
- port_operation_closures.

### 9.5 AGD

- agd_warehouses.
- agd_entry_requests.
- agd_receptions.
- agd_custody_lots.
- agd_custody_movements.
- agd_deposit_certificates.
- agd_pledge_bonds.
- agd_title_endorsements.
- agd_title_validities.
- agd_picking_orders.
- agd_dispatch_orders.
- agd_release_authorizations.
- agd_delivery_records.
- agd_operation_closures.

### 9.6 WMS y almacenes

- wms_skus.
- wms_products.
- wms_lots.
- wms_serials.
- wms_warehouses.
- wms_zones.
- wms_locations.
- wms_racks.
- wms_receipts.
- wms_receipt_items.
- wms_inventory_balances.
- wms_inventory_movements.
- wms_inventory_reservations.
- wms_cycle_counts.
- wms_inventory_adjustments.
- wms_putaway_rules.
- wms_picking_rules.
- wms_picking_orders.
- wms_packing_orders.
- wms_dispatch_orders.
- wms_dispatch_evidence.
- wms_tasks.

### 9.7 Transporte y tracking

- transport_companies.
- transport_vehicles.
- transport_drivers.
- transport_driver_credentials.
- transport_vehicle_documents.
- transport_orders.
- transport_trips.
- transport_trip_assignments.
- transport_routes.
- transport_route_stops.
- transport_gps_pings.
- transport_geofences.
- transport_milestones.
- transport_waybills.
- transport_delivery_notes.
- transport_incidents.
- transport_proof_of_delivery.
- transport_trip_expenses.
- transport_trip_settlements.
- transport_operation_closures.

### 9.8 Documentos comerciales

- trade_documents.
- trade_commercial_invoices.
- trade_proforma_invoices.
- trade_packing_lists.
- trade_packing_list_items.
- trade_bills_of_lading.
- trade_air_waybills.
- trade_certificates_of_origin.
- trade_shipping_instructions.
- trade_payment_receipts.
- trade_credit_notes.
- trade_debit_notes.
- trade_commercial_closures.

### 9.9 Expedientes y gobernanza documental

- document_types.
- document_templates.
- document_template_fields.
- document_template_rules.
- document_instances.
- document_versions.
- document_state_history.
- document_approvals.
- document_signatures.
- document_observations.
- document_remediations.
- document_retention_rules.
- cargo_files.
- cargo_file_parties.
- cargo_file_documents.
- cargo_file_checklists.
- cargo_file_checklist_items.
- cargo_file_milestones.
- cargo_file_status_history.
- cargo_file_alerts.
- governance_matrices.
- governance_matrix_rules.
- document_type_workflows.
- workflow_steps.
- workflow_assignments.
- workflow_decisions.
- controlled_delete_requests.

### 9.10 Notificaciones, soporte y auditoría

- notifications.
- notification_preferences.
- alert_rules.
- alert_events.
- conversations.
- conversation_participants.
- conversation_messages.
- support_cases.
- support_case_messages.
- complaints.
- claims.
- audit_logs.
- immutable_audit_events.
- data_integrity_events.
- system_health_checks.
- background_jobs.
- scheduled_tasks.
- backup_records.
- security_events.
- session_logs.

### 9.11 Sistema FUR y catálogos técnicos

- fur_records.
- fur_types.
- fur_versions.
- fur_fields.
- fur_approvals.
- fur_observations.
- fur_history.
- fur_attachments.
- functional_modules.
- module_profiles.
- use_cases.
- use_case_steps.
- use_case_rules.
- database_table_catalog.
- database_field_catalog.
- api_endpoint_catalog.
- business_rule_catalog.
- global_parameters.
- technical_catalogs.

Para cada tabla propia indicar:

- Nombre técnico.
- Nombre funcional.
- Descripción.
- Campos principales.
- Tipo de datos.
- Clave primaria.
- Claves foráneas.
- Relaciones.
- Índices.
- Reglas de negocio.
- Módulo funcional.
- Perfil asociado.
- Endpoints relacionados.
- Campos de auditoría.
- Estrategia de versionado.
- Estrategia de eliminación lógica.
- Restricciones de integridad.

---

## 10. Reglas generales de la solución

- Todos los perfiles deberán operar mediante roles y permisos.
- Cada organización podrá tener usuarios internos con permisos delegados.
- Cada proveedor tendrá un perfil público y un dashboard privado.
- Cada servicio deberá registrarse mediante una FUR.
- Cada carga deberá contar con un expediente único.
- Cada documento deberá estar asociado a un tipo documental.
- Cada documento deberá conservar su historial de versiones.
- Los documentos regulatorios cerrados no se eliminarán físicamente.
- La eliminación excepcional requerirá autorización, justificación y auditoría.
- Cada operación deberá mantener trazabilidad por usuario, fecha, estado y acción.
- Los checklists deberán configurarse por tipo de carga, régimen y operación.
- Las observaciones deberán tener responsable, fecha, estado y evidencia de cierre.
- Las subsanaciones deberán conservar la relación con la observación original.
- Los vencimientos deberán generar alertas.
- Los cambios de estado deberán registrarse en historial.
- La matriz de gobernanza será la fuente única de permisos documentales.
- Los permisos no deberán codificarse de forma aislada dentro de cada módulo.
- Las aprobaciones deberán respetar la segregación de funciones.
- Las declaraciones aduaneras deberán conservar versiones.
- Los manifiestos deberán permitir conciliación y registro de discrepancias.
- Los certificados de depósito y bonos de prenda deberán conservar vigencia e historial.
- Los movimientos de inventario deberán mantener trazabilidad.
- Los viajes deberán registrar vehículo, conductor, ruta, documentos, hitos y POD.
- Las cotizaciones deberán conservar versiones.
- Las propuestas técnicas y económicas deberán gestionarse separadamente.
- Los contratos deberán relacionarse con cotizaciones, órdenes, hitos, documentos, pagos y garantías.
- Las valoraciones solo podrán generarse después de una operación válida y cerrada.
- Las reseñas verificadas deberán relacionarse con una contratación u orden real.
- La reputación deberá calcularse mediante indicadores verificables.
- Las acciones críticas deberán registrarse en auditoría inmutable.
- Los archivos deberán asociarse mediante metadatos y no depender únicamente del nombre físico.
- Los catálogos maestros deberán versionarse.
- Los estados deberán implementarse mediante máquinas de estado controladas.
- Las tablas propias solo se crearán cuando la estructura referencial de Odoo no cubra la lógica requerida.
- No se realizará integración directa con Odoo.
- Odoo se utilizará únicamente como referencia funcional y de normalización.
- Las integraciones externas con organismos o plataformas deberán definirse mediante contratos técnicos independientes y no asumirse automáticamente.
- La solución deberá estar preparada para crecimiento modular y separación por dominios.

---

## 11. Entregables requeridos

El resultado deberá incluir:

- Mapa general del sitio.
- Mapa del portal público.
- Mapa del Home.
- Mapa de categorías.
- Directorio de proveedores.
- Fichas públicas.
- Perfiles públicos.
- Perfiles privados.
- Dashboard de cada perfil.
- Indicadores de cada dashboard.
- Módulos funcionales por perfil.
- Flujos operativos por perfil.
- Flujo end-to-end de una carga.
- Sistema completo de FUR.
- Catálogo de documentos maestros.
- Catálogo de tipos de carga.
- Matriz de roles y permisos.
- Matriz de gobernanza documental.
- Reglas de aprobación.
- Reglas de retención.
- Módulos referenciales de Odoo.
- Tablas nativas referenciales de Odoo.
- Tablas propias del Marketplace.
- Relaciones entre módulos, perfiles, FUR y tablas.
- Casos de uso principales.
- Reglas de negocio.
- Arquitectura tecnológica.
- Librerías recomendadas.
- Estructura de APIs.
- Estructura de módulos NestJS.
- Estructura de rutas React.
- Flujos de cotización.
- Flujos de contratación.
- Flujos aduaneros.
- Flujos portuarios.
- Flujos AGD.
- Flujos WMS.
- Flujos de transporte.
- Flujos documentales.
- Flujos financieros.
- Flujos de reputación.
- Flujos de soporte e incidencias.
- Auditoría.
- Integridad del dato.
- Seguridad.
- Notificaciones.
- Reportes y analítica.
- Catálogos técnicos.
- Parámetros globales.

El contenido deberá presentarse de forma jerárquica, detallada, normalizada y organizada por ecosistemas, perfiles, módulos, procesos, FUR, tablas de base de datos y casos de uso.

---

## 12. Árbol maestro del mapa del sitio

```text
MARKETPLACE LOGÍSTICO INTEGRAL
│
├── 01. PORTAL PÚBLICO
│   ├── Home
│   ├── Categorías
│   ├── Servicios
│   ├── Proveedores
│   ├── Agencias aduanales
│   ├── Transportistas
│   ├── Operadores portuarios
│   ├── AGD y almacenes
│   ├── Comercio exterior
│   ├── Ofertas y promociones
│   ├── Comparador
│   ├── Carrito
│   ├── Cotizaciones
│   ├── Seguimiento público
│   ├── Valoraciones
│   ├── Recursos
│   ├── Ayuda
│   ├── Registro
│   └── Inicio de sesión
│
├── 02. CATÁLOGO Y DIRECTORIOS
│   ├── Catálogo de categorías
│   ├── Catálogo de servicios
│   ├── Ficha pública de servicio
│   ├── Directorio de proveedores
│   ├── Perfil público del proveedor
│   ├── Portafolios
│   ├── Certificaciones
│   ├── Reputación
│   └── Comparador
│
├── 03. OPERACIONES ADUANERAS
│   ├── Expedientes
│   ├── Declaraciones
│   ├── Clasificación
│   ├── Valoración
│   ├── Tributos
│   ├── Selectividad
│   ├── Inspecciones
│   ├── Requerimientos
│   ├── Subsanaciones
│   └── Levante
│
├── 04. OPERACIONES PORTUARIAS
│   ├── Buques
│   ├── Arribos
│   ├── Atraques
│   ├── Muelles
│   ├── Ventanas operativas
│   ├── Manifiestos
│   ├── Contenedores
│   ├── Descarga
│   ├── Patio
│   ├── Gate in / Gate out
│   ├── Conciliación
│   └── Retiro
│
├── 05. AGD
│   ├── Solicitudes de ingreso
│   ├── Recepción
│   ├── Custodia
│   ├── Inventario
│   ├── Certificado de Depósito
│   ├── Bono de Prenda
│   ├── Picking
│   ├── Despacho
│   └── Cierre
│
├── 06. WMS Y ALMACENES
│   ├── Productos y SKU
│   ├── Lotes y series
│   ├── Ubicaciones
│   ├── Recepciones
│   ├── Inventario
│   ├── Movimientos
│   ├── Conteos
│   ├── Picking
│   ├── Packing
│   ├── Despachos
│   └── Evidencias
│
├── 07. TRANSPORTE
│   ├── Flota
│   ├── Conductores
│   ├── Solicitudes
│   ├── Órdenes
│   ├── Viajes
│   ├── Rutas
│   ├── Tracking
│   ├── Geocercas
│   ├── Documentos
│   ├── Incidencias
│   ├── POD
│   └── Liquidaciones
│
├── 08. DOCUMENTOS COMERCIALES
│   ├── RFQ
│   ├── Cotizaciones
│   ├── Propuestas
│   ├── Órdenes
│   ├── Facturas
│   ├── Packing List
│   ├── BL
│   ├── AWB
│   ├── Certificados
│   ├── Comprobantes
│   └── Cierre comercial
│
├── 09. GOBERNANZA DOCUMENTAL
│   ├── Plantillas
│   ├── Tipos documentales
│   ├── Documentos
│   ├── Versiones
│   ├── Workflows
│   ├── Aprobaciones
│   ├── Expedientes
│   ├── Checklists
│   ├── Observaciones
│   ├── Subsanaciones
│   ├── Matriz de gobernanza
│   ├── Retención
│   ├── Alertas
│   └── Auditoría
│
├── 10. CUENTA DEL CLIENTE
│   ├── Dashboard
│   ├── Perfil
│   ├── Solicitudes
│   ├── Cotizaciones
│   ├── Operaciones
│   ├── Cargas
│   ├── Expedientes
│   ├── Documentos
│   ├── Tracking
│   ├── Contratos
│   ├── Facturas
│   ├── Pagos
│   ├── Valoraciones
│   └── Soporte
│
├── 11. PORTALES OPERATIVOS
│   ├── Agente de Aduana
│   ├── Operador Portuario
│   ├── Operador AGD
│   ├── Operador WMS
│   ├── Transportista
│   ├── Proveedor Logístico
│   ├── Analista SENIAT / SIDUNEA
│   └── Administrador Documental
│
├── 12. ADMINISTRACIÓN Y GOBERNANZA
│   ├── Usuarios
│   ├── Organizaciones
│   ├── Roles
│   ├── Permisos
│   ├── Módulos
│   ├── Workflows
│   ├── Catálogos
│   ├── Parámetros
│   ├── Cumplimiento
│   ├── Riesgos
│   ├── Auditoría
│   ├── Reportes
│   ├── Salud del sistema
│   ├── Backups
│   ├── Seguridad
│   └── Configuración
│
└── 13. SISTEMA MAESTRO DE FUR
    ├── FUR de usuarios
    ├── FUR de proveedores
    ├── FUR de servicios
    ├── FUR de cargas
    ├── FUR de documentos
    ├── FUR de ofertas
    ├── FUR de módulos
    ├── FUR de casos de uso
    ├── FUR de tablas Odoo
    ├── FUR de tablas propias
    └── FUR de gobernanza
```
