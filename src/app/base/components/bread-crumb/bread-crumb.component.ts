import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InitializationService } from '../../services/initialization.service';
import { PanelControlService } from '../../services/panel_control.service';

@Component({
    selector: 'bread-crumb',
    templateUrl: './bread-crumb.component.html',
    styleUrls: ['./bread-crumb.component.css'],
})
export class BreadCrumbComponent {
    constructor(
        private router: Router,
        private config: InitializationService,
        private panelControlService: PanelControlService
    ) {}

    breadCrumb = [];
    show = this.config.get('SISTEMA.BREADCRUMB');

    ngOnInit() {
        if (this.show) {
            this.panelControlService.navigate$.subscribe((res: any) => {
                this.breadCrumb = res.breadcrumb || [];
            });
        }
    }

    async goHome(event) {
        if (event.item.nav) {
            await this.panelControlService.homeNavigate(this.router);
        }
    }
}
