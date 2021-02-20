<script lang="typescript">
  import AuthService from "../services/auth.service";
  import FormInputField from "../components/FormInputField.svelte";
  import type { ValidatorFunc } from "../interfaces/validator-func";
  import {
    requiredValidator,
    emailValidator,
    minLengthValidator,
  } from "../validators/validators";
import type InputData from "../interfaces/input-data";

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

  async function handleSubmit() {
    await AuthService.login(emailData.value, passwordData.value);
  }

  $: {
    formValid = false;
    if (emailData?.valid && passwordData?.valid) {
      formValid = true;
    }
  };
  
</script>

<div class="container">
  <div class="login-form">
    <h2>Login</h2>

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
</div>

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
