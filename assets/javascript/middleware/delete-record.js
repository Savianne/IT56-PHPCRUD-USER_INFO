class DeleteRecordMiddleWare {
    constructor() {
        this.toDelete = null;
    }

    setToDelete(id) {
        this.toDelete = id;
    }

    delete(id) {
        this.setToDelete(id);
        document.querySelector('.ask-delete-indicator-bg').style.display = 'flex';
    }

    cancelDelete() {
        this.setToDelete(null);
        document.querySelector('.ask-delete-indicator-bg').style.display = 'none';
    }

    continueDelete() {
        document.querySelector('.ask-delete-indicator-bg').style.display = 'none';
        document.querySelector('.loading-indicator-bg').style.display = 'flex';
        axios.post('api/delete-record.php', {"userId": this.toDelete})
        .then((response) => {
            if(response.data.success) {
                setTimeout(() => {
                    document.querySelector('.loading-indicator-bg').style.display = 'none';
                }, 1000);
                location.reload();
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

const deleteMiddleware = new DeleteRecordMiddleWare();

