
document.querySelector('.loading-indicator-bg').style.display = 'flex';
    
axios.post('/api/retrieve-record.php')
.then((response) => {
    console.log(response)
    if(response.data.success) {
        (response.data.payload.length)? document.getElementById('nodata').style.display = "none" : document.getElementById('nodata').style.display = "flex";  

        response.data.payload.forEach((item, index) => {
            createTableRowOnView(index, 'onview', item);
            createTableRowOnView(index, 'onedit', item);
        });

        setTimeout(() => {
            document.querySelector('.loading-indicator-bg').style.display = 'none';
        }, 1000);
    } else {
        throw "Error";
    }
})
.catch((error) => {
    document.querySelector('.loading-indicator-bg').style.display = 'none';
    document.querySelector('.error-indicator-bg').style.display = 'flex';
})

// const sampleData = [
//     {
//         userId: 1343,
//         fullName: "Apple Jane L. De Guzman",
//         userName: "ajdee@gamil.com",
//         password: 'SavianneMucho123'
//     },
//     {
//         userId: 13437,
//         fullName: "Mark Niño Q. Baylon",
//         userName: "ninzxky@gamil.com",
//         password: 'markninyo8398'
//     },
//     {
//         userId: 134378,
//         fullName: "Apple Jane L. De Guzman",
//         userName: "ajdee@gamil.com",
//         password: 'SavianneMucho123'
//     },
//     {
//         userId: 134375,
//         fullName: "Mark Niño Q. Baylon",
//         userName: "ninzxky@gamil.com",
//         password: 'markninyo8398'
//     },
// ];

// sampleData.forEach((item, index) => {
//     createTableRowOnView(index, 'onview', item);
//     createTableRowOnView(index, 'onedit', item);
// }) 

function createTableRowOnView(index, state, data) {

    const table = document.getElementById('information-table');

    const tr = document.createElement('tr');
    const indexFeild = document.createElement('td');
    const fullNameFeild = document.createElement('td');
    const userNameFeild = document.createElement('td');
    const passwordFeild = document.createElement('td');
    const actionFeild = document.createElement('td');

    const editBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');

    (state == 'onview')? tr.classList.add('onview') : tr.classList.add('onedit');
    
    tr.setAttribute("key", data.userId);

    actionFeild.classList.add('action');

    editBtn.classList.add("toggle", "edit");

    (state == 'onview')? deleteBtn.classList.add("toggle", "remove") : deleteBtn.classList.add("toggle", "cancel");

    if(state == 'onview') {
        editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
        deleteBtn.innerHTML = `<i class="fas fa-minus-square"></i>`;
    } else {
        editBtn.innerHTML = `<i class="fas fa-check"></i>`;
        deleteBtn.innerHTML = `<i class="fas fa-arrow-left"></i>`;
    }

    if(state == 'onview') {
        editBtn.onclick = function() { tableActions.editItem(data); };
        deleteBtn.onclick = function() { deleteMiddleware.delete(data.userId); };
    } else {
        editBtn.onclick = function() { tableActions.submitUpdate(); }
        deleteBtn.onclick = function() { tableActions.cancelEdit(); }
    }
    
    actionFeild.appendChild(editBtn);
    actionFeild.appendChild(deleteBtn)

    indexFeild.textContent = index + 1;

    if(state == 'onedit') {
        fullNameFeild.innerHTML = `<input type="text" name="fullName" value="${data.fullName}" placeholder="ex: Audilon R. Binito">`;
        userNameFeild.innerHTML = `<input type="text" name="userName" value="${data.userName}" placeholder="ex: audilon@gmail.com">`;
        passwordFeild.innerHTML = `<input type="text" name="password" value="${data.password}" placeholder="ex: Audilon123">`
    } else {
        fullNameFeild.textContent = data.fullName;
        userNameFeild.textContent = data.userName;
        passwordFeild.textContent = data.password;
    }

    tr.appendChild(indexFeild);
    tr.appendChild(fullNameFeild);
    tr.appendChild(userNameFeild);
    tr.appendChild(passwordFeild);
    tr.appendChild(actionFeild);

    table.appendChild(tr);

}

