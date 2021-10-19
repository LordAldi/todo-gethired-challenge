import { useState } from "react";

const useModal = () => {
  let [modal, setModal] = useState(false);
  let [modalContent, setModalContent] = useState("I'm the Modal Content");

  let handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };

  return { modal, setModal, handleModal, modalContent };
};
export default useModal;
