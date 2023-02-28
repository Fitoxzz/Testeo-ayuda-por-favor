import { Component, Input } from '@angular/core';
import * as Sentry from '@sentry/angular';
import { PanelControlService } from '../../services/panel_control.service';
import { InitializationService } from '../../services/initialization.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SystemService } from '../../services/system.service';

@Component({
    selector: 'app-home-menu-buttons',
    templateUrl: './home-menu-buttons.component.html',
    styleUrls: ['./home-menu-buttons.component.css'],
})
@Sentry.TraceClassDecorator()
export class HomeMenuButtonsComponent {
    @Input() filtrar = true;

    constructor(
        private panelControlService: PanelControlService,
        private _config: InitializationService,
        private router: Router,
        public translateService: TranslateService,
        private systemService: SystemService
    ) {}

    menus = [];
    items = [];
    config = this._config.get();
    filter = '';

    async ngOnInit() {
        try {
            this.setMenus(this.panelControlService.getMenusHome());
            this.panelControlService.menus$.subscribe((r: any) =>
                this.setMenus(r.menus)
            );
        } catch (e) {
            this.menus = [];
        }
    }

    setMenus(menus) {
        this.menus = menus.filter((e) => e.metodo != '') || [];
    }

    navigate(menu, item?) {
        this.panelControlService.navigate(this.router, menu, item);
    }

    filtering() {
        let backup = this.panelControlService.getMenusHome();
        this.menus = this.systemService.filtering(
            backup,
            this.filter,
            'nombre'
        );
        this.menus = this.menus.filter((e: any) => e.metodo != '') || [];
    }

    setItems(menu, itemsMenu, event) {
        this.items =
            menu.items.map((e) => {
                let icon = '';
                if (this.config.SISTEMA.MENUS.FLAT_ICONS) {
                    icon = `<img
                        width="32"
                        src="${e.icono}"
                        />`;
                } else {
                    icon = `<i
                    class="${e.icono} menu-icon"
                    ></i>`;
                }
                return {
                    escape: false,
                    label: `
                    <div class="p-d-flex p-ai-center">
                        <div class="p-col-fixed" style="width: 38px">
                            ${icon}
                        </div>
                        <div class="p-col ${
                            e.estado == 2
                                ? 'item-menu-name-danger'
                                : e.estado == 3
                                ? 'item-menu-name-warning'
                                : ''
                        }">
                            ${e.nombre}
                        </div>
                    </div>
                    `,
                    title: e.descripcion,
                    command: async () => {
                        await this.navigate(menu, e);
                    },
                };
            }) || [];
        itemsMenu.toggle(event);
    }
}
