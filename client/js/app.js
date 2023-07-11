const email = document.querySelector('#email');
const myForm = document.querySelector('#sign-up-form');

const postData = async (url, data) => {
  console.log('posting data');
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  return response.text();
}

myForm.addEventListener('submit', e => {
  console.log('form submitted');
  e.preventDefault();
  const user = {
    email: email.value,
  }

postData('http://localhost:5000/login', user).then((data) => console.log(data)).catch((err) => console.log({message: err.message}));
;


email.focus();
email.value ="";
})