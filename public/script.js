function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);
  const isValidLength = password.length >= 6;

  return hasLowerCase && hasUpperCase && hasNumber && hasSymbol && isValidLength;
}

function login() {
  const loginEmail = document.getElementById("login-email").value;
  const loginEmailError = document.getElementById("login-email-error");

  const loginPassword = document.getElementById("login-password").value;
  const loginPasswordError = document.getElementById("login-password-error");

  // validate email input
  if (!loginEmail) {
    loginEmailError.textContent = "required";
  } else if (!validateEmail(loginEmail)) {
    loginEmailError.textContent = "please enter a valid email";
  } else if (!loginPassword) {
    loginPasswordError.textContent = "required";
  }else {
    // submit the form to the server
  

    // display success message
    const successMessage = document.getElementById("login-success");
    successMessage.textContent = "Login successful!";
    setTimeout(() => {
      successMessage.textContent = "";
    }, 3000); // Clear success message after 3 seconds
  }
}

function signup() {
  const signupFirstName = document.getElementById("signup-firstname").value;
  const signupLastName = document.getElementById("signup-lastname").value;
  const signupEmail = document.getElementById("signup-email").value;
  const signupPassword = document.getElementById("signup-password").value;
  const signupConfirmPassword = document.getElementById("signup-confirm-password").value;

  // Perform validation and signup logic
  const signupFirstNameError = document.getElementById("signup-firstname-error");
  const signupLastNameError = document.getElementById("signup-lastname-error");
  const signupEmailError = document.getElementById("signup-email-error");
  const signupPasswordError = document.getElementById("signup-password-error");
  const signupConfirmPasswordError = document.getElementById("signup-confirm-password-error");

  // Validation for First Name (Minimum 3 characters)
  if (!signupFirstName || signupFirstName.length < 3) {
    signupFirstNameError.textContent = "at least 3 characters required.";
  }

  // Validation for Last Name (Minimum 3 characters)
  if (!signupLastName || signupLastName.length < 3) {
    signupLastNameError.textContent = "at least 3 characters required.";
  }

  // Validation for Email Format
  if (!signupEmail || !validateEmail(signupEmail)) {
    signupEmailError.textContent = "Valid email is required.";
  }

  // Validation for Password
  if (!signupPassword) {
    signupPasswordError.textContent = "Password is required.";
  } else if (!validatePassword(signupPassword)) {
    signupPasswordError.textContent = "must be at least 6 characters long, with a number, symbol, lower case and upper case letter.";
  }

  // Validation for Confirm Password
  if (!signupConfirmPassword) {
    signupConfirmPasswordError.textContent = "Confirm Password is required.";
  } else if (signupPassword !== signupConfirmPassword) {
    signupConfirmPasswordError.textContent = "Passwords do not match.";
  }

  if (
    signupFirstName && signupFirstName.length >= 3 &&
    signupLastName && signupLastName.length >= 3 &&
    signupEmail && validateEmail(signupEmail) &&
    signupPassword && validatePassword(signupPassword) &&
    signupConfirmPassword && signupPassword === signupConfirmPassword
  ) {
    // signup logic - submit the form to the server
    
    // clear error messages if there are no validation errors
    signupFirstNameError.textContent = "";
    signupLastNameError.textContent = "";
    signupEmailError.textContent = "";
    signupPasswordError.textContent = "";

    // create an object to hold the form data
    const formData = {
      firstName: signupFirstName,
      lastName: signupLastName,
      email: signupEmail,
      password: signupPassword,
    }

    // fetch CSRF token from the server
    let csrfToken;
    fetch('/csrf-token')
    .then(response => response.json())
    .then(data => {
      csrfToken = data.csrf_token;
    });

    // send the form data to the server using AJAX -fetch API
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      //console.log('meta:-> ', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
      // handle the server response data
      if (data.success) {
        // display success message
        const successMessage = document.getElementById("signup-success");
        console.log('a few things');
        successMessage.textContent = "Signup successful!";
        setTimeout(() => {
          successMessage.textContent = "";
        }, 6000); // Clear success message after 3 seconds

        // TODO: redirect the user to the login page
      } else {
        // TODO:  remove alert and implement similar response to success situation
        alert('Failed. Please check your form data');
      }
    })
    .catch(error => {
      console.error('Error: ', error);
      console.log('new:  ', csrfToken);
      // TODO:  handle any AJAX errors here
      alert('Ooops. An error occurred. please try again.');
    });


    /*
    .then(response => response.text())
    .then(html => {
      console.log('HTML response:  ', html);

      const container = document.getElementById('reponse-container');
      container.innerHTML = html
    })
    .catch(error => {
      console.error('Error:  ', error);
      alert('OOOPS');
    });
    */
  }
}

function showSignupForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLoginForm() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}