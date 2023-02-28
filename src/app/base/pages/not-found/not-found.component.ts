import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PanelControlService } from '../../services/panel_control.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
    constructor(
        private router: Router,
        private panelControlService: PanelControlService
    ) {}

    async goHome() {
        await this.panelControlService.homeNavigate(this.router);
    }
}
