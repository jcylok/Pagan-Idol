console.log("Welcome...")

const getUsersSuccess = (jsonData) => {
    console.log(jsonData.data[0].firstName);
    const $tbody = $('tbody');
    jsonData.data.forEach(user => {
        let dateCreated = new Date(user.dateCreated).toLocaleString();
        let str = "";
        if (user.happyHour) {
            str = "🍺"
        }
        if (user.cocktail) {
            str += "🍸"
        }
        if (user.tikitender) {
            str += "🕺"
        }
        if (user.event) {
            str += "🎉"
        } else  {
            str += `&nbsp`;
        }
        // console.log(test.substring(0,3))
        $tbody.append(`
        <tr>
            <td>${user.firstName} ${user.lastName}<p>${str}</p></td>
            <td>${user.email}</td>
            <td class="registered">${dateCreated}</td>
        </tr>
        `);
        // $('.registered').text(`${user.dateCreated.substrong(0,5)}`)
    })
};
const handleError = (error) => {
    console.log(error);  
};
const getUsers = () => {
    console.log('getting all users...');
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/api/v1/users",
        success: getUsersSuccess,
        error: handleError,
    });
}
getUsers();