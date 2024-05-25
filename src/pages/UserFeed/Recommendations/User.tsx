import { useRef, useState } from "react";
import Modal from "../../../components/Modal";
import useOutsideClick from "../../../hooks/useClickOutside";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, isOpen, () => setIsOpen(false));

  return (
    <>
      <Modal isOpen={isOpen}>
        <div ref={ref} className="p-4 bg-blue-200">
          <h1 className="text-2xl">Shoesers!</h1>
          <p className="text-sm">
            If a dog chews shoes whose shoes does he choose?
          </p>
        </div>
      </Modal>
      <div
        className="card card-bordered rounded-lg w-full h-full transition-all hover:scale-[101%] cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoesers!</h2>
          <p className="text-sm">
            If a dog chews shoes whose shoes does he choose?
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
