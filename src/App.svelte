<script lang="ts">
  import { addStudent } from './lib/store';
  import StudentForm from './lib/StudentForm.svelte';
  import StudentList from './lib/StudentList.svelte';
  import type { Student } from './lib/types';
  import { studentNames } from './lib/dummyData';

  function handleAddStudent(event: CustomEvent<Student>) {
    addStudent(event.detail);
  }
</script>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-8 text-center">Student Grade Management</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h2 class="text-2xl font-semibold mb-4">Add New Student</h2>
      <StudentForm on:submit={handleAddStudent} {studentNames} />
    </div>
    <div>
      <h2 class="text-2xl font-semibold mb-4">Student List</h2>
      <StudentList />
    </div>
  </div>
</main>