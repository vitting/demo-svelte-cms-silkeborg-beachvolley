<script lang="typescript">
  import { fade } from "svelte/transition";
  import cuid from "cuid";
  import { onMount } from "svelte";
  import type { ValidatorFunc } from "../interfaces/validator-func";
  import type InputData from "../interfaces/input-data";
  export let value = "";
  export let type = "text";
  export let label = "";
  export let required = false;
  export let maxLength = -1;
  export let placeholder = "";
  export let validators: ValidatorFunc[] = [];
  export let data: InputData = {
    touched: false,
    valid: false,
    value: "",
  };
  let initialValue = "";
  let showError = false;
  let errorMessage = "";
  let touched = false;
  let inputEl: HTMLInputElement;
  export let id = "";

  function validate(node: HTMLInputElement, value: string) {
    return {
      update(value: string) {
        touched = true;
        showError = false;
        for (const item of validators) {
          const { valid, message } = item(value);
          if (!valid) {
            showError = true;
            errorMessage = message;
            break;
          }
        }

        data = {
          touched,
          valid: !showError,
          value,
        };
      },
    };
  }

  function handleValueChange(event: Event) {
    const el = event.target as HTMLInputElement;
    value = el.value.trim();
  }

  function setTouched() {
    inputEl.classList.remove("untouched");
    inputEl.classList.add("touched");
  }

  onMount(() => {
    if (value) {
      initialValue = value;
      touched = true;
      data.value = value;
      data.touched = touched;
    }

    if (!id) {
      id = cuid();
    }
  });

  $: {
    if (touched) {
      setTouched();
    }
  }
</script>

<div class="form-field">
  <div class="fields">
    <input
      {id}
      name={id}
      {type}
      class="input untouched"
      value={initialValue}
      use:validate={value}
      on:input={(e) => handleValueChange(e)}
      bind:this={inputEl}
      {required}
      {maxLength}
      {placeholder}
    />
    <label class="label" for={id}>{label}</label>
  </div>

  {#if showError}
    <div class="input-error" transition:fade={{ duration: 300 }}>
      {errorMessage}
    </div>
  {/if}
</div>

<style>
  .form-field {
    padding: 0 1rem;
    height: 100px;
  }

  .fields {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    height: 56px;
  }

  label {
    color: #868686;
    position: absolute;
    top: 0;
    transition: all 0.5s;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  input {
    position: absolute;
    bottom: 0;
  }

  input.untouched + label {
    top: 26px;
  }

  input.untouched:focus + label {
    color: black;
    top: 0;
  }
</style>
