const emailRegex = /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function registerValidation(formEvent: Event) {
    const form = formEvent.target as HTMLFormElement;
    let  errors: string[] = [];

    const emailInput = form.querySelector("[name=email]") as HTMLInputElement | null;
    if (!emailInput || !emailInput.value) {
      errors.push('Email is required.');
    } else if (!new RegExp(emailRegex).test(emailInput.value)) {
      errors.push('Invalid email address.');
    }

    const usernameInput = form.querySelector("[name=username]") as HTMLInputElement | null;
    if (!usernameInput || !usernameInput.value) {
      errors.push('Username is required.');
    } else if (usernameInput.value.length < 5 || usernameInput.value.length > 20) {
      errors.push('Username must be between 5 and 20 characters.');
    }

    const passwordInput = form.querySelector("[name=password]") as HTMLInputElement | null;
    if (!passwordInput || !passwordInput.value) {
      errors.push('Password is required.');
    } else {
      errors = errors.concat(passwordValidation(passwordInput.value))
    }

    const firstNameInput = form.querySelector("[name=firstName]") as HTMLInputElement | null;
    if (!firstNameInput || !firstNameInput.value) {
      errors.push('First name is required.');
    } else if (firstNameInput.value.length < 2) {
      errors.push('Invalid First Name.');
    }

    const lastNameInput = form.querySelector("[name=lastName]") as HTMLInputElement | null;
    if (!lastNameInput || !lastNameInput.value) {
      errors.push('Last name is required.');
    } else if (lastNameInput.value.length < 2) {
      errors.push('Invalid Last Name.');
    }

    const profilePictureInput = form.querySelector("[name=profileImage]") as HTMLInputElement | null;
    if (!profilePictureInput || !profilePictureInput.files || profilePictureInput.files.length < 1) {
      errors.push('Profile Image is required.');
    }

    return errors;
  }

  function passwordValidation(password: string): string[] {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
      }
      if (!new RegExp(/[0-9]/g).test(password)) {
        errors.push('Password must contain at least one number.')
      }
      if (!new RegExp(/[A-Z]/).test(password)) {
        errors.push('Password must contain at least one capital letter')
      }
      if (!new RegExp(/[!@#$%^*()_+\-=\[\]{}|\\,.?:-]/).test(password)) {
        errors.push('Password must contain at least one special character.')
      }

      return errors
  }

  export { registerValidation, passwordValidation }
