import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PortalService } from 'src/app/base/services/portal.service';
import { PanelControlService } from '../../services/panel_control.service';

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent {
    mode = '';
    constructor(
        private router: Router,
        private portalService: PortalService,
        private panelControlService: PanelControlService
    ) {
        this.mode = this.router.getCurrentNavigation().extras.state.mode;
    }

    async goPortal() {
        await this.portalService.backToPortal({
            proyecto: window.sessionStorage.getItem('proyecto'),
        });
    }

    async goHome() {
        await this.panelControlService.homeNavigate(this.router);
    }
}
