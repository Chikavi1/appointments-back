# API de Gestión de Citas

A continuación se detallan los endpoints disponibles en la API para la gestión de citas:

## Endpoints Disponibles

### Obtener Todas las Citas

```plaintext
GET /api/index
GET /api/get/:id
POST /api/create
**Datos Requeridos:**
```json
{
  "curp": "string",
  "date": "string (formato YYYY-MM-DD)"
}

PUT /api/update/:id

**Datos Requeridos:**
```json
{
  "curp": "string",
  "date": "string (formato YYYY-MM-DD)"
}
DELETE /api/delete/:id

**Datos Requeridos:**
```json
{
  "folio": "string",
  "id_user": "string"
}