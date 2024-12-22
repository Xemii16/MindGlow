import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-request-delete-confirm',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

  ],
  templateUrl: './request-delete-confirm.component.html',
  styleUrl: './request-delete-confirm.component.scss'
})
export class RequestDeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestDeleteConfirmData,
    private location: Location
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    /*this.userService.deleteUser(this.data.user).then(() => {
      this.dialogRef.close();
      this.location.back();
    });*/
  }
}

export interface RequestDeleteConfirmData {
}
