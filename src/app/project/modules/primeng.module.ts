import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


//SERVICES
import { ConfirmationService, MessageService } from 'primeng/api';

//MODULES
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { Chip, ChipModule } from 'primeng/chip';
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask'; 
import { HttpClientModule } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';



import {ChartModule} from 'primeng/chart';



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
        PasswordModule,
        DividerModule,
        BrowserModule,
        BrowserAnimationsModule,
        CalendarModule,
        AutoCompleteModule,
        InputMaskModule,
        HttpClientModule,
        DropdownModule,
        ChartModule,
        TabViewModule,

        
        
        
        
        
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
        PasswordModule,
        DividerModule,
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        CalendarModule,
        AutoCompleteModule,
        InputMaskModule,
        HttpClientModule,
        DropdownModule,
        ChartModule,
        TabViewModule,

    ],
})
export class PrimengModule { }
