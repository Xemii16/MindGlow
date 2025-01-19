import {Pupil} from "./pupil";
import {Subject} from "./subject";
import {SubjectService} from "./subject.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {HttpClientHelper} from "../../clients/http-client-helper";

@Injectable({
  providedIn: 'root'
})
export class HttpClientSubjectService implements SubjectService {

  constructor(private http: HttpClient) {
  }

  getAllSubjects(): Promise<Subject[]> {
    return new Promise<Subject[]>(((resolve, reject) => {
      this.http.get<Subject[]>(HttpClientHelper.buildUrl("/api/v1/subjects"), {withCredentials: true})
        .subscribe({next: value => resolve(value), error: error => reject(error)});
    }));
  }

  createSubject(subjectForm: { name: string; description: string; teacher_id: number; }): Promise<Subject> {
    return new Promise<Subject>(((resolve, reject) => {
      this.http.post<Subject>(HttpClientHelper.buildUrl("/api/v1/subjects"), subjectForm)
        .subscribe({next: value => resolve(value), error: error => reject(error)});
    }));
  }

  deleteSubject(id: number): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.http.delete(HttpClientHelper.buildUrl(`/api/v1/subjects/${id}`))
        .subscribe({next: () => resolve(true), error: error => reject(error)});
    }));
  }

  getPupilsBySubject(id: number): Promise<Pupil[]> {
    return new Promise<Pupil[]>(((resolve, reject) => {
      this.http.get<Pupil[]>(HttpClientHelper.buildUrl(`/api/v1/subjects/${id}/pupils`))
        .subscribe({next: value => resolve(value), error: error => reject(error)});
    }));
  }

  addPupilsToSubject(subjectId: number, pupilIds: number[]): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.http.put<boolean>(HttpClientHelper.buildUrl(`/api/v1/subjects/${subjectId}/pupils`), pupilIds)
        .subscribe({next: () => resolve(true), error: error => reject(error)});
    }));
  }

  deletePupilsFromSubject(id: number, pupilIds: number[]): Promise<boolean> {
    return new Promise<boolean>(((resolve, reject) => {
      this.http.delete<boolean>(HttpClientHelper.buildUrl(`/api/v1/subjects/${id}/pupils`), {body: pupilIds})
        .subscribe({next: () => resolve(true), error: error => reject(error)});
    }));
  }
}
