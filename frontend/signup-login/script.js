const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const button = document.querySelector('button');
const form = document.querySelector('form');

function signup(e) {
    e.preventDefault();
    const obj = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value
    };
    axios.post('http://localhost:3000/admin/signup', obj)
    .then((response)=>{
        console.log(response.data);
        if (response.status === 201) {
            alert('Successfully signed up');
        }
    }).catch(err=>{
        console.log(err.response.data);
        if (err.response.status === 403) {
            alert('email already exits');
        }
    });
}

