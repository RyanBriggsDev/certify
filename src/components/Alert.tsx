import { useState, useEffect, useContext } from "react";
import H6 from "./headings/H6";
import PropTypes from "prop-types";
import Icon from "./Icon";
import { genBgColor } from "@/lib/styleUtils";
import { AlertContext } from "@/lib/AlertContext";

export default function Alert(props: AlertProps) {
  const { setAlert } = useContext(AlertContext) as any;
  const [show, setShow] = useState(true);
  const color = genBgColor(props.color);

  function handleDismiss() {
    setShow(false);
    setAlert(null);
  }

  useEffect(() => {
    if (props.autoDismiss) {
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [props]);

  if (!show) {
    return null;
  }

  return (
    <div className={`rounded-md ${color} m-2 px-5 py-3 text-white`}>
      <div className="flex justify-between">
        <H6>{props.heading}</H6>
        <div onClick={handleDismiss} className="cursor-pointer">
          <Icon icon="BiX" size="2xl" color="white" />
        </div>
      </div>
      {props.text ? <div className="flex py-3">{props.text}</div> : null}
    </div>
  );
}

type AlertProps = {
  heading: string;
  text?: string;
  color: string;
  autoDismiss?: boolean;
};

Alert.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string.isRequired,
  autoDismiss: PropTypes.bool,
};

Alert.defaultProps = {
  autoDismiss: true,
};
