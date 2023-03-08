export default function Modal({ modalOpen, close, children }: any) {
  return (
    <>
      {modalOpen ? (
        <div className="modal fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
          <div
            className="modal-background absolute h-full w-full cursor-pointer bg-black/[0.5]"
            onClick={close}
          ></div>
          <div className="modal-container relative flex min-h-[50%] min-w-[75%] cursor-default flex-col items-center justify-center rounded bg-gray-200 p-[2.5rem] dark:bg-dark-gray md:min-w-[60%]">
            <div
              onClick={close}
              className="absolute right-3 top-3 cursor-pointer text-right text-2xl"
            >
              ╳
            </div>
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
