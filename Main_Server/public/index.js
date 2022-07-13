const mediaPort = 8000;

file.addEventListener("change", () => {
  console.log(file.files[0].name);
});

// ***********************
// upload function define here
// ***********************
const upload = async () => {
  try {
    //
    let q_id = Date.now();
    console.log(q_id);

    let imageUrl = `http://localhost:${mediaPort}/images/${q_id}/${file.files[0].name}`;

    // data send to main Server
    const data = await fetch("http://localhost:3000/upload", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        q_id: q_id,
        question: question.value,
        answer: answer.value,
        imageSrc: imageUrl,
      }),
    });

    console.log(data);

    // images send to Media Server in the form Data
    // formate

    const formData = new FormData();
    formData.append("q_id", q_id);
    formData.append("imageFile", file.files[0]);

    const imagesData = await fetch("http://localhost:8000/media", {
      method: "post",
      body: formData,
    });

    console.log(imagesData);

    alert("Data Successfully Send to the Servers");
    //
  } catch (err) {
    console.log(err);
  }
};

save.addEventListener("click", upload);
