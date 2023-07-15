const email = document.querySelector('#email');
const myForm = document.querySelector('#sign-up-form');
const container = document.querySelector('.container');
const  parent = document.querySelector(".modal-parent");
  const X = document.querySelector(".x");
  const btn = document.querySelector('.submit');
  const modalP = document.querySelector('.modal__description');
  const second = document.querySelector('.two');
  const otpForm = document.querySelector('.otp-form');
  const otpBtn = document.querySelector('.otp');
  const otpInput = document.querySelector('#otp');

const postData = async (url, data) => {
  console.log(`posting data to ${url}`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  return response.text();
}



let emailInput;
myForm.addEventListener('submit', e => {
  console.log('form submitted');
  e.preventDefault();
  const user = {
    email: email.value,
  }

postData('http://localhost:5000/login', user).then((data) => {
  const {email} = JSON.parse(data);
  emailInput = email;
modalP.innerHTML =    `
<p>OTP sent to your email:   <b> ${email} </b> </p>
<hr/>
 <p> Enter the otp to login. </p>
 `;
  // console.log(data);
}
).catch((err) => console.log({message: err.message}));
;


email.focus();
email.value ="";
})




  btn.addEventListener('click', appear);
function appear() {
  console.log("btn clicked");
    parent.style.display = "block";
    container.style.filter = "blur(10px)"
}

X.addEventListener("click", disappearX);
function disappearX() {
    parent.style.display = "none";
    // container.style.filter = "blur(0px)"
    container.style.display = "none";
    second.style.display = "block";
}
parent.addEventListener("click", disappearParent);
function disappearParent(e) {
    if (e.target.className == "modal-parent") {
        parent.style.display = "none";
        // container.style.filter = "blur(0px)"
        container.style.display = "none";
        second.style.display = "block";
    }
}


otpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    email: emailInput,
    otp: otpInput.value
  }

  postData('http://localhost:5000/login/otp', user).then(res => console.log(res)).catch(err => err.message);
})