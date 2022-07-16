const getBtn = document.querySelector("#get_data");
const cover = document.querySelector(".question_cover");

// ************************************
// Get data from server code start here
// ************************************

const fetchData = async () => {
  try {
    //

    const data = await fetch("http://localhost:3000/upload");

    const result = await data.json();
    console.log("Result", result);

    if (result.length) {
      result.forEach((items) => {
        cover.innerHTML += `
        <div class="items">
          <span class="ques">${items.question}</span>
          <span class="ans">${items.answer}</span>
          <span class="img">
            <img src="${items.imageSrc}" alt="${items.q_id}" />
          </span>
          <span class="update">
            <button class="delete fetchButton" data-q_id=${items.q_id}>
              Delete
            </button>
            <button class="update fetchButton">Update</button>
          </span>
        </div>`;
      });
    } //
    else {
      cover.innerHTML = "DataBase is Empty !!";
    }

    const deleteBtn = document.querySelectorAll(".delete");
    const updateBtn = document.querySelectorAll(".update");

    deleteBtn.forEach((element) => {
      element.addEventListener("click", deleteData);
    });

    //
  } catch (err) {
    console.log(err);
  }
};

getBtn.addEventListener("click", fetchData);

// ************************************
// Get data from server code end here
// ************************************

// ***************************************
// Delete data from server code start here
// ***************************************

async function deleteData() {
  try {
    //

    // we get the dataset.q_id value from the html because we pass the q_id as a query String for deleting the specific data (collection) which match the q_id
    const q_id = this.dataset.q_id;
    console.log(q_id);

    //
    // fetch the delete method at 3000 starts
    const del_ques = await fetch(`http://localhost:3000/upload/${q_id}`, {
      method: "delete",
    });

    const del_ques_response = await del_ques.json();
    console.log(del_ques_response);

    // fetch the delete method at 3000 ends
    //

    //
    // fetch the delete method at 8000 starts
    const del_img = await fetch(`http://localhost:8000/media/${q_id}`, {
      method: "delete",
    });

    const del_img_res = await del_img.json();
    console.log(del_img_res);
    // fetch the delete method at 8000 ends
    //

    alert("Question deleted Successfully");

    //
  } catch (err) {
    console.log(err);
  }
}

// ****************************************
// Delete data from server code end here
// ****************************************
