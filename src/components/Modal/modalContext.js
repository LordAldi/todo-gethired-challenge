import { createContext } from "react";
import useModal from "./useModal";
import Modal from "./Modal";

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent, setModal } = useModal();
  return (
    <Provider value={{ modal, handleModal, modalContent, setModal }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
