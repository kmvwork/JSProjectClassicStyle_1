import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('.form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]')

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро с Вами свяжутся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').innerHTML = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage)

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.innerHTML = message.success;
                })
                .catch(() => {
                    statusMessage.innerHTML = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 9000)
                })
        })
    })
};

export default forms;