# API Testing Demo — Postman + Newman

![Run API Tests](https://github.com/qualitysoftsol/QualitySoftSolutions_api_demo/actions/workflows/run-api-tests.yml/badge.svg)
![Publish Report](https://github.com/qualitysoftsol/QualitySoftSolutions_api_demo/actions/workflows/publish-report-gh-pages.yml/badge.svg)

> Proyecto demo que muestra buenas prácticas en **API Testing** usando **Postman** para diseño de colecciones y **Newman** para ejecución automatizada e integración CI/CD.

## Tabla de contenidos
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Configuración inicial](#configuración-inicial)
- [Ejecución local](#ejecución-local)
- [Casos de prueba](#casos-de-prueba)
- [Scripts reutilizables](#scripts-reutilizables)
- [Integración CI/CD](#integración-cicd)
- [Licencia](#licencia)

---

## Estructura del proyecto

```
api-testing-postman-newman/
├── .github/workflows/        # Pipelines de GitHub Actions
│   ├── run-api-tests.yml     # Ejecuta pruebas en push/PR
│   └── publish-report-gh-pages.yml  # Publica reporte en GitHub Pages
├── collections/              # Colecciones Postman (.json)
├── data/                     # Datos para pruebas parametrizadas (CSV, JSON)
├── environments/             # Variables por ambiente
│   ├── local.postman_environment.example.json  # Plantilla para entorno local
│   └── qa.postman_environment.json             # Entorno QA (sin credenciales reales)
├── scripts/                  # Snippets de referencia para pre-request y tests
└── reports/                  # Reportes generados por Newman (excluidos del repo)
```

---

## Requisitos

- Node.js >= 14
- Newman y reporter HTML:
  ```bash
  npm install
  ```
  o globalmente:
  ```bash
  npm install -g newman newman-reporter-htmlextra
  ```

---

## Configuración inicial

**Entorno local:** copia la plantilla y agrega tu API key:

```bash
cp environments/local.postman_environment.example.json environments/local.postman_environment.json
```

Abre `environments/local.postman_environment.json` y reemplaza `YOUR_API_KEY_HERE` con tu clave de [reqres.in](https://reqres.in).

> El archivo `local.postman_environment.json` está en `.gitignore` para evitar exponer credenciales.

**Entorno CI/CD:** configura el secret `REQRES_API_KEY` en:
`GitHub → Settings → Secrets and variables → Actions → New repository secret`

---

## Ejecución local

```bash
# Instala dependencias
npm ci

# Ejecuta pruebas en entorno local
npm run test:local

# Ejecuta pruebas en entorno QA (requiere environments/qa.postman_environment.json configurado)
npm run test:qa
```

Los reportes se generan en `reports/html/` (HTML) y `reports/junit/` (JUnit XML).

---

## Casos de prueba

| # | Método | Endpoint | Descripción | Resultado esperado |
|---|--------|----------|-------------|-------------------|
| 1 | GET | `/api/users?page=2` | Listar usuarios paginados | ✅ Pasa — tiempo < 700ms |
| 2 | GET | `/api/users/2` | **[DEMO]** Test con fallo intencional | ❌ Falla — tiempo < 5ms (imposible) |
| 3 | POST | `/api/users` | Crear usuario | ⏭ Skipped — endpoint disponible pero omitido como demo de skip |
| 4 | POST | `/api/login` | Login exitoso | Sin assertions (demo de request sin test) |
| 5 | PUT | `/api/users/2` | Actualizar usuario | Sin assertions (demo de request sin test) |
| 6 | DELETE | `/api/users/2` | Eliminar usuario | Sin assertions (demo de request sin test) |

### Sobre el test de fallo intencional (#2)

El caso **"List Users Failed"** tiene una assertion `below(5ms)` que **siempre fallará** en condiciones reales (cualquier llamada HTTP tarda más de 5ms). Su propósito es educativo: mostrar cómo se visualiza un test fallido en los reportes HTML y JUnit. En un proyecto real, el umbral sería 500ms o más.

---

## Scripts reutilizables

La carpeta `scripts/` contiene snippets de referencia que puedes copiar directamente al editor de Postman:

- `pre-request.js` — ejemplo de cómo establecer timestamp y agregar headers dinámicos antes de cada request
- `tests.js` — funciones helper reutilizables para assertions comunes

> Postman no importa estos archivos automáticamente. Son plantillas de código para copiar/pegar en el editor de scripts de cada request o colección.

---

## Integración CI/CD

El proyecto incluye dos workflows de GitHub Actions:

### `run-api-tests.yml`
Se ejecuta en cada **push a `main`** y en **pull requests**. Corre la colección completa, genera reportes HTML y JUnit, y los sube como artifact descargable.

### `publish-report-gh-pages.yml`
Se ejecuta en cada **push a `main`**. Genera el reporte HTML del entorno QA y lo publica en **GitHub Pages** (rama `gh-pages`).

El API key se inyecta en tiempo de ejecución desde el secret `REQRES_API_KEY` para no exponer credenciales en el repositorio.

---

## Licencia

MIT
