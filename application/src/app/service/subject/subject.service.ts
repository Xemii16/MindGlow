import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../utility/storage";
import {SubjectResponse} from "./subject.response";
import {CreateSubjectRequest} from "./create-subject.request";
import {UserResponse} from "../user/response/user.response";
import {JwtService} from "../jwt/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url: string = apiUrl + '/api/v1/subjects';

  constructor(private http: HttpClient, private jwtService: JwtService) {
  }

  getSubjects(): Promise<SubjectResponse[] | null> {
    return new Promise<SubjectResponse[] | null>(resolve => {
      this.http.get<SubjectResponse[]>(this.url, {
        headers: {
          "Authorization": "Bearer " + this.jwtService.getRefreshToken()
        }
      }).subscribe({
        next: (response: SubjectResponse[]) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  getSubject(id: string): Promise<SubjectResponse | null> {
    return new Promise<SubjectResponse | null>(resolve => {
      this.http.get<SubjectResponse>(this.url + "/" + id).subscribe({
        next: (response: SubjectResponse) => {
          resolve(response);
        },
        error: (err) => {
          resolve(null);
        }
      });
    });
  }

  createSubject(request: CreateSubjectRequest): Promise<SubjectResponse | null> {
    return new Promise<SubjectResponse | null>(resolve => {
      this.http.post<SubjectResponse>(this.url, request).subscribe({
        next: (response: SubjectResponse) => {
          resolve(response);
        },
        error: () => {
          resolve(null);
        }
      });
    });
  }

  getStudents(id: string): Promise<UserResponse[] | null> {
    return new Promise<UserResponse[] | null>(resolve => {
      this.http.get<UserResponse[]>(this.url + "/students?id=" + id).subscribe({
        next: (response: UserResponse[]) => {
          resolve(response);
        },
        error: () => {
          resolve(null);
        }
      });
    });
  }

  addStudent(subjectId: string, pupilId: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.http.post<void>(this.url + "/students", {
        subjectId: subjectId,
        studentId: pupilId
      }).subscribe({
        next: () => {
          resolve();
        },
        error: () => {
          resolve();
        }
      });
    });
  }

  deletePupilFromSubject(subjectId: string, pupilId: string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.delete<void>(this.url + "/students?pupilId=" + pupilId + "&subjectId=" + subjectId).subscribe({
        next: () => {
          resolve(true);
        },
        error: () => {
          resolve(false);
        }
      });
    });
  }
}
