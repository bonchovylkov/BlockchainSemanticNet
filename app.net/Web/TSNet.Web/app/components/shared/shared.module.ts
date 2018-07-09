import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppFooterComponent } from './theme/app-footer.component';
import { AppHeaderComponent } from './theme/app-header.component';

import { APP_DIRECTIVES } from '../../directives/index';
import { APP_PIPES } from '../../pipes/index';
import 'd3';
import 'nvd3'
import { NvD3Module } from 'ng2-nvd3';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, NvD3Module],
    declarations: [
        AppFooterComponent,
        AppHeaderComponent,

        APP_DIRECTIVES,
        APP_PIPES
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,

        AppFooterComponent,
        AppHeaderComponent,

        APP_DIRECTIVES,
        APP_PIPES,
        NvD3Module

    ]
})

export class SharedModule { }
