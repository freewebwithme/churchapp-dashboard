import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

import { getUserFromSession, getFileExtension } from "../../helpers/helper.js";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    fontSize: "0.75rem",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: "red",
  },
}));
export default function ImageUpload(props) {
  const classes = useStyles();
  let {
    setImageFile,
    setExpanded,
    disabled,
    sliderNumber,
    avatar,
    addButtonProps,
    changeButtonProps,
    removeButtonProps,
  } = props;

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );

  const [imageSizeErrorMessage, setImageSizeErrorMessage] = React.useState(
    null
  );
  const [imageFormatErrorMessage, setImageFormatErrorMessage] = React.useState(
    null
  );

  const currentUser = getUserFromSession();

  const handleUpload = () => {
    console.log("Handle upload");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", currentUser.id);
    formData.append("sliderNumber", sliderNumber);

    // TODO: Change the address to live server in Production.
    fetch("http://localhost:4000/slide-image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setImageFile(data);
        setExpanded(false);
        console.log("Printing data: ", data);
      });
  };

  let fileInput = React.createRef();
  const handleImageChange = (e) => {
    e.preventDefault();
    setImageSizeErrorMessage(null);
    setImageFormatErrorMessage(null);
    let reader = new FileReader();
    let file = e.target.files[0];
    // Image size validation.
    if (file.size > 2100000) {
      setImageSizeErrorMessage(
        "파일 크기가 너무 큽니다. 2 mb 이하로 골라주세요"
      );
    } else if (getFileExtension(file) == null) {
      setImageFormatErrorMessage(
        "올바른 이미지 파일이 아닙니다. jpg, png 파일을 업로드 해주세요"
      );
    } else {
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("file load completed");
    }
  };

  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  return (
    <div className="fileinput text-center">
      <p className={classes.errorMessage}>{imageSizeErrorMessage}</p>
      <p className={classes.errorMessage}>{imageFormatErrorMessage}</p>
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            {...addButtonProps}
            onClick={() => handleClick()}
            disabled={disabled}
          >
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> Remove
            </Button>
            <Button color="success" round={true} onClick={() => handleUpload()}>
              <i className="fas fa-upload" /> Upload
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
  setImageFile: PropTypes.func,
  setExpanded: PropTypes.func,
  disabled: PropTypes.bool,
  sliderNumber: PropTypes.string,
};
