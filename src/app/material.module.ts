import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatButtonModule, 
    MatCheckboxModule, 
    MatRadioModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatFormFieldControl,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatChipsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatChipsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule
    ]
})

export class MaterialModule {}