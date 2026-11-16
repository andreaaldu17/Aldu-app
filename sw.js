/* Barbershop Da Aldu - notifiche sul telefono (anche con l'app chiusa) */
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("push",function(e){
  var d={};
  try{d=e.data?e.data.json():{}}catch(x){try{d={m:e.data.text()}}catch(y){}}
  var ic=new URL("logo-notifica.png",self.registration.scope.replace(/[^\/]*$/,"")).href;
  e.waitUntil(self.registration.showNotification(d.t||"Barbershop Da Aldu",{body:d.m||"Hai una novità",icon:ic,badge:ic,data:{u:d.u||""}}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var u=(e.notification.data&&e.notification.data.u)||self.registration.scope,k=function(s){return String(s).split("#")[0].split("?")[0]};
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){if(k(l[i].url)==k(u)&&"focus" in l[i])return l[i].focus()}
    if(self.clients.openWindow)return self.clients.openWindow(u);
  }));
});
