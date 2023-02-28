import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelControlService } from '../../services/panel_control.service';
import { ErroresHandler } from '../../tools/handler/error/error.handler';
import { InitializationService } from '../../services/initialization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
    constructor(
        private _config: InitializationService,
        private panelControlService: PanelControlService,
        private erroresHandler: ErroresHandler,
        private router: Router,
        private translateService: TranslateService
    ) {}

    @Input() title = '';
    menus = [];
    menu_selected: any;
    item_selected: any;
    show: boolean = false;
    config = this._config.get();

    async ngOnInit() {
        await this.getMenus();
        this.menu_selected = this.panelControlService.getHomeMenu();
        this.panelControlService.position$.subscribe((res: any) => {
            this.menu_selected = res.menu;
            this.item_selected = res.item;
        });
    }

    do_show() {
        this.show = !this.show;
    }

    async goMenuItem(menu, item) {
        await this.panelControlService.navigate(this.router, menu, item);
        this.show = false;
    }

    private async getMenus() {
        try {
            if (
                this._config.get('SISTEMA.LOADS.MENUS.DATA') &&
                this._config.get('SISTEMA.LOGIN')
            ) {
                this.menus = await this.panelControlService.getMenus({
                    codModulo: window.sessionStorage.getItem('modulo'),
                });
            }
        } catch (e) {
            var fg = await new Promise((t) => {
                this.translateService
                    .get(['menus.error'])
                    .subscribe((r) => t(r));
            });
            e['navigation'] = true;
            this.erroresHandler.processError(e, 'page', fg['menus.error']);
        }
    }
}
