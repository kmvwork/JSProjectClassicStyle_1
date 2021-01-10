import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElement(event, element, property) {
        element.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[property] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[property] = 'Холодное' : state[property] = 'Теплое';
                            element.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[property] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[property] = item.value;
                        break;
                }
            })
        });
    }

    bindActionToElement('click', windowForm, 'form');
    bindActionToElement('input', windowHeight, 'height');
    bindActionToElement('input', windowWidth, 'width');
    bindActionToElement('change', windowType, 'type');
    bindActionToElement('change', windowProfile, 'profile');


};

export default changeModalState;