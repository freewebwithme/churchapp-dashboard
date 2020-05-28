import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.js";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import { useHistory } from "react-router-dom";

export default function AvatarUpload(props) {
  const history = useHistory();
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    //    props.avatar ? defaultAvatar : defaultImage
    props.employee.profileImage
  );
  let fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("churchId", props.user.church.id);
    formData.append("employeeId", props.employee.id);

    // TODO: Change the address to live server in Production.
    fetch("http://localhost:4000/profile-image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Printing result of profile upload: ", data);
        props.setModal(false);
        props.refetch();
      });
  };
  const handleClick = () => {
    console.log("Printing from button click");
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            {...addButtonProps}
            color="primary"
            onClick={() => handleClick()}
          >
            {avatar ? "사진등록 또는 교체" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              사진교체
            </Button>
            {avatar ? <br /> : null}
            <Button color="primary" onClick={() => handleSubmit()}>
              <i className="fas fa-upload" /> 업로드
            </Button>
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> 사진삭제
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

AvatarUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
};
