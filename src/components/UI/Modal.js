import { Button, Modal as BootstrapModal } from "react-bootstrap";
function Modal(props) {
  return (
    <BootstrapModal show={props.show} onHide={props.close}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props.title}</BootstrapModal.Title>
      </BootstrapModal.Header>

      <BootstrapModal.Body>
        <p>{props.message}</p>
      </BootstrapModal.Body>

      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={props.onCancelClick}>
          No
        </Button>
        <Button variant="danger" onClick={props.onButtonClick}>
          Yes
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export default Modal;
