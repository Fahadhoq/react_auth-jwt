import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import Print from './Print';

export default function PrintPreviewModel({open,setOpen,user,postList}) {
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
                <DialogContent dividers>
                    <div className='w-[850px]'>
                        <PDFViewer style={{ width: '100%', height: '700px' }}>
                            <Print
                                user={user}
                                postList={postList}
                            />
                        </PDFViewer>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}
