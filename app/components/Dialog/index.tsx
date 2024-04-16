import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  header?: ReactNode;
  isVisible: boolean;
  dismissible?: boolean;
  onClickClose: () => void;
}

export default function Dialog(props: Props) {

  const handleClose = () => {
    props.onClickClose();
  };

  const handleBackdropClick = () => {
    if (props.dismissible) {
      handleClose();
    }
  };

  return (
    <div
      className={`${props.isVisible ? "visible" : "invisible"} overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full backdrop-blur-sm`}
      onClick={handleBackdropClick}
    >
      <div className="relative p-4 w-full max-w-xl max-h-full border border-zinc-600 rounded-2xl bg-black shadow-lg overflow-y-auto">
        <div className="relative rounded-lg shadow">
          <div className={`flex items-center justify-between ${props.header && "p-4 border-b rounded-t border-gray-600"} `}>
            {props.header && (
              <h3 className="text-xl font-semibold">
                {props.header}
              </h3>
            )}
            <div
              className="cursor-pointer end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </div>
          </div>
          <div className="p-4 md:p-5">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}