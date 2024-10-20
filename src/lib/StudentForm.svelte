<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Student } from './types';

  export let student: Partial<Student> = {};
  export let studentNames: string[] = [];
  
  const dispatch = createEventDispatcher();

  let filteredNames: string[] = [];
  let showAutocomplete = false;

  function handleSubmit() {
    dispatch('submit', student);
    student = {};
    filteredNames = [];
    showAutocomplete = false;
  }

  function handleInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    filteredNames = studentNames.filter(name => 
      name.toLowerCase().includes(input.toLowerCase())
    );
    showAutocomplete = filteredNames.length > 0;
  }

  function selectName(name: string) {
    student.name = name;
    showAutocomplete = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
  <div class="relative">
    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
    <input 
      type="text" 
      id="name" 
      bind:value={student.name} 
      on:input={handleInput}
      required 
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
    {#if showAutocomplete}
      <ul class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
        {#each filteredNames as name}
          <li 
            class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
            on:click={() => selectName(name)}
          >
            {name}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div>
    <label for="class" class="block text-sm font-medium text-gray-700">Class</label>
    <input type="text" id="class" bind:value={student.class} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
  </div>
  <div>
    <label for="gradeType" class="block text-sm font-medium text-gray-700">Grade Type</label>
    <input type="text" id="gradeType" bind:value={student.gradeType} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
  </div>
  <div>
    <label for="score" class="block text-sm font-medium text-gray-700">Score</label>
    <input type="number" id="score" bind:value={student.score} required min="0" max="100" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
  </div>
  <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    {student.id ? 'Update Student' : 'Add Student'}
  </button>
</form>