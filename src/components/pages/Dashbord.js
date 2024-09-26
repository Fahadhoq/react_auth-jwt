import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/loginSlice";
import { useState } from "react";
import { useAuth } from "../../app/auth/contexts/AuthContext";
import { posts,iamge } from "../store/postSlice";
import EditIcon from '@mui/icons-material/Edit';
import ReactImagePickerEditor from 'react-image-picker-editor';
import signupImage from "../../assets/images/logo-bg.png";
import { SnackbarProvider, useSnackbar } from 'notistack';

export default function Dashbord() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(posts())
    .then(res => {
      console.log('dashbord',res);
    });
  }

  //image
  const imageLink = process.env.REACT_APP_IMAGE_URL;
  const config2 = {
    borderRadius: '8px',
    language: 'en',
    width: '200px',
    height: '150px',
    objectFit: 'contain',
    compressInitial: null,
    objectFit: 'contain',
  };
  let initialImage = signupImage;

  setTimeout(() => {
    initialImage = '../assets/images/sussess.png';
  }, 5000)

  const [inputs, setInputs] = useState({
    image: '',
  });
  const [imageItem, setImageItem] = useState([{ 'image': '' }])
  const [imageSize, setImageSize] = useState([{ 'size': 0 }]);

  const handleLargeImageUpload = (index, image) => {
    if (image) {      
      if (image.includes('data:image')) {
        var stringLength = image?.length - 'data:image/png;base64,'.length;
        var sizeInBytes = 4 * Math.round((stringLength / 3) * 0.5624896334383812);
        var sizeInKB = Math.round(sizeInBytes / 1024);

        // Check image dimensions and size
        const imageElement = new Image();
        imageElement.src = image;
        imageElement.onload = () => {
          const width = imageElement.width;
          const height = imageElement.height;
          const dpi = 72; // Assuming the image is 72 DPI

          // Check if image meets preferred dimensions and size
          if (width * 1 <= 132 && height * 1 <= 132 && sizeInKB <= 1024) {
            if (sizeInKB <= 1024) {
              let image_data = imageItem;
              image_data[index] = { image };

              setImageItem(image_data);

              let image_size = imageSize;
              image_size[index].size = sizeInKB;
              setImageSize(image_size);
            } else {
              // Image does not meet criteria
              enqueueSnackbar('Image Must Be Smaller Than 1 MB!', {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                }
              });
            }
          } else {
            // Image does not meet criteria
            enqueueSnackbar('Image Must Be in 132px x 132px!', {
              variant: 'error',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              }
            });
          }
        };
      }
    }
  }

  const editFields = () => {
    let newfield = {
      image: {}
    }
    setImageItem([...imageItem, newfield])
    let newsize = {
      size: 0
    }
    setImageSize([...imageSize, newsize])

    setInputs({
      ...inputs, image: null,
    })
  }

  const SaveImage = (e) => {
    e.preventDefault()
    dispatch(iamge({ ...inputs, imageItem: imageItem }))
      .then(res => {
        if (res.payload.success === true) {
          setInputs([{image:''}])
          setImageSize([{image:''}])
          setImageItem([{size:0}])
          alert(res.payload.data.message)
        }else {
          setInputs([{image:''}])
          setImageSize([{image:''}])
          setImageItem([{size:0}])
          alert(res.payload.data.message)
        }
      })
  }
  
  return (
    <>
    <div>
      <div>
        <p>{user && user.name} Dashbord</p>
        <button type="submit" onClick={handleSubmit}>Get Post Data</button> 
      </div>
      <div>
        <h1>Image Add And Edit</h1>
        {
          user?.image != '' ?
          <>
            <img src={imageLink + 'upload/User/Profile/' + user?.image} alt="" height={160} width={190} />
            <button type="button" onClick={() => editFields()} className='mx-10'><EditIcon className='w-20 text-blue-200 hover:text-blue' />Edit Image</button> 
          </> :
            <ReactImagePickerEditor
                id="image"
                name="image"
                type="file"
                config={config2}
                imageSrcProp={initialImage}
                imageChanged={(image) => handleLargeImageUpload(0, image)}
            />
        }
        <button type="submit" onClick={SaveImage}>Save Image</button> 
      </div>
    </div>
    </>
  );
}
