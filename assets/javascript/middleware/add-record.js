function handleSubmit() {
    const fullName = document.querySelector(".new-record-form > input[name='fullName']");
    const userName = document.querySelector(".new-record-form > input[name='userName']");
    const password = document.querySelector(".new-record-form > input[name='password']");

    (fullName.value.length < 5 || fullName.value.length > 50)? fullName.classList.add('err-field') : fullName.classList.remove('err-field');
    (userName.value.length < 5 || userName.value.length > 50)? userName.classList.add('err-field') : userName.classList.remove('err-field');
    (password.value.length < 5 || password.value.length > 50)? password.classList.add('err-field') : password.classList.remove('err-field');

    if(!(
        fullName.value.length < 5 || fullName.value.length > 50 ||
        userName.value.length < 5 || userName.value.length > 50 ||
        password.value.length < 5 || password.value.length > 50
    )) {
        document.querySelector('.loading-indicator-bg').style.display = 'flex';

        axios.post('api/add-record.php', {
            "fullName": fullName.value,
            "userName": userName.value,
            "password": password.value
        })
        .then((response) => {
            if(response.data.success) {
                fullName.value = '';
                userName.value = '';
                password.value = '';

                setTimeout(() => {
                    document.querySelector('.loading-indicator-bg').style.display = 'none';
                    document.querySelector('.success-indicator-bg').style.display = 'flex';
                    window.location.reload();
                }, 1000);
            } else {
                throw "Error";
            }
        })
        .catch((error) => {
            document.querySelector('.loading-indicator-bg').style.display = 'none';
            document.querySelector('.error-indicator-bg').style.display = 'flex';
        })
    } else {
        alert('Please make sure all field must be between 5 to 50 character long!');
    }
}