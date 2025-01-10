import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {User} from "../../../services/user/user";
import {Pupil} from "../../../services/subject/pupil";
import {Subject} from "../../../services/subject/subject";
import {HttpClientSubjectService} from "../../../services/subject/http-client-subject.service";

@Component({
  selector: 'app-pupils-subjects',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './pupils-subjects.component.html',
  styleUrl: './pupils-subjects.component.scss'
})
export class PupilsSubjectsComponent implements OnInit {
  subjectsStudents: SubjectStudents[] = [];
  user ?: User;

  constructor(
    private userService: HttpClientUserService,
    private subjectService: HttpClientSubjectService,
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.userService.getCurrentUser().then((user) => {
      this.user = user;
    })
  }

  private getStudents() {
    this.subjectService.getAllSubjects().then(subjects => {
      subjects.push(...subjects);
      subjects.forEach(subject => {
        this.subjectService.getPupilsBySubject(subject.id).then(students => {
          this.subjectsStudents.push({subject, students});
        })
      });
    });
  }
}

  interface SubjectStudents {
    subject: Subject;
    students: Pupil[];
}
