import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest text-on-surface-variant border-t border-outline-variant/20 pt-margin-tablet pb-12">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <span className="font-headline-md text-headline-md text-on-surface block uppercase tracking-widest">
              Lemalua
            </span>
            <p className="text-sm opacity-70">
              Elevando el arte de la apreciación de espirituosos desde 1994.
            </p>
            <div className="flex gap-4">
              <a className="hover:text-secondary transition-colors" href="#facebook" title="Facebook">
                <span className="material-symbols-outlined" data-icon="facebook">face_nod</span>
              </a>
              <a className="hover:text-secondary transition-colors" href="#instagram" title="Instagram">
                <span className="material-symbols-outlined" data-icon="instagram">infrared</span>
              </a>
              <a className="hover:text-secondary transition-colors" href="#tiktok" title="TikTok">
                <span className="material-symbols-outlined" data-icon="tiktok">title</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-on-surface font-label-md uppercase tracking-widest">Colección</h5>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-secondary transition-colors" href="#shop">Whiskies</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#shop">Ginebras</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#shop">Tequilas & Mezcal</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#shop">Ediciones Raras</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-on-surface font-label-md uppercase tracking-widest">Ayuda</h5>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-secondary transition-colors" href="#help">Envíos</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#help">Devoluciones</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#help">Preguntas Frecuentes</a></li>
              <li><a className="hover:text-secondary transition-colors" href="#help">Privacidad</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-on-surface font-label-md uppercase tracking-widest">Contacto</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs" data-icon="mail">mail</span> 
                info@lemalua.com
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs" data-icon="call">call</span> 
                +34 912 345 678
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-xs" data-icon="location_on">location_on</span> 
                Madrid, España
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50 uppercase tracking-widest">
          <span>© 2024 Lemalua Spirits. Todos los derechos reservados.</span>
          <div className="flex gap-8">
            <a className="hover:text-secondary transition-colors" href="#terms">Términos</a>
            <a className="hover:text-secondary transition-colors" href="#cookies">Cookies</a>
            <a className="hover:text-secondary transition-colors" href="#sustainability">Sostenibilidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
