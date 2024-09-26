import { Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react'
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import Print2 from './Print2';

export default function PrintModel2({open,setOpen,postList}) {
  const printComponentRef = React.useRef();
  const handleClose = () => {
      setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
      if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
              descriptionElement.focus();
          }
      }
  }, [open]);
  const handlePrint = useReactToPrint({
      content: () => printComponentRef.current,
  });
 
  return (
    <div>
       <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={'lg'}
        >
                {
                    (postList).length > 0 &&
                    <>
                    <DialogContent dividers>
                        <Print2
                            printComponentRef={printComponentRef}
                            handlePrint={handlePrint}
                            setOpen={setOpen}
                            postList={postList}
                        />
                    </DialogContent>    
                    </>
                }
            <DialogActions>
                <div className=''>
                    <ReactToPrint trigger={() => (
                        <button className="bg-blue text-white rounded py-6 px-14 mx-16">
                            Print
                        </button>
                    )} content={() => printComponentRef.current} />
                </div>
            </DialogActions>
        </Dialog>
    </div>
  )
}
