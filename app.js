'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const images = [
 {id:'cap01',title:'Bastidor inicial',category:'estructura',caption:'Ocho montantes y módulos de 440 / 520 / 440 mm.',checked:'Se distingue la distribución estructural inicial.',limit:'Etapa anterior a incorporar las uniones y los rieles medios.',source:'capture_cad · 8e6e07a27fb74328bec51b776599a84d'},
 {id:'cap03',title:'La sección del perfil',category:'estructura',caption:'Cuatro ranuras y un núcleo de 6,8 mm.',checked:'La sección construida mide 40 × 40 mm.',limit:'Reconstrucción poligonal, no CAD oficial. Área aproximada +1,62% frente al dato de fabricante.',source:'capture_cad · afe7b79e2a2447aa9a5731f78e8385e7'},
 {id:'cap06',title:'Unión de travesaño',category:'uniones',caption:'Escuadra y ejes de tornillos corregidos.',checked:'Tornillos perpendiculares a las caras correspondientes.',limit:'La tuerca y el espesor de escuadra siguen simplificados. Falta validar su interfaz exacta.',source:'capture_cad · ad4edaf9ffe24520a43809892ca1eb2a'},
 {id:'live25',title:'Apoyos, desde abajo',category:'estructura',caption:'Tres líneas de apoyo por módulo.',checked:'La vista inferior muestra los rieles medios y la base ampliada.',limit:'La conexión resistente de base necesita redimensionamiento o ensayo.',source:'freecad_bridge / get_view · 84c5c237b87042598906621445d5efe7'},
 {id:'live28',title:'Madera y aluminio, en corte',category:'uniones',caption:'El paquete de fijación, a la vista.',checked:'Se diferencian tornillo, arandela, tablero y tuerca en un corte de formas reales.',limit:'Rosca simplificada y cuerpo de tuerca provisional. Documento auxiliar, excluido del cómputo físico.',source:'freecad_bridge / get_view · e4f2614cd18f4e07ad4af9765047aeb8'},
 {id:'live33',title:'Correderas extendidas',category:'uniones',caption:'Miembros fijos, intermedios y móviles.',checked:'Se representan los dos conjuntos en posición de apertura.',limit:'Modelo funcional con patrón de agujeros parcial. No acredita carga ni desconexión del producto real.',source:'freecad_bridge / get_view · 041cb9f9494f4dc7a3f660d5ac29fb13'},
 {id:'live34',title:'Cazoleta y placa',category:'uniones',caption:'La bisagra se revisa como interfaz.',checked:'La cazoleta queda orientada hacia la perforación de puerta.',limit:'Brazo provisional: no representa el mecanismo Blum ni su volumen barrido.',source:'freecad_bridge / get_view · 0dfffe6f52e543dbbe76ffcd7f52a7c2'},
 {id:'live36',title:'Tapa reemplazable',category:'uniones',caption:'Fijación accesible desde abajo.',checked:'Se ve la escuadra bajo la tapa y su enlace al lateral del perfil.',limit:'El pretaladro y el apriete en madera aún requieren validación.',source:'freecad_bridge / get_view · 3ba47d32504b4346b1853d304a5bd056'},
 {id:'live38',title:'Tornillos propios de cajón',category:'uniones',caption:'Un componente distinto para otra función.',checked:'Dos tornillos de madera de 4 × 12 mm fijan caras perpendiculares del ángulo de 1,5 mm.',limit:'Penetración nominal 10,5 mm. Resistencia de extracción y pretaladro pendientes.',source:'freecad_bridge / get_view · a5aa63c87e4140dcadfa78f552a2f7fd'},
 {id:'live30',title:'Cajones y puertas abiertos',category:'conjunto',caption:'Seis cajones a 508 mm; puertas a 86°.',checked:'La captura muestra las posiciones finales rígidas de apertura.',limit:'No simula el mecanismo de cuatro barras ni verifica el barrido continuo.',source:'freecad_bridge / get_view · ec4a9abc2fb744a9a0f2b48d7b0b2608'},
 {id:'live32',title:'Vista explotada',category:'conjunto',caption:'Los subsistemas se pueden distinguir.',checked:'Tapa, panel, almacenamiento y puertas se separan del bastidor.',limit:'Desplazamientos documentales, no secuencia cinemática. Vista anterior a la corrección E15 de tornillería.',source:'freecad_bridge / get_view · 78192cd6dfe842989b9a868febd0ff6c'},
 {id:'live40',title:'La cara posterior',category:'conjunto',caption:'Panel, canal y soportes distribuidos.',checked:'Se ven los soportes de canal y ocho puntos de fijación del panel.',limit:'La proyección oculta profundidad; la separación entre piezas se revisa con booleanas.',source:'freecad_bridge / get_view · bf39d668122c4103ab6e48b2d17f2702'}
];
const extraImages = [
 {id:'live39',title:'Conjunto cerrado final',checked:'Seis cajones, dos puertas centrales, tapa reemplazable y estructura de aluminio.',limit:'Prototipo no liberado para fabricar ni utilizar. Pendientes de base, antivuelco e interfaces comerciales.',source:'freecad_bridge / get_view · 1263f1f44ac94dc7814006f5c275ea09'},
 {id:'cap05',title:'Antes: orientación incorrecta',checked:'La selección aislada dejó visible el error del eje del tornillo.',limit:'Configuración histórica incorrecta, corregida en cap06. No usar como referencia de montaje.',source:'capture_cad · 11665602bdc64b9e90c25766d1e32ebc'}
];
const allImages = images.concat(extraImages);
const gallery = $('#gallery-grid');
images.forEach((entry, i) => {
 const article = document.createElement('article'); article.className = 'gallery-item'; article.dataset.category = entry.category;
 const button = document.createElement('button');button.type = 'button';button.className = 'image-open';button.dataset.image = entry.id;button.setAttribute('aria-label','Ampliar: '+entry.title);
 const img=document.createElement('img');img.src='assets/'+entry.id+'.png';img.alt=entry.title+'. '+entry.caption;img.loading='lazy';img.width=1100;img.height=800;
 const zoom=document.createElement('span');zoom.className='image-zoom';zoom.textContent='↗';zoom.setAttribute('aria-hidden','true');
 button.append(img,zoom);
 const caption=document.createElement('div');caption.className='gallery-caption';
 const index=document.createElement('span');index.textContent=String(i+1).padStart(2,'0');
 const body=document.createElement('div');const title=document.createElement('h3');title.textContent=entry.title;const text=document.createElement('p');text.textContent=entry.caption;body.append(title,text);caption.append(index,body);article.append(button,caption);gallery.append(article);
});
let currentImage = 0, previousFocus = null;
const dialog=$('#image-dialog');
function displayImage(id) {
 const found=allImages.findIndex(item=>item.id===id);if(found<0)return;
 currentImage=found;const data=allImages[currentImage];
 $('#dialog-title').textContent=data.title;$('#dialog-image').src='assets/'+data.id+'.png';$('#dialog-image').alt=data.title;
 $('#dialog-checked').textContent='Comprobado: '+data.checked;$('#dialog-limit').textContent='Alcance: '+data.limit;
 $('#dialog-source').textContent='Procedencia: '+data.source+' · Consultá assets/procedencia.json para revisión y hash.';
}
document.addEventListener('click',e=>{
 const trigger=e.target.closest('.image-open');if(!trigger)return;
 previousFocus=trigger;displayImage(trigger.dataset.image);dialog.showModal();document.body.style.overflow='hidden';
});
function closeDialog(){dialog.close();}
$('#close-dialog').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog();});
dialog.addEventListener('close',()=>{document.body.style.overflow='';if(previousFocus)previousFocus.focus({preventScroll:true});});
function moveImage(delta){displayImage(allImages[(currentImage+delta+allImages.length)%allImages.length].id);}
$('#previous-image').addEventListener('click',()=>moveImage(-1));$('#next-image').addEventListener('click',()=>moveImage(1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();moveImage(-1);}if(e.key==='ArrowRight'){e.preventDefault();moveImage(1);}});
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 $$('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
 $$('.gallery-item').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter);
}));
const captions={
 live39:'Conjunto cerrado final · cuerpo de 1600 × 750 × 900 mm.',
 live30:'Apertura rígida representada: cajones a 508 mm y puertas a 86°. Mecanismo de bisagra pendiente.',
 live32:'Explosión documental por subsistemas, previa a E15. No añade piezas al cómputo físico.',
 live40:'Vista posterior final: panel de herramientas y canal de cables con sus soportes.'
};
function selectView(button, focus=false){
 $$('[data-view]').forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
 const id=button.dataset.view;$('#case-image').src='assets/'+id+'.png';$('#case-image').alt=allImages.find(i=>i.id===id).title;$('#case-image').parentElement.dataset.image=id;
 $('#case-image').parentElement.setAttribute('aria-label','Ampliar: '+allImages.find(i=>i.id===id).title);
 $('#view-caption').textContent=captions[id];$('#view-panel').setAttribute('aria-labelledby',button.id);if(focus)button.focus();
}
$$('[data-view]').forEach((button,index,list)=>{
 button.addEventListener('click',()=>selectView(button));
 button.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight')n=(index+1)%list.length;if(e.key==='ArrowLeft')n=(index-1+list.length)%list.length;if(e.key==='Home')n=0;if(e.key==='End')n=list.length-1;if(n!==null){e.preventDefault();selectView(list[n],true);}});
});
$$('[data-compare]').forEach(button=>button.addEventListener('click',()=>{
 const before=button.dataset.compare==='before';const id=before?'cap05':'cap06';
 $$('[data-compare]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 $('#comparison-image').src='assets/'+id+'.png';$('#comparison-image').alt=before?'Unión histórica con orientación incorrecta del tornillo':'Unión con ejes de tornillos corregidos';
 $('#comparison-image').parentElement.dataset.image=id;
 $('#comparison-caption').textContent=before?'La captura aislada permitió detectar un tornillo con un eje distinto del previsto.':'Se corrigieron los ejes. La tuerca y la escuadra simplificadas siguen requiriendo geometría comercial exacta.';
}));
function updateDiagram(){
 const W=Number($('#width-range').value),MW=(W-720)/2,box=MW-66;
 $('#width-value').textContent=W+' mm';$('#module-value').textContent=MW+' mm';$('#drawer-value').textContent=box+' mm';$('#diagram-width').textContent=W+' mm';
 $('#diagram-title').textContent='Distribución frontal: ancho '+W+' mm, módulos laterales '+MW+' mm, centro 520 mm. Diagrama ilustrativo.';
 const ns='http://www.w3.org/2000/svg',group=$('#diagram-parts');group.replaceChildren();
 function add(tag,attrs,text){const el=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));if(text)el.textContent=text;group.append(el);return el;}
 const s=500/W,left=60,right=560,p=40*s,m=20*s;
 add('rect',{x:left,y:80,width:500,height:12,fill:'#173b36'});
 const xs=[left+m,left+m+p+MW*s,left+m+2*p+(MW+520)*s,left+m+3*p+(2*MW+520)*s];
 xs.forEach(x=>{add('rect',{x:x,y:92,width:p,height:205,fill:'url(#hatch)',stroke:'#6e8778','stroke-width':1});});
 add('rect',{x:left,y:289,width:500,height:10,fill:'#173b36'});
 const bays=[{x:xs[0]+p,w:MW*s,text:MW+' mm',drawer:true},{x:xs[1]+p,w:520*s,text:'520 mm',drawer:false},{x:xs[2]+p,w:MW*s,text:MW+' mm',drawer:true}];
 bays.forEach(b=>{
  add('rect',{x:b.x+2,y:102,width:b.w-4,height:177,fill:b.drawer?'#d7a781':'#b1c3af',stroke:'#173b36','stroke-width':1});
  if(b.drawer){[174,232].forEach(y=>add('line',{x1:b.x+2,y1:y,x2:b.x+b.w-2,y2:y,stroke:'#173b36','stroke-width':1}));[140,201,255].forEach(y=>add('line',{x1:b.x+b.w*.35,y1:y,x2:b.x+b.w*.65,y2:y,stroke:'#173b36','stroke-width':3}));}
  else{add('line',{x1:b.x+b.w/2,y1:102,x2:b.x+b.w/2,y2:279,stroke:'#173b36','stroke-width':1});[.43,.57].forEach(t=>add('line',{x1:b.x+b.w*t,y1:170,x2:b.x+b.w*t,y2:197,stroke:'#173b36','stroke-width':3}));}
  add('text',{x:b.x+b.w/2,y:334,'text-anchor':'middle',class:'diagram-small'},b.text);
 });
}
$('#width-range').addEventListener('input',updateDiagram);$('#reset-width').addEventListener('click',()=>{$('#width-range').value='1600';updateDiagram();});updateDiagram();
const industries={
 manufactura:{kicker:'PUESTOS Y DISPOSITIVOS',heading:'Una estación que se adapta al proceso.',problem:'Un puesto de montaje debe recibir tres tamaños de producto, sin perder acceso a herramientas y fijaciones.',contribution:'Relacionar dimensiones base, familias de perfiles y posiciones de apoyo; conservar por qué cambia cada variante.',output:'Un ensamble con variantes, piezas independientes, cortes y cuestiones de acceso listas para revisar.',limit:'La rigidez, los esfuerzos de operación y las uniones requieren cálculo y validación del equipo responsable.',tags:['Puestos de montaje','Utillajes','Mesas de inspección']},
 automatizacion:{kicker:'ESTRUCTURAS Y ACCESO',heading:'La integración mecánica también necesita contexto.',problem:'Un equipo incorpora cámaras, sensores y dispositivos que comparten una estructura y necesitan mantenimiento.',contribution:'Vincular soportes con sus anfitriones, separar subsistemas y registrar interferencias, rutas de acceso y decisiones.',output:'Una propuesta de bastidor, soportes y envolventes con relaciones y revisiones localizables.',limit:'Las funciones de seguridad, resguardos, normativa y validación de la máquina no quedan certificadas por el modelo.',tags:['Bastidores','Soportes de sensores','Integración mecánica']},
 logistica:{kicker:'ESPACIO Y OPERACIÓN',heading:'Cada centímetro participa del flujo.',problem:'Una estación de preparación de pedidos debe combinar almacenamiento, superficie de trabajo y acceso a dispositivos.',contribution:'Explorar la distribución, vincular módulos y documentar dimensiones de uso, apertura y mantenimiento.',output:'Variantes comparables de estaciones y módulos, con geometría, lista de piezas y pendientes de validación.',limit:'Cargas, estabilidad, ergonomía y circulación deben verificarse para el lugar y la operación reales.',tags:['Estaciones de picking','Mesas de empaque','Módulos de almacenamiento']},
 retail:{kicker:'FAMILIAS DE MOBILIARIO',heading:'Una familia, varias implantaciones.',problem:'Un exhibidor o mostrador necesita adaptarse a locales con distintos anchos, manteniendo una construcción reconocible.',contribution:'Centralizar medidas y espesores, repetir componentes y registrar excepciones sin perder sus dependencias.',output:'Una familia paramétrica con variantes de distribución y documentación para comparar antes de producir.',limit:'Herrajes, anclajes, acabados, resistencia y requisitos del espacio deben resolverse en cada instalación.',tags:['Exhibidores','Mostradores','Mobiliario modular']},
 laboratorios:{kicker:'EQUIPAMIENTO Y MANTENIMIENTO',heading:'Un soporte debe explicar cómo se mantiene.',problem:'Una mesa de instrumentación reúne equipos, cables y superficies que necesitan acceso y reemplazo.',contribution:'Organizar apoyos y fijaciones por subsistema y conservar las fuentes técnicas de sus interfaces.',output:'Una propuesta mecánica revisable con rutas de cables, componentes reemplazables y condiciones pendientes.',limit:'Compatibilidad química, higiene, vibración, electricidad y requisitos sanitarios exigen validación especializada.',tags:['Mesas de instrumentación','Soportes de equipos','Gestión de cables']},
 formacion:{kicker:'APRENDER CON EVIDENCIA',heading:'Del modelo bonito a la decisión explicada.',problem:'Un grupo necesita entender por qué una unión funciona, qué cambia con una dimensión y cómo se detecta un error.',contribution:'Hacer visibles parámetros, relaciones, revisiones e imágenes del antes y después de una corrección.',output:'Un caso de estudio reproducible con hipótesis, decisiones y verificaciones que se pueden discutir.',limit:'El uso didáctico no sustituye una aprobación de fabricación ni una validación estructural.',tags:['Diseño paramétrico','Talleres de CAD','Proyectos de ingeniería']}
};
function selectIndustry(button,focus=false){
 const d=industries[button.dataset.industry];
 $$('[data-industry]').forEach(b=>{const active=b===button;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
 $('#industry-panel').setAttribute('aria-labelledby',button.id);$('#industry-kicker').textContent=d.kicker;$('#industry-heading').textContent=d.heading;
 const content=$('#industry-content');content.replaceChildren();
 [['Problema',d.problem],['Cómo aporta',d.contribution],['Resultado',d.output],['A revisar',d.limit]].forEach(([label,text])=>{const row=document.createElement('div');row.className='industry-use-case';const b=document.createElement('b');b.textContent=label;const p=document.createElement('p');p.textContent=text;row.append(b,p);content.append(row);});
 const tags=$('#industry-tags');tags.replaceChildren();d.tags.forEach(tag=>{const el=document.createElement('span');el.textContent=tag;tags.append(el);});if(focus)button.focus();
}
$$('[data-industry]').forEach((button,index,list)=>{button.addEventListener('click',()=>selectIndustry(button));button.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(index+1)%list.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(index-1+list.length)%list.length;if(e.key==='Home')n=0;if(e.key==='End')n=list.length-1;if(n!==null){e.preventDefault();selectIndustry(list[n],true);}});});
selectIndustry($('[data-industry]'));
$('.menu-button').addEventListener('click',()=>{const open=$('.menu-button').getAttribute('aria-expanded')!=='true';$('.menu-button').setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);});
$$('#navigation a').forEach(a=>a.addEventListener('click',()=>{$('#navigation').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#navigation').classList.contains('open')){$('#navigation').classList.remove('open');$('.menu-button').setAttribute('aria-expanded','false');$('.menu-button').focus();}});
$('#brief-form').addEventListener('submit',e=>{
 e.preventDefault();
 const goal=$('#brief-goal').value.trim();
 if(!goal){$('#brief-goal').setCustomValidity('Contá brevemente qué problema querés resolver.');$('#brief-goal').reportValidity();return;}
 const text=['BRIEF DE CASO · nav_ia','', 'Sector: '+$('#brief-sector').value,'','Objetivo:',goal,'','Dimensiones y restricciones:',$('#brief-constraints').value.trim()||'Por definir.','','Criterio de evaluación del piloto:',$('#brief-success').value.trim()||'Por definir.','','Próximos pasos propuestos:','1. Delimitar subsistemas y condiciones de instalación.','2. Definir parámetros, componentes existentes y fuentes.','3. Construir una variante y registrar revisiones visuales.','4. Acordar verificaciones y pendientes antes de fabricar.','','Este documento se generó localmente. No se envió una solicitud ni información a terceros.'].join('\n');
 const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='nav-ia-brief.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 $('#brief-status').textContent='Brief preparado. Revisá el archivo descargado y compartilo cuando vos decidas.';
});
$('#brief-goal').addEventListener('input',()=>$('#brief-goal').setCustomValidity(''));

