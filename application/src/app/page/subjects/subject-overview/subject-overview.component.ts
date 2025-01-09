import {Component, OnInit} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {HttpClientSubjectService} from "../../../services/subject/http-client-subject.service";
import {Subject} from "../../../services/subject/subject";

@Component({
  selector: 'app-subject-overview',
  standalone: true,
  imports: [
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    RouterLink,
    RouterOutlet,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatTooltip,
    MatDivider
  ],
  templateUrl: './subject-overview.component.html',
  styleUrl: './subject-overview.component.scss'
})
export class SubjectOverviewComponent implements OnInit {

  subject?: Subject;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: HttpClientSubjectService
  ) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().then(subjects => {
      this.subject = subjects.find(subject => subject.id === this.getSubjectId());
    });
  }

  isCurrentRoute(route: string): boolean {
    if (route.endsWith('/**')) {
      return this.router.url.startsWith(route.replace('/**', ''));
    }
    return this.router.url === route;
  }

  getSubjectId(): number {
    return this.activatedRoute.snapshot.params['id'];
  }

  route() {
    this.router.navigate(['dashboard', 'subjects', this.getSubjectId()])
  }

  navigateToSubjects() {
    this.router.navigate(['dashboard', 'subjects'])
  }
}
