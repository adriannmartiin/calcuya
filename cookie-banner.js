/* CalcuYa — Cookie Consent Banner GDPR */
(function () {
  'use strict';

  var STORAGE_KEY = 'calcuya_cookie_consent';
  var consent = null;
  try { consent = localStorage.getItem(STORAGE_KEY); } catch(e) {}
  if (consent) return; // ya decidió

  var style = document.createElement('style');
  style.textContent = [
    '#cy-cookie{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#0f172a;color:#e2e8f0;',
    'padding:16px 20px;display:flex;align-items:center;justify-content:space-between;',
    'gap:16px;flex-wrap:wrap;border-top:2px solid #065f46;',
    'font-family:"DM Sans",sans-serif;font-size:14px;line-height:1.5;}',
    '#cy-cookie p{margin:0;flex:1;min-width:220px;}',
    '#cy-cookie a{color:#34d399;text-decoration:underline;}',
    '#cy-cookie .cy-btns{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;}',
    '#cy-cookie button{height:40px;padding:0 20px;border-radius:8px;font-family:inherit;',
    'font-size:14px;font-weight:600;cursor:pointer;border:none;transition:opacity .15s;}',
    '#cy-accept{background:#065f46;color:#fff;}',
    '#cy-accept:hover{background:#047857;}',
    '#cy-reject{background:transparent;color:#94a3b8;border:1px solid #334155 !important;}',
    '#cy-reject:hover{color:#e2e8f0;}',
    '@media(max-width:600px){#cy-cookie{flex-direction:column;align-items:stretch;}',
    '#cy-cookie .cy-btns{justify-content:stretch;}',
    '#cy-cookie button{flex:1;}}'
  ].join('');
  document.head.appendChild(style);

  var banner = document.createElement('div');
  banner.id = 'cy-cookie';
  banner.innerHTML = [
    '<p>Usamos cookies propias y de terceros (Google Analytics, AdSense) para mejorar tu experiencia ',
    'y mostrarte publicidad relevante. Puedes <a href="/cookies.html">gestionar tus preferencias</a>.</p>',
    '<div class="cy-btns">',
    '<button id="cy-reject">Solo esenciales</button>',
    '<button id="cy-accept">Aceptar todas</button>',
    '</div>'
  ].join('');

  function save(val) {
    try { localStorage.setItem(STORAGE_KEY, val); } catch(e) {}
    banner.style.transition = 'opacity .3s';
    banner.style.opacity = '0';
    setTimeout(function(){ banner.remove(); }, 320);
    if (val === 'all') activateAds();
  }

  function activateAds() {
    // Activa AdSense una vez el usuario da consentimiento
    // El script de AdSense ya debe estar cargado en modo no personalizado
    // Aquí podríamos cargar scripts de Analytics adicionales si fuera necesario
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(banner);
    document.getElementById('cy-accept').addEventListener('click', function(){ save('all'); });
    document.getElementById('cy-reject').addEventListener('click', function(){ save('essential'); });
  });

  // Fallback si DOMContentLoaded ya pasó
  if (document.readyState !== 'loading') {
    document.body.appendChild(banner);
    document.getElementById('cy-accept').addEventListener('click', function(){ save('all'); });
    document.getElementById('cy-reject').addEventListener('click', function(){ save('essential'); });
  }
})();
