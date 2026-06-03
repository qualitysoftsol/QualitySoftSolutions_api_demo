// tests.js - funciones reutilizables
function expectStatus200() { pm.test('Status is 200', ()=> pm.response.to.have.status(200)); }
function expectArray() { pm.test('Body is array', ()=> pm.expect(pm.response.json()).to.be.an('array')); }
// Export functions to global (Postman doesn't support modules, but we keep as snippet)