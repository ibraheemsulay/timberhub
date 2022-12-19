import { S_AddProductModal } from "./S_AddProductModal";
import FormHeader from "./FormHeader/FormHeader";
import Btn from "../others/Btn/Btn";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../utils/Context";
import { formFieldDetails, validateData } from "../../utils";
import { newProductObj } from "../../utils";
import { S_SuccessMessageModal } from "../others/reusable-styles/S_SuccessMessageModal";
import { Idata, RowItemType } from "../../ts-types/dataTypes";
import Loader from "../others/Loader/Loader";

const AddProductModal: React.FC = () => {
  const {
    modal,
    setModal,
    newProduct,
    setNewProduct,
    setList,
    rows,
    setRows,
    formError,
    setFormError,
  } = useContext(Context);

  const [successMsgPopUp, setSuccessMsgPopUp] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const parentElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentElement.current) return;
    parentElement.current.scrollTo(0, 0);
  }, [modal]);

  const addnewProduct = async (): Promise<void> => {
    try {
      setLoading(true);
      setFormError("");

      console.log(newProduct);

      if (!validateData(newProduct)) {
        throw new Error("Ensure all fields are valid");
      }

      console.log(newProduct);

      const postNewProduct = await fetch("/api", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const { data } = (await postNewProduct.json()) as { data: RowItemType };

      if (!data) throw new Error("An Error Occurred! Try Again");

      setRows(prevArray => [...prevArray, data]);
      setList(prevArray => [...prevArray, data]);

      setSuccessMsgPopUp(true);
      closeModal();

      setTimeout(() => {
        setSuccessMsgPopUp(false);
      }, 5000);
    } catch (e) {
      if (e instanceof Error && e.message) {
        setFormError(e.message);
      } else {
        setFormError("An Error Occurred");
      }
    } finally {
      setLoading(false);
      formError.includes("An") && setTimeout(() => setFormError(""), 3000);
    }
  };

  const closeModal = () => {
    setNewProduct((prevDataFormat: RowItemType) => ({
      ...prevDataFormat,
      dimensions: [...newProductFormat.dimensions],
    }));
    setModal(false);
  };

  return (
    <>
      <S_AddProductModal modal={modal} onClick={closeModal}>
        <div
          className="create-product"
          ref={parentElement}
          onClick={e => e.stopPropagation()}
        >
          <h1>Create Product</h1>
          {Object.entries(formFieldDetails).map((titleKeyValueArray, i) => (
            <FormHeader formField={titleKeyValueArray} key={i} />
          ))}

          <footer>
            {formError && <h5>{formError}</h5>}
            {loading && <Loader />}

            <button onClick={closeModal}>close</button>
            <Btn text="create product" click={() => void addnewProduct()} />
          </footer>
        </div>
      </S_AddProductModal>
      {
        <S_SuccessMessageModal popup={successMsgPopUp}>
          Product Added
        </S_SuccessMessageModal>
      }
    </>
  );
};

export default AddProductModal;
