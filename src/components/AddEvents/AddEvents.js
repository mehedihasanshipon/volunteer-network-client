import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit } = useForm();
  const [imgUrl,setImgUrl] = useState(null);
//   console.log(imgUrl);

  const onSubmit = (data) => {
    //   console.log(data)
      const event = {
          name: data.name,
          images:imgUrl
      }

      axios
      .post("http://localhost:3002/addEvent", event)
      .then(function (response) {
        console.log('Server side result',response);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(event);
    };

  const handleImgUpload = (e) => {
    //   console.log(e.target.files[0]);
    const imgData = new FormData();
    imgData.set("key", "baf759f7b47b24e2b89feea41140dc74");
    imgData.append("image", e.target.files[0]);
    //   console.log(imgData);
    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        setImgUrl(response.data.data.display_url);
        console.log(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Add your awesome events</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue="New event" ref={register} />
        <br />
        <input name="exampleRequired" type="file" onChange={handleImgUpload} />
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEvents;
