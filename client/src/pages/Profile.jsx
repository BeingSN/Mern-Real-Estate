import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { current } from "@reduxjs/toolkit";

const Profile = () => {
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('images/.*')

  const currentUser = useSelector((state) => {
    return state?.user?.currentUser;
  });

  console.log("user", currentUser);

  const [file, setFile] = useState(undefined);
  const [imagePerc, setImagePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const fileRef = useRef(null);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload", progress, "%");
        setImagePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadUrl,
          }));
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="images/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={
            currentUser?.data?.avatar
              ? currentUser?.data?.avatar
              : currentUser?.rest?._doc?.avatar
          }
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          alt="Profile"
        />
        <p className="text-sm self-center">
          {fileUploadError && (
            <span className="text-red-700">
              Error while uploading image (Image must be 2 mb)
            </span>
          )}
          {imagePerc > 0 && imagePerc < 100 && (
            <span className="text-green-700">{`Uploading ${imagePerc}%`}</span>
          )}
          {imagePerc === 100 && !fileUploadError && (
            <span className="text-green-700">Image Successfully Uploaded</span>
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="border p-3 rounded-lg my-4"
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          className="border p-3 rounded-lg my-4"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg my-4"
        />
      </form>
      <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
        update
      </button>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Logout</span>
      </div>
    </div>
  );
};

export default Profile;
