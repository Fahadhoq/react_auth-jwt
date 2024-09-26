import React, { useEffect } from 'react';

export default function Print2({ postList, setOpen, handlePrint, printComponentRef }) {
  
  useEffect(() => {
    handlePrint()
    setOpen(false);
  }, [postList]);

  console.log('llllllll',postList);
  

  return (
    <div ref={printComponentRef}>
      <div id="invoice-POS">
        <div id="bot">
          <div id="table">
            <table id="main_table">
              <thead>
                <tr id="tabletitle" style={{ border: "1px dashed black" }}>
                  <td align='center' className='w-[5%] text-14'>ID</td>
                  <td align='center' className='w-[65%] text-14'>TITLE</td>
                  <td align='center' className='w-[10%] text-14'>BODY</td>
                </tr>
              </thead>
              <tbody>
                {
                  postList?.map((data, index) => (
                    <tr key={index} id="service" style={{ borderBottom: "1px dashed black" }}>
                      <td className='font-bold text-12'>{data.id}</td>
                      <td className='font-bold text-12'>{data.title}</td>
                      <td className='font-bold text-12'>{data.body}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className='text-10 mt-10' style={{ lineHeight: '12.5px' }}>
            <p>Notes</p>
            <p className='text-[8px]'>Thanks for your business.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
