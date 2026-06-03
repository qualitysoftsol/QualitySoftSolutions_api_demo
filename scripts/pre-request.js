// pre-request.js - ejemplo
// Establece timestamp y nonce
pm.variables.set('timestamp', Date.now());
// Si existe una API key en environment, la añade al header automáticamente (ejemplo)
if (pm.environment.get('apiKey')) {
  pm.request.headers.add({key: 'x-api-key', value: pm.environment.get('apiKey')});
}