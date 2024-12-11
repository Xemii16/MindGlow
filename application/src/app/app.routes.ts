import {Routes} from '@angular/router';
import {DashboardComponent} from "./page/dashboard/dashboard.component";
import {RecoveryComponent} from "./page/recovery/recovery.component";
import {LandingComponent} from "./page/landing/landing.component";
import {LoginComponent} from "./page/login/login.component";
import {RegisterComponent} from "./page/register/register.component";
import {RegisterPendingComponent} from "./page/register/register-pending/register-pending.component";
import {MainComponent} from "./page/main/main/main.component";
import {SubjectsComponent} from "./page/subjects/subjects.component";
import {PlanningComponent} from "./page/planning/planning/planning.component";
import {TeachersComponent} from "./page/teachers/teachers/teachers.component";
import {PupilsComponent} from "./page/pupils/pupils.component";
import {RequestsComponent} from "./page/requests/requests.component";
import {SettingsComponent} from "./page/settings/settings/settings.component";
import {RequestApprovalComponent} from "./page/requests/request-approval/request-approval.component";
import {PupilsAllComponent} from "./page/pupils/pupils-all/pupils-all.component";
import {PupilsSubjectsComponent} from "./page/pupils/pupils-subjects/pupils-subjects.component";
import {PupilsTeachersComponent} from "./page/pupils/pupils-teachers/pupils-teachers.component";
import {SubjectOverviewComponent} from "./page/subjects/subject-overview/subject-overview.component";
import {SubjectOverviewMainComponent} from "./page/subjects/subject-overview/subject-overview-main/subject-overview-main.component";
import {
  SubjectOverviewPupilsComponent
} from "./page/subjects/subject-overview/subject-overview-pupils/subject-overview-pupils.component";
import {CredentialsComponent} from "./page/credentials/credentials.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'credentials', component: CredentialsComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: '', component: MainComponent},
      {path: 'subjects', component: SubjectsComponent},
      {path: 'subjects/:id', component: SubjectOverviewComponent, children: [
          {path: '', component: SubjectOverviewMainComponent},
          {path: 'pupils', component: SubjectOverviewPupilsComponent}
        ]},
      {path: 'planning', component: PlanningComponent},
      {path: 'teachers', component: TeachersComponent},
      {
        path: 'pupils', component: PupilsComponent, children: [
          {path: '', component: PupilsAllComponent},
          {path: 'subjects', component: PupilsSubjectsComponent},
          {path: 'teachers', component: PupilsTeachersComponent},
        ]
      },
      {path: 'requests', component: RequestsComponent},
      {path: 'requests/:id', component: RequestApprovalComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },
  {path: 'register', component: RegisterComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: '', component: LandingComponent},
  {path: 'pending', component: RegisterPendingComponent}
];
