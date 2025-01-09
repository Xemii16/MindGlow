import {Subject} from "./subject";
import {Pupil} from "./pupil";

export interface SubjectService {
  getAllSubjects: () => Promise<Subject[]>;
  createSubject: (subjectForm: {name: string; description: string; teacher_id: number}) => Promise<Subject>;
  deleteSubject: (id: number) => Promise<boolean>;
  getPupilsBySubject: (id: number) => Promise<Pupil[]>;
  addPupilsToSubject: (subjectId: number, pupilIds: number[]) => Promise<boolean>;
  deletePupilsFromSubject: (id: number, pupilIds: number[]) => Promise<boolean>;
}
