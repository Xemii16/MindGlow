import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientUserService} from "../../../services/user/http-client-user.service";
import {SubjectService} from "../../../services/subject/subject.service";
import {User} from "../../../services/user/user";
import {Subject} from "rxjs";
import {Pupil} from "../../../services/subject/pupil";

@Component({
  selector: 'app-pupils-subjects',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './pupils-subjects.component.html',
  styleUrl: './pupils-subjects.component.scss'
})
export class PupilsSubjectsComponent {
  subjectsStudents: SubjectStudents[] = [];
  user: User | null = null;

  constructor(
    private userService: HttpClientUserService,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit(): void {
    this.getStudents();
    this.userService.getCurrentUser().then((user) => {
      if (user === null) return;
      this.user = user;
    })
  }

  private getStudents() {
    this.subjectService.getAllSubjects().then(subjects => {
      if (subjects == null) {
        return;
      }
      subjects.push(...subjects);
      subjects.forEach(subject => {
        this.subjectService.getPupilsBySubject(subject.id).then(students => {
          if (students == null) {
            return;
          }
          this.subjectsStudents.push({subject, students});
        })
      });
    });
  }
}

  interface SubjectStudents {
    // subject: Subject;
    // students: Pupil[];
}
