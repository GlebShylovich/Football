// формы и сслыки на них
const btnSignIn = document.getElementById('signIn')
const btnSignUp = document.getElementById('signUp')
const formSignIn = document.querySelector('#formSignIn')
const formSignUp = document.querySelector('#formSignUp')
const childrenFormSignUp = document.querySelector('.auth__sign-up')

// инпуты регистрации
const inputLoginSignUp = document.querySelector('#inputLoginSignUp')
const inputPassSignUp = document.querySelector('#inputPassSignUp')
const inputCopyPassSignUp = document.querySelector('#inputCopyPassSignUp')


// инпуты авторизации
const inputLoginSignIn = document.querySelector('#inputLoginSignIn')
const inputPassSignIn = document.querySelector('#inputPassSignIn')


btnSignIn.addEventListener('click', () => {
    formSignUp.classList.add('none')
    formSignIn.classList.remove('none')
})
// логика по отображению форм
btnSignUp.addEventListener('click', () => {
    formSignIn.classList.add('none')
    formSignUp.classList.remove('none')
});



// регистрация пользователя

const btnSignUptoServer = document.querySelector('#btnSignUp')

//оброботчик события на кнопку зарегестрировать 
btnSignUptoServer.addEventListener('click', handleValueValidate)

// основная функция валидации и регистрации пользователя
async function handleValueValidate() {
    // проверка на пустые поля
    if (inputLoginSignUp.value !== '' && inputPassSignUp.value !== '' && inputCopyPassSignUp.value !== '') {
        // проверка на совпадения поролей
        if (inputPassSignUp.value == inputCopyPassSignUp.value) {
            // обработка функции на совпадение логинов с инпутом на странице и на сервере
            const validateUserLoginToServer = await validateLoginToserver()
            // проверка на совпадение логинов
            if (validateUserLoginToServer) {
                // вызов функции отправки данных на сервер
                postUserFromServer(createObjUser())
                // переключение форм
                formSignUp.classList.add('none')
                formSignIn.classList.remove('none')
                // оповещение пользователя об успешной регистрации с задержкой на 500 милисекунд
                setTimeout(() => {
                    alert('Пользователь успешно создан')
                }, 500)
                return
            }

            alert('такой пользователь уже существует')
            return
        }
        alert('Y вас не совпадают пороли ')
        return
    }
    alert('Заполните поля')
}

// создания актуальных данных пользователя для отправки на сервер
function createObjUser() {
    return {
        login: inputLoginSignUp.value,
        pass: inputPassSignUp.value,
        auth: false
    }
}

// функция для проверки совпадений логинов
async function validateLoginToserver() {
    const loginPage = inputLoginSignUp.value
    const responce = await fetch('http://localhost:3000/users')
    const users = await responce.json()
    const loginTrue = users.filter(user => user.login == loginPage)
    return loginTrue.length > 0 ? false : true
}

// функция добавления пользователя на сервере
async function postUserFromServer(object) {
    try {
        await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(object)
        })
        childrenFormSignUp.reset()

    } catch (e) {
        console.error(e)
    }

}


// ааторизация
const btnSignIntoServer = document.querySelector('#btnSignIn')

btnSignIntoServer.addEventListener('click',validateAuthUser)

async function validateAuthUser(){
    // проверка на пусты поля
    if(inputLoginSignIn.value !== '' && inputPassSignIn.value !== ''){
        const checkUser = await checkAuth()
        console.log(checkUser);
        if(checkUser){
            window.location.href = 'main.html'
            return
        }
        alert("такого пользователя не существует")
        inputLoginSignIn.value = ''
        inputPassSignIn.value= ''

    }
}


async function checkAuth(){
    const responce = await fetch('http://localhost:3000/users')
    const users = await responce.json()
    const checkTrueAuthUser = users.filter(user =>{
        if(user.login == inputLoginSignIn.value && user.pass ==inputPassSignIn.value){
            return true
        }
        return false
    })
    console.log(checkTrueAuthUser);
    return checkTrueAuthUser.length > 0 ? true : false 
}