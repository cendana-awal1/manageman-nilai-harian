<script lang="ts">
  import { students, deleteStudent, updateStudent } from './store';
  import type { Student } from './types';
  import StudentForm from './StudentForm.svelte';

  let editingStudent: Student | null = null;

  function handleEdit(student: Student) {
    editingStudent = { ...student };
  }

  function handleUpdate(event: CustomEvent<Student>) {
    updateStudent(event.detail);
    editingStudent = null;
  }
</script>

<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Type</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#each $students as student (student.id)}
        <tr>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.gradeType}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.score}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button on:click={() => handleEdit(student)} class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
            <button on:click={() => deleteStudent(student.id)} class="text-red-600 hover:text-red-900">Delete</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if editingStudent}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Edit Student</h2>
      <StudentForm student={editingStudent} on:submit={handleUpdate} />
      <button on:click={() => editingStudent = null} class="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        Cancel
      </button>
    </div>
  </div>
{/if}