$(document).ready(function () {

  let tableBody = $("#table-body");

  let responseData = null;
  let filterArr = null;

  function clickHanlder() {
    let splitId = this.id.split("-")[1];
    $("#info-content").css("display", "block");
    $("tr").removeClass("active");
    $(this).addClass("active");
    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].id == splitId) {
        $("#user-name").html(
          "<b>User selected: </b>" +
            responseData[i].firstName +
            " " +
            responseData[i].lastName
        );
        $("#description").html(responseData[i].description);
        $("#address").html(
          "<b>Address: </b>" + responseData[i].address.streetAddress
        );
        $("#city").html("<b>City: </b>" + responseData[i].address.city);
        $("#state").html("<b>State: </b>" + responseData[i].address.state);
        $("#pin").html("<b>Zip: </b>" + responseData[i].address.zip);
        break;
      }
    }
  }

  function createTable(data) {
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      let tableRow = $("<tr>")
        .addClass("data-row")
        .attr("id", "item" + i + "-" + data[i].id);
      let id = $("<td>").addClass("column1").text(data[i].id);
      let firstName = $("<td>").addClass("column2").text(data[i].firstName);
      let lastName = $("<td>").addClass("column3").text(data[i].lastName);
      let email = $("<td>").addClass("column4").text(data[i].email);
      let phone = $("<td>").addClass("column5").text(data[i].phone);

      tableRow.append(id, firstName, lastName, email, phone);
      tableBody.append(tableRow);

      tableRow.click(clickHanlder);
    }
  }

  $.get(
    "https://60f1683738ecdf0017b0fc11.mockapi.io/data",
    function (response) {
      responseData = response;
      createTable(response);
    }
  );

  $("form").submit(function (event) {
    event.preventDefault();
  });

  let inputBox = document.getElementById("search-box");
  inputBox.addEventListener("input", function () {
    filterArr = responseData.filter((item) =>
      item.firstName.toLowerCase().includes(this.value.toLowerCase())
    );
    tableBody.html("");
    createTable(filterArr);
  });
});
