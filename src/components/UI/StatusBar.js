import { Container, Alert } from "react-bootstrap";
function StatusBar(props) {
  return (
    <Container>
      <Alert variant={props.variant} onClose={props.onClose}>
        {props.message}
      </Alert>
    </Container>
  );
}
export default StatusBar;
