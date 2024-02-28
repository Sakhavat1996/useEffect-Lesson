import { forwardRef, useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';

// const Modal = forwardRef(function Modal({onConfirm : confirmFn , onCancel: cancelFn }, ref){
//   return createPortal(
//     <dialog className="modal" ref={ref}>
//       <div id="delete-confirmation">
//         <h2>Əminsiniz ?</h2>
//         <p>Silmək istədiyinizdən əminsiniz?</p>
//         <div id="confirmation-actions">
//           <button onClick={cancelFn}  className="button-text">
//             Yox
//           </button>
//           <button
//             onClick={confirmFn}
//             className="button">
//             Hə
//           </button>
//         </div>
//       </div>
//     </dialog>,
//     document.getElementById('modal')
//   );
// });

function Modal({open , onConfirm : confirmFn , onCancel: cancelFn }){
  const modal = useRef();

  useEffect(()=>{
    const timer = setTimeout(() => {
      console.log('timer getdi')
      confirmFn();
    }, 3000);

    // clean-up function
    return ()=>{
      console.log('timer dayandi')
      clearTimeout(timer)
    }
  }, [])

  useEffect(()=>{
    if(open){
      modal.current.showModal();
    }
    else {
      modal.current.close();
    }
  },[open]);

  return createPortal(
    <dialog className="modal" ref={modal}>
      <div id="delete-confirmation">
        <h2>Əminsiniz ?</h2>
        <p>Silmək istədiyinizdən əminsiniz?</p>
        <div id="confirmation-actions">
          <button onClick={cancelFn}  className="button-text">
            Yox
          </button>
          <button
            onClick={confirmFn}
            className="button">
            Hə
          </button>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
// sadsd
// asdasd