import { Component, Input } from '@angular/core';

@Component({
    selector: 'pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent {
    constructor() {}

    @Input() data: any;
    @Input() height: String;
    @Input() filename: string;
}
