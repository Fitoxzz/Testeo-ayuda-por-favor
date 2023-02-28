import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanelControlService } from '../../services/panel_control.service';

@Component({
    selector: 'app-develop',
    templateUrl: './develop.component.html',
    styleUrls: ['./develop.component.css'],
})
export class DevelopComponent {
    constructor(
        private router: Router,
        private panelControlService: PanelControlService
    ) {}

    async goHome() {
        await this.panelControlService.homeNavigate(this.router);
    }
}
