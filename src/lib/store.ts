import { writable } from 'svelte/store';
import type { Student } from './types';

export const students = writable<Student[]>([]);

export function addStudent(student: Student) {
  students.update(currentStudents => [...currentStudents, { ...student, id: Date.now().toString() }]);
}

export function deleteStudent(id: string) {
  students.update(currentStudents => currentStudents.filter(student => student.id !== id));
}

export function updateStudent(updatedStudent: Student) {
  students.update(currentStudents =>
    currentStudents.map(student => student.id === updatedStudent.id ? updatedStudent : student)
  );
}