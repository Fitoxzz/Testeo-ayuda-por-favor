import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//SERVICES
import { ConfirmationService, MessageService } from 'primeng/api';

//MODULES
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CardModule} from 'primeng/card';
import { Chip, ChipModule } from 'primeng/chip';

@NgModule({
    declarations: [],
    providers: [MessageService, ConfirmationService],
    imports: [
        CommonModule,
        //PRIMENG
        ButtonModule,
        InputTextModule,
        TooltipModule,
        TableModule,
        InputTextareaModule,
        KeyFilterModule,
        ChipModule,
        CardModule,
    ],
    exports: [
        //PRIMENG
        ButtonModule,
        InputTextModule,
        TooltipModule,
        TableModule,
        InputTextareaModule,
        KeyFilterModule,
        ChipModule,
        CardModule,
    ],
})
export class PrimengModule {}
