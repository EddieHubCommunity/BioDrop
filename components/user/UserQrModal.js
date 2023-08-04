import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";

import Button from "@components/Button";
import Modal from "@components/Modal";

const UserQrModal = ({ show, setShow, url }) => {
  const ref = useRef();

  const downloadQR = () =>
    ref.current.firstChild.toBlob((blob) =>
      saveAs(blob, `linkfree-${url.userName}.png`)
    );

  return (
    <Modal show={show} setShow={setShow} modalStyles="w-fit m-auto">
      <div className="flex flex-col items-center justify-center px-8">
        <div>
          <div className="flex justify-center my-4" ref={ref}>
            <QRCodeCanvas
              className="border border-white"
              value={`${url.BASE_URL}/${url.userName}`}
              size={240}
            />
          </div>
          <div className="w-full px-2 mx-auto flex justify-center mb-4">
            <Button primary={true} onClick={downloadQR}>
              Download QR code
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserQrModal;
