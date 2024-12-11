import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {SubjectResponse} from "../../../service/subject/subject.response";
import {SubjectService} from "../../../service/subject/subject.service";

@Component({
  selector: 'app-subject-overview',
  standalone: true,
  imports: [
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLink,
    RouterOutlet,
    MatButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatTooltip,
    MatDivider
  ],
  templateUrl: './subject-overview.component.html',
  styleUrl: './subject-overview.component.scss'
})
export class SubjectOverviewComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService
  ) {
  }

  isCurrentRoute(route: string): boolean {
    if (route.endsWith('/**')) {
      return this.router.url.startsWith(route.replace('/**', ''));
    }
    return this.router.url === route;
  }

  getSubjectId(): string {
    return this.activatedRoute.snapshot.params['id'];
  }

  route() {
    this.router.navigate(['dashboard', 'subjects', this.getSubjectId()])
  }

  navigateToSubjects() {
    this.router.navigate(['dashboard', 'subjects'])
  }
}
