document.getElementById('homeButton').addEventListener('click', function () {
  window.location.href = '../homepage.html';
});

(function () {
  window.addEventListener('load', function () {
      var forms = document.getElementsByClassName('needs-validation');
      Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
              if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
              }
              form.classList.add('was-validated');
          }, false);
      });
  }, false);

  document.getElementById('validationForm').addEventListener('submit', function(event) {
      var password = document.getElementById('password');
      var email = document.getElementById('email');

      // Password validation
      var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
      if (!passwordPattern.test(password.value)) {
          password.setCustomValidity('Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.');
      } else {
          password.setCustomValidity('');
      }

      // Email validation
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
          email.setCustomValidity('Please provide a valid email.');
      } else {
          email.setCustomValidity('');
      }

      // Date validation
      var date = document.forms['validationForm'].elements['date'];
      var exp = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
      if (!exp.test(date.value)) {
          date.setCustomValidity('Enter the date in dd-mm-yyyy format');
      } else {
          date.setCustomValidity('');
      }

      if (this.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
      }

      this.classList.add('was-validated');
  });
})();
