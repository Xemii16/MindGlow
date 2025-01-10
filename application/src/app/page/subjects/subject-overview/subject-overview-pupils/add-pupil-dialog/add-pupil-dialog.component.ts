import {Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {HttpClientSubjectService} from "../../../../../services/subject/http-client-subject.service";
import {Subject} from "../../../../../services/subject/subject";
import {User} from "../../../../../services/user/user";
import {HttpClientUserService} from "../../../../../services/user/http-client-user.service";

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
    MatSelectionList,
    MatListOption,
  ],
  templateUrl: './add-pupil-dialog.component.html',
  styleUrl: './add-pupil-dialog.component.scss'
})
export class AddPupilDialogComponent implements OnInit {
  @ViewChild(MatSelectionList) pupilsList?: MatSelectionList
  subject?: Subject;
  pupils: User[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddPupilDialogComponent>,
    private subjectService: HttpClientSubjectService,
    private userService: HttpClientUserService,
    @Inject(MAT_DIALOG_DATA) public data: SubjectData
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().then(subject => {
      this.subject = subject.find(subject => subject.id === this.data.id);
    });
    this.getPupils();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getPupils() {
    this.userService.getAllUsers("students").then(users => {
      this.pupils = users;
      this.subjectService.getPupilsBySubject(this.data.id).then(pupils => {
        this.pupils = this.pupils.filter(pupil => pupils.find(student => student.id === pupil.id) == null);
      });
    });
  }

  onAddClick() {
    this.pupilsList?.selectedOptions.selected.forEach(option => {
      console.log(option.value)
      this.subjectService.addPupilsToSubject(this.data.id, [option.value]).then(() => {

      });
    });
    this.dialogRef.close();
  }
}

export interface SubjectData {
  id: number;
}
