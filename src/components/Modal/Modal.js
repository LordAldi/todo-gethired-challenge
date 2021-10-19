import { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";

const Modal = () => {
  let { modalContent, modal, setModal } = useContext(ModalContext);
  if (modal) {
    return createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
        onClick={() => setModal(false)}
      >
        <div
          className="flex items-center justify-center "
          onClick={(e) => e.stopPropagation()}
        >
          {modalContent}
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
// return (
//   <div
//     className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ${
//       show
//         ? "opacity-100 pointer-events-auto"
//         : "opacity-0 pointer-events-none"
//     } transition-all duration-300 ease-in-out `}
//     onClick={onClose}
//   >
//     <div
//       data-cy={datacy}
//       className={`w-auto bg-white transform ${
//         show ? "translate-y-0" : "-translate-y-52"
//       } transition-all duration-300 ease-in-out ${className}`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       {children}
//     </div>
//   </div>
// );
