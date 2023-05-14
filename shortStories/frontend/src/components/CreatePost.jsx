import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { UserContext } from "../context/userContext";
import axios from "axios";

export default function CreatePost() {
  const editorRef = useRef(null);
  const { loginUsernameData } = useContext(UserContext);

  const [storyData, setStoryData] = useState({
    username: loginUsernameData,
    title: "",
    text: "",
    synopsis: "",
  });

  const log = () => {
    if (editorRef.current) {
      const newStoryData = {
        ...storyData,
        text: editorRef.current.getContent(),
      };
      setStoryData(newStoryData);
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setStoryData({...storyData, [name]: value});
  }

  const API_CREATE_POSTS = process.env.REACT_APP_CREATE_POSTS

  function SubmitData(event) {
    event.preventDefault();

    axios.post(API_CREATE_POSTS, storyData)
    .then((response) => {
      
    })
    .catch((e) => {
    })
  }

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Write your story here.</p>"
        init={{
          height: 600,
          menubar: false,
          plugins: [],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        apiKey="whvo6todsl87fpbo8i8n29zir5w6e61nt40y9osdnrg8xlvr"
        onEditorChange={log}
      />
      <form>
        <div className="form-group mt-5">
          <label for="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Enter story's title"
            value={storyData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-5">
          <label for="exampleInputPassword1">Synopsis</label>
          <input
            type="text"
            className="form-control"
            id="synopsis"
            name="synopsis"
            value={storyData.synopsis}
            onChange={handleInputChange}
            placeholder="Enter your synopsis"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3" onClick={SubmitData}>
          Submit
        </button>
      </form>
    </>
  );
}
