<script lang="typescript">
  import { fade } from "svelte/transition";

  import AuthService from "../services/auth.service";
  import FormInputField from "../components/FormInputField.svelte";
  import type { ValidatorFunc } from "../interfaces/validator-func";
  import { router } from "tinro";
  import {
    requiredValidator,
    emailValidator,
    minLengthValidator,
  } from "../validators/validators";
  import type InputData from "../interfaces/input-data";
  import AuthStore, { getAuthUser } from "../stores/auth.store";

  let formValid = false;
  let email = "";
  let password = "";
  let emailData: InputData;
  let passwordData: InputData;
  const emailValidators: ValidatorFunc[] = [requiredValidator, emailValidator];
  const passwordValidators: ValidatorFunc[] = [
    requiredValidator,
    minLengthValidator(6),
  ];

  const authUser = getAuthUser();

  async function handleSubmit() {
    await AuthService.login(emailData.value, passwordData.value);
  }

  async function handleLogout() {
    await AuthService.logout();
  }

  function handleGotoMain() {
    router.goto("/");
  }

  $: {
    formValid = false;
    if (emailData?.valid && passwordData?.valid) {
      formValid = true;
    }
  }
</script>

{#await $authUser}
  <p>Loading</p>
{:then user}
  <div class="container">
    <h2>Login</h2>
    {#if $AuthStore}
      <div in:fade={{ duration: 300 }}>
        <p class="loggedin-text">You are logged in.</p>
        <div class="loggedin-buttons">
          <button class="btn" on:click={handleLogout}>Logout</button>
          <button class="btn" on:click={handleGotoMain}>Go to Home</button>
        </div>
      </div>
    {:else}
      <div class="login-form" in:fade={{ duration: 300 }}>
        <form on:submit|preventDefault={handleSubmit} novalidate>
          <FormInputField
            bind:value={email}
            type={"email"}
            label={"E-mail"}
            validators={emailValidators}
            required={true}
            bind:data={emailData}
          />
          

          <FormInputField
            bind:value={password}
            type={"password"}
            label={"Password"}
            validators={passwordValidators}
            required={true}
            bind:data={passwordData}
          />
          <div class="form-actions">
            <button class="btn" disabled={!formValid}>Login</button>
          </div>
        </form>
      </div>
    {/if}
  </div>
{/await}

<style>
  .container {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    width: 350px;
    padding: 1rem;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
  }

  .loggedin-text {
    text-align: center;
    margin-bottom: 1rem;
  }
  .loggedin-buttons {
    display: flex;
    justify-content: space-between;
  }

  .form-actions {
    display: flex;
    justify-content: center;
  }
  h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 612px) {
    .container {
      width: 80%;
    }
  }
</style>
