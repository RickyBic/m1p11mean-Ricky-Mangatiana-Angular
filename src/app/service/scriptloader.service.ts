import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScriptLoaderService {

    private renderer: Renderer2;
    private loadedScripts: Set<string> = new Set();

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    loadScript(src: string, callback?: () => void) {
        // Check if the script is already loaded
        if (this.loadedScripts.has(src)) {
            if (callback) {
                callback(); // Execute the callback immediately if the script is already loaded
            }
            return; // Do nothing if the script is already loaded
        }
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.async = true;
        // Add an onload event handler to execute the callback when the script is loaded
        if (callback) {
            script.onload = () => {
                // Mark the script as loaded
                this.loadedScripts.add(src);
                callback();
            };
        }
        this.renderer.appendChild(document.body, script);
    }

    loadScripts() {
        this.loadScript('assets/vendor/js/menu.js', () => {
            this.loadScript('assets/vendor/libs/jquery/jquery.js');
            this.loadScript('assets/vendor/libs/popper/popper.js');
            this.loadScript('assets/vendor/js/bootstrap.js');
            this.loadScript('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js');
            this.loadScript('assets/vendor/libs/masonry/masonry.js');
            this.loadScript('assets/js/main.js');
            this.loadScript('https://buttons.github.io/buttons.js');
        });
    }

}
