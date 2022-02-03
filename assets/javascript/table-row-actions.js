class TableRowAction {
    constructor() {
        this.selectedItem = null;
    }

    selectItem(data) {
        this.selectedItem = data;
    }

    editItem(data) {
        if(!(this.selectedItem == null)) this.cancelEdit();
        this.selectItem(data);
        this.switchToOnView();
        this.switchToOnEdit();
    }

    cancelEdit() {
        document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='fullName']`).value = this.selectedItem.fullName;
        document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='userName']`).value = this.selectedItem.userName;
        document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='password']`).value = this.selectedItem.password;

        document.querySelector(`.onedit[key='${this.selectedItem.userId}']`).style.display = 'none';
        document.querySelector(`.onview[key='${this.selectedItem.userId}']`).style.display = 'table-row';
        this.selectItem(null);
    }

    switchToOnEdit() {
        const items = document.querySelectorAll(`.onedit`);
        items.forEach(item => {
            (item.getAttribute("key") == this.selectedItem.userId)? item.style.display = 'table-row' : item.style.display = 'none';
        })
    }

    switchToOnView() {
        const items = document.querySelectorAll(`.onview`);
        items.forEach(item => {
            (item.getAttribute("key") == this.selectedItem.userId)? item.style.display = 'none' : item.style.display = 'table-row';
        })
    }

    submitUpdate() {
        if(
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='fullName']`).value.length < 5 ||
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='userName']`).value.length < 5 ||
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='password']`).value.length < 5 ||
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='fullName']`).value.length > 50 ||
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='userName']`).value.length > 50 ||
            document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='password']`).value.length > 50
        ) {
            alert('Make sure all input must be between 6 to 50 character!')
        } else {
            document.querySelector('.loading-indicator-bg').style.display = 'flex';

            axios.post('api/update-record.php', {
            "fullName": document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='fullName']`).value,
            "userName": document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='userName']`).value,
            "password": document.querySelector(`.onedit[key='${this.selectedItem.userId}'] > td > input[name='password']`).value,
            "userId": this.selectedItem.userId
            })
            .then((response) => {
                console.log(response)
                if(response.data.success) {
                    setTimeout(() => {
                        document.querySelector('.loading-indicator-bg').style.display = 'none';
                        document.querySelector('.success-indicator-bg').style.display = 'flex';
                    }, 1000);

                    window.location.reload();
                } else {
                    throw "Error";
                }
            })
            .catch((error) => {
            document.querySelector('.loading-indicator-bg').style.display = 'none';
            document.querySelector('.error-indicator-bg').style.display = 'flex';
            })
        }
    }
}

const tableActions = new TableRowAction();