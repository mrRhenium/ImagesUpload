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
          <span class="update_section">
            <button class="delete fetchButton" data-q_id=${items.q_id}> Delete </button>
            <button class="update fetchButton" 
            data-q_id=${items.q_id}> Update </button>
          </span>
        </div>`;
      });
    } //
    else {
      cover.innerHTML = "DataBase is Empty !!";
    }

    // set the click event on all the delete buttons
    const deleteBtn = document.querySelectorAll(".delete");

    deleteBtn.forEach((element) => {
      element.addEventListener("click", deleteData);
    });

    // set the click event on all the update buttons
    const updateBtn = document.querySelectorAll(".update");

    updateBtn.forEach((element) => {
      element.addEventListener("click", updateData);
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
// update data from server code start here
// ***************************************

async function updateData() {
  try {
    //

    let q_id = this.dataset.q_id;
    console.log(q_id);

    const pre_img = document.querySelector(`[alt='${q_id}']`);

    let pre_img_src = pre_img.getAttribute("src").substring(43);
    console.log(pre_img_src);

    const img_cover = document.querySelector(`[alt='${q_id}']`).parentElement;
    console.log(img_cover);

    img_cover.innerHTML = `
      <input type="file" name="updated_img" id="updatedImage" />
      <button id="update_save" class="fetchButton">
        Save
      </button>
    `;

    const saveBtn = document.querySelector("#update_save");
    const updatedImage = document.querySelector("#updatedImage");

    saveBtn.addEventListener("click", async (e) => {
      const updated_form = new FormData();

      updated_form.append("updated_img", updatedImage.files[0]);

      //
      if (updatedImage.files.length == 0) {
        //
        alert("Please choose some Image file");
      } //
      else {
        //
        const upd_image = await fetch(
          `http://localhost:8000/media/${q_id}/${pre_img_src}`,
          {
            method: "put",
            body: updated_form,
          }
        );

        const upd_img_res = await upd_image.json();
        console.log(upd_img_res);

        // update the image URL

        let upd_imageUrl = `http://localhost:8000/images/${q_id}/${updatedImage.files[0].name}`;

        const upd_ques = await fetch(`http://localhost:3000/upload`, {
          method: "put",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            q_id: q_id,
            imageSrc: upd_imageUrl,
          }),
        });

        const upd_ques_res = await upd_ques.json();
        console.log(upd_ques_res);

        alert("Image get Modified");

        //
      }
    });

    //
  } catch (err) {
    console.log(err);
  }
}

// ***************************************
// update data from server code ends here
// ***************************************

// ***************************************
// Delete data from server code start here
// ***************************************

async function deleteData() {
  try {
    //

    // we get the dataset.q_id value from the html because we pass the q_id as a query String for deleting the specific data (collection) which match the q_id
    let q_id = this.dataset.q_id;
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
