import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IconToastComponent } from './components/icon-toast/icon-toast.component';
import { UserDataChangeComponent } from './components/user-data-change/user-data-change.component';
import { DegreePipe } from './services/degree.pipe';
import { FacultyPipe } from './services/faculty.pipe';
import { TypePipe } from './services/type.pipe';

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatSelectModule,
  MatExpansionModule
];

@NgModule({
  imports: [CommonModule, materialModules, FlexLayoutModule, ReactiveFormsModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { minWidth: '50vw', closeOnNavigation: true, disableClose: false, hasBackdrop: true }
    }
  ],
  exports: [
    materialModules,
    FlexLayoutModule,
    ReactiveFormsModule,
    IconToastComponent,
    UserDataChangeComponent,
    FacultyPipe,
    DegreePipe,
    TypePipe
  ],
  declarations: [
    IconToastComponent,
    UserDataChangeComponent,
    FacultyPipe,
    TypePipe,
    DegreePipe,
    ConfirmationDialogComponent
  ],
  entryComponents: [IconToastComponent, UserDataChangeComponent, ConfirmationDialogComponent]
})
export class SharedModule {}
