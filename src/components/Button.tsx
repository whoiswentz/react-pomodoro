import { ButtonContainer } from "./Button.styles";

type ButtonProps = {
  color?: 'primary' | 'secondary' | 'danger' | 'success';
}

export function Button({color = 'primary'}: ButtonProps) {
  return <ButtonContainer variant={color}>Send</ButtonContainer>
}