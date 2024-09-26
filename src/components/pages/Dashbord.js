import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/loginSlice";
import { useRef, useState } from "react";
import { useAuth } from "../../app/auth/contexts/AuthContext";
import { posts,iamge } from "../store/postSlice";
import EditIcon from '@mui/icons-material/Edit';
import ReactImagePickerEditor from 'react-image-picker-editor';
import signupImage from "../../assets/images/logo-bg.png";
import { SnackbarProvider, useSnackbar } from 'notistack';
import PrintPreviewModel from "../print/PrintPreviewModel";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PrintIcon from '@mui/icons-material/Print';
import { useReactToPrint } from 'react-to-print';
import PrintModel2 from "../print/PrintModel2";

export default function Dashbord() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postList, setPostList] = useState([]);

  const handleSubmit = () => {
    dispatch(posts())
    .then(res => {
      console.log('dashbord',res);
      setPostList(res.payload.data)
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

  //print and pdf
  const [openPreview, setOpenPreview] = useState(false)


  // print 1
  const contentToPrint = useRef(null);
  const handlePrint1 = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  // print 2
  const [printModal, setPrintModal] = useState(false);
  function handlePrint2(id) {
    setPrintModal(true)
  }

  
  return (
    <>
    {/* print and pdf*/}
    <PrintPreviewModel
        open={openPreview}
        setOpen={setOpenPreview}
        user={user}
        postList={postList}
    />

    {/* print 2 */}
    <PrintModel2
        open={printModal}
        setOpen={setPrintModal}
        postList={postList}
    />

    <div>
      <div>
        <p>{user && user.name} Dashbord</p>
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
      <div>
        <h1>Print And PDF</h1>
        <button type="submit" onClick={handleSubmit}>Get Post Data</button> 
    
        <button className="bg-blue text-white rounded py-6 px-14 md:ml-16" onClick={() => { setOpenPreview(true) }}>
            <PictureAsPdfIcon />
            PDF
        </button>
         
         {/* print 1 */}
         <div ref={contentToPrint}>Hello Again</div>
            <button onClick={() => {
              handlePrint1(null, () => contentToPrint.current);
            }}>
              PRINT 1
          </button>

          {/* print 2 */}
          <button className="bg-blue text-white rounded py-6 px-14 md:ml-16" onClick={() => { handlePrint2(true) }}>
            <PrintIcon />
            PRINT 2
        </button>
      </div>
    </div>
    </>
  );
}
