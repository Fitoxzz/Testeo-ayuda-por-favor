import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//PRIMENG
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BadgeModule } from 'primeng/badge';

@NgModule({
    declarations: [],
    providers: [MessageService],
    imports: [
        CommonModule,
        //PRIMENG
        InputNumberModule,
        AvatarModule,
        OverlayPanelModule,
        DividerModule,
        ToolbarModule,
        SidebarModule,
        DropdownModule,
        BreadcrumbModule,
        TabViewModule,
        ToastModule,
        ButtonModule,
        RippleModule,
        ConfirmDialogModule,
        TabMenuModule,
        TableModule,
        DialogModule,
        AccordionModule,
        InputTextModule,
        InputTextareaModule,
        CheckboxModule,
        MenuModule,
        PanelModule,
        ProgressSpinnerModule,
        ScrollTopModule,
        BadgeModule,
    ],
    exports: [
        //PRIMENG
        InputNumberModule,
        AvatarModule,
        OverlayPanelModule,
        DividerModule,
        ToolbarModule,
        SidebarModule,
        DropdownModule,
        BreadcrumbModule,
        TabViewModule,
        ToastModule,
        ButtonModule,
        RippleModule,
        ConfirmDialogModule,
        TabMenuModule,
        TableModule,
        DialogModule,
        AccordionModule,
        InputTextModule,
        InputTextareaModule,
        CheckboxModule,
        MenuModule,
        PanelModule,
        ProgressSpinnerModule,
        ScrollTopModule,
        BadgeModule,
    ],
})
export class PrimengModule {}
